import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import * as routes from 'constants/routes';
import Loading from 'components/Loading';

import Form from './components/Form';
import List from './components/List';

import {
  searchCollection,
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

  handleOnAddToCollection = data => {
    console.log(data);
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
          {isLoading && <Loading isSearching />}
          {error && <p>Error</p>}
          <List
            searchTerm={searchTerm}
            collection={collection}
            metaData={metaData}
            onAddToCollection={this.handleOnAddToCollection}
          />
        </Main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  collection: getCollection(state.collection),
  isLoading: getCollectionLoading(state.collection),
  error: getCollectionError(state.collection),
  metaData: getCollectionMetaData(state.collection),
});

const mapDispatchToProps = { searchCollection };

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

SearchContainer.propTypes = {
  collection: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  metaData: PropTypes.object,
  searchCollection: PropTypes.func,
};

SearchContainer.defaultProps = {
  collection: {},
  isLoading: false,
  error: null,
  metaData: null,
};

export default compose(
  withRedux,
  withScrollToTopOnMount,
)(SearchContainer);
