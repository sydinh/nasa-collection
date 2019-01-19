import axios from 'axios';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { API } from 'constants/ApiClient';

// Actions
export const SEARCH_COLLECTION_REQUESTED = 'collection/SEARCH_COLLECTION_REQUESTED';
export const SEARCH_COLLECTION_SUCCESS = 'collection/SEARCH_COLLECTION_SUCCESS';
export const SEARCH_COLLECTION_FAILURE = 'collection/SEARCH_COLLECTION_FAILURE';

// Initial State
const initialState = fromJS({
  collection: [],
  isLoading: false,
  error: null,
});

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COLLECTION_REQUESTED:
      return state.set('isLoading', true);
    case SEARCH_COLLECTION_SUCCESS:
      return state.set('isLoading', false).set('collection', action.payload);
    case SEARCH_COLLECTION_FAILURE:
      return state.set('isLoading', false).set('error', action.payload);
    default:
      return state;
  }
};

// Action Creators
export const searchCollection = data => {
  return dispatch => {
    dispatch({ type: SEARCH_COLLECTION_REQUESTED });
    axios
      .get(API + data)
      .then(response =>
        dispatch({
          type: SEARCH_COLLECTION_SUCCESS,
          payload: response.data.collection,
        }),
      )
      .catch(error =>
        dispatch({
          type: SEARCH_COLLECTION_FAILURE,
          payload: error,
        }),
      );
  };
};

// Selectors
export const getCollection = state => state.get('collection');
export const getCollectionLoading = state => state.get('isLoading');
export const getCollectionError = state => state.get('error');
export const getCollectionMetaData = createSelector(
  getCollection,
  state => state.metadata,
);
