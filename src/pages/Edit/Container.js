import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import withScroll from 'utils/withScroll';
import Main from 'components/Main';
import { withFirebase } from 'firebase';
import * as ROUTES from 'constants/routes';

import Header from './components/Header';
import Form from './components/Form';

class EditContainer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCollectionItem();
    this.inputRef.current.focus();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchCollectionItem = () => {
    const { id } = this.props.match.params;
    const collectionItemRef = this.props.firebase.getCollectionItemData(id);
    collectionItemRef.on('value', snapshot => {
      if (this._isMounted) {
        this.setState({
          title: snapshot.val().title || '',
          description: snapshot.val().description || '',
        });
      }
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { title, description } = this.state;
    const { id } = this.props.match.params;
    const collectionItemRef = this.props.firebase.getCollectionItemData(id);
    collectionItemRef.update({ title, description });
    this.props.history.push(ROUTES.HOME);
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
          <Form
            {...this.state}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            inputRef={this.inputRef}
          />
        </Main>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withScroll,
  withFirebase,
)(EditContainer);
