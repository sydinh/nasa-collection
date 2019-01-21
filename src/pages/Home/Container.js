import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import 'firebase/database';
import firebase from 'firebase.js';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';

import Header from './components/Header';
import List from './components/List';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const collectionRef = firebase.database().ref('collection');
    collectionRef.on('value', snapshot =>
      this.setState({ isLoading: false, collection: snapshot.val() }),
    );
  }

  handleAddToFavorites = data => {
    const collectionRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionRef.update({ favorite: true });
  };

  handleDeleteFromFavorites = data => {
    const collectionRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionRef.update({ favorite: false });
  };

  handleDeleteFromCollection = data => {
    const collectionRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionRef.remove();
  };

  render() {
    const { isLoading, collection } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>NASA Collection</title>
        </Helmet>
        <Main page="home">
          <Header />
          <List
            isLoading={isLoading}
            collection={collection}
            onAddToFavorites={this.handleAddToFavorites}
            onDeleteFromFavorites={this.handleDeleteFromFavorites}
            onDeleteFromCollection={this.handleDeleteFromCollection}
          />
        </Main>
      </Fragment>
    );
  }
}

HomeContainer.propTypes = {
  isLoading: PropTypes.bool,
  collection: PropTypes.object,
  onAddToFavorites: PropTypes.func,
  onDeleteFromFavorites: PropTypes.func,
  onDeleteFromCollection: PropTypes.func,
};

HomeContainer.defaultProps = {
  isLoading: false,
  collection: null,
  onAddToFavorites: () => {},
  onDeleteFromFavorites: () => {},
  onDeleteFromCollection: () => {},
};

export default compose(withScrollToTopOnMount)(HomeContainer);
