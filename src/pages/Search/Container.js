import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import 'firebase/database';
import firebase from 'firebase.js';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import Loading from 'components/Loading';
import * as routes from 'constants/routes';

import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';

import {
  searchCollection,
  clearSearchResult,
  getCollection,
  getCollectionLoading,
  getCollectionError,
  getCollectionMetaData,
} from 'modules/collection';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    const data = this.state.searchTerm.toLowerCase();
    this.props.searchCollection(data);
    event.preventDefault();
  };

  handleAddToCollection = data => {
    const collectionRef = firebase.database().ref('collection');
    collectionRef.push(data);
    setTimeout(() => this.props.history.push(routes.HOME), 500);
  };

  componentWillUnmount() {
    this.props.clearSearchResult();
  }

  render() {
    const { searchTerm } = this.state;
    const { collection, isLoading, error, metaData } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>NASA Search</title>
        </Helmet>
        <Main page="search">
          <Header />
          <Form
            searchTerm={searchTerm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <List
            searchTerm={searchTerm}
            collection={collection}
            metaData={metaData}
            onAddToCollection={this.handleAddToCollection}
          />
          {isLoading && <Loading isSearching />}
          {error && <p>{error.reason}</p>}
        </Main>
      </Fragment>
    );
  }
}

SearchContainer.propTypes = {
  collection: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  metaData: PropTypes.object,
  searchCollection: PropTypes.func,
  clearSearchResult: PropTypes.func,
};

SearchContainer.defaultProps = {
  isLoading: false,
  error: null,
  metaData: null,
  searchCollection: () => {},
  clearSearchResult: () => {},
};

const mapStateToProps = state => ({
  collection: getCollection(state.collection),
  isLoading: getCollectionLoading(state.collection),
  error: getCollectionError(state.collection),
  metaData: getCollectionMetaData(state.collection),
});

const mapDispatchToProps = { searchCollection, clearSearchResult };

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withRedux,
  withScrollToTopOnMount,
)(SearchContainer);
