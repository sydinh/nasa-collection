import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import * as routes from 'constants/routes';
import Loading from 'components/Loading';

import Form from './components/Form';
import List from './components/List';

const API = 'https://images-api.nasa.gov/search?q=';

class SearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      isLoading: false,
      collection: [],
      error: null,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.searchCollection();
  };

  searchCollection = () => {
    const QUERY = this.state.searchTerm.toLowerCase();

    return axios
      .get(API + QUERY)
      .then(result =>
        this.setState({
          isLoading: false,
          collection: result.data.collection,
        }),
      )
      .catch(error =>
        this.setState({
          isLoading: false,
          error: error,
        }),
      );
  };

  render() {
    const { searchTerm, isLoading } = this.state;

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
          <List searchTerm={searchTerm} collection={this.state.collection} />
        </Main>
      </Fragment>
    );
  }
}

export default withScrollToTopOnMount(SearchContainer);
