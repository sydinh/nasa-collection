import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import 'firebase/database';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import * as routes from 'constants/routes';
import Loading from 'components/Loading';
import firebase from 'firebase.js';

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
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  componentWillUnmount() {
    this.props.clearSearchResult();
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

  render() {
    const { searchTerm } = this.state;
    const { collection, isLoading, error, metaData } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>NASA Search</title>
        </Helmet>
        <Main page="search">
          <Link to={routes.HOME} className="search__link">
            Back to Collection
          </Link>
          <h1 className="search__title">Search from Nasa</h1>
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

const mapDispatchToProps = {
  searchCollection,
  clearSearchResult,
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withRedux,
  withScrollToTopOnMount,
)(SearchContainer);
