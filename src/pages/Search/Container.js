import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withScroll from 'utils/withScroll';
import Main from 'components/Main';
import * as routes from 'constants/routes';
import firebase from 'firebase.js';

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
  static getDerivedStateFromProps(props, state) {
    if (props.isLoading) {
      document.body.classList.add('search-active');
    } else {
      document.body.classList.remove('search-active');
    }
    if (props.collection.items && state.searchTerm === '') {
      props.clearSearchResult();
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.clearSearchResult();
  }

  componentWillUnmount() {
    this.props.clearSearchResult();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
          <Header />
          <Form
            searchTerm={searchTerm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <List
            searchTerm={searchTerm}
            isLoading={isLoading}
            error={error}
            collection={collection}
            metaData={metaData}
            onAddToCollection={this.handleAddToCollection}
          />
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
  withScroll,
)(SearchContainer);
