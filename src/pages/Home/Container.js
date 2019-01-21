import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import 'firebase/database';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import firebase from 'firebase.js';

import Header from './components/Header';
import List from './components/List';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      collection: null,
      isLoading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const collectionRef = firebase.database().ref('collection');
    collectionRef.on('value', snapshot =>
      this.setState({
        collection: snapshot.val(),
        isLoading: false,
      }),
    );
  }

  handleAddToFavorites = data => {
    this.setState(
      prevState => {
        return {
          favorite: !prevState.favorite,
        };
      },
      () => {
        const { favorite } = this.state;
        const collectionRef = firebase.database().ref(`/collection/${data[0]}`);
        collectionRef.update({ favorite });
      },
    );
  };

  handleDeleteFromCollection = data => {
    const collectionRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionRef.remove();
  };

  render() {
    const { collection, isLoading } = this.state;

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
            onDeleteFromCollection={this.handleDeleteFromCollection}
          />
        </Main>
      </Fragment>
    );
  }
}

export default compose(withScrollToTopOnMount)(HomeContainer);
