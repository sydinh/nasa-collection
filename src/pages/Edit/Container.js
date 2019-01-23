import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import firebase from 'firebase.js';
import * as routes from 'constants/routes';

import Header from './components/Header';
import Form from './components/Form';

class EditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    this.fetchCollectionItem();
  }

  fetchCollectionItem = () => {
    const { id } = this.props.match.params;
    const collectionRefItem = firebase.database().ref(`collection/${id}/data/0`);
    collectionRefItem.on('value', snapshot => {
      const { title, description } = snapshot.val();
      this.setState({ title, description });
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { title, description } = this.state;
    const { id } = this.props.match.params;
    const collectionRefItem = firebase.database().ref(`/collection/${id}/data/0`);
    collectionRefItem.update({ title, description });
    this.props.history.push(routes.HOME);
    event.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>NASA Edit</title>
        </Helmet>
        <Main page="nasa-edit">
          <Header />
          <Form {...this.state} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        </Main>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withScrollToTopOnMount,
)(EditContainer);
