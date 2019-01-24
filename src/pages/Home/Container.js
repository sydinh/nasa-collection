import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import firebase from 'firebase.js';
import * as routes from 'constants/routes';

import Header from './components/Header';
import List from './components/List';

class HomeContainer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      collection: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ isLoading: true });
    this.fetchCollection();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchCollection = () => {
    const collectionRef = firebase.database().ref('collection');
    collectionRef.on('value', snapshot => {
      if (this._isMounted) {
        this.setState({ isLoading: false, collection: snapshot.val() });
      }
    });
  };

  handleAddToFavorites = data => {
    const collectionItemRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionItemRef.update({ favorite: true });
  };

  handleDeleteFromFavorites = data => {
    const collectionItemRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionItemRef.update({ favorite: false });
  };

  handleEditButtonClicked = data => {
    this.props.history.push(`${routes.NASA_EDIT}/${data[0]}`);
  };

  handleDeleteFromCollection = data => {
    const collectionItemRef = firebase.database().ref(`/collection/${data[0]}`);
    collectionItemRef.remove();
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
            onEdit={this.handleEditButtonClicked}
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

export default compose(
  withRouter,
  withScrollToTopOnMount,
)(HomeContainer);
