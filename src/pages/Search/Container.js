import React, { Component, Fragment } from 'react';
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
          <List searchTerm={searchTerm} collection={collection} metaData={metaData} />
        </Main>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ collection }) => ({
  collection: getCollection(collection),
  isLoading: getCollectionLoading(collection),
  error: getCollectionError(collection),
  metaData: getCollectionMetaData(collection),
});

const mapDispatchToProps = { searchCollection };

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRedux,
  withScrollToTopOnMount,
)(SearchContainer);
