import axios from 'axios';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// Actions
export const SEARCH_COLLECTION_REQUESTED = 'collection/SEARCH_COLLECTION_REQUESTED';
export const SEARCH_COLLECTION_SUCCESS = 'collection/SEARCH_COLLECTION_SUCCESS';
export const SEARCH_COLLECTION_FAILURE = 'collection/SEARCH_COLLECTION_FAILURE';
export const CLEAR_SEARCH_RESULT = 'collection/CLEAR_SEARCH_RESULT';

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
      return state
        .set('collection', [])
        .set('isLoading', true)
        .set('error', null);
    case SEARCH_COLLECTION_SUCCESS:
      return state.set('isLoading', false).set('collection', action.payload);
    case SEARCH_COLLECTION_FAILURE:
      return state.set('isLoading', false).set('error', action.payload);
    case CLEAR_SEARCH_RESULT:
      return state
        .set('collection', [])
        .set('isLoading', false)
        .set('error', null);
    default:
      return state;
  }
};

// Action Creators
export const searchCollection = data => {
  return dispatch => {
    dispatch({ type: SEARCH_COLLECTION_REQUESTED });
    axios
      .get(`${process.env.API_URL}search?q=${data}`)
      .then(response =>
        dispatch({
          type: SEARCH_COLLECTION_SUCCESS,
          payload: response.data.collection,
        }),
      )
      .catch(error =>
        dispatch({
          type: SEARCH_COLLECTION_FAILURE,
          payload: error.response.data,
        }),
      );
  };
};

export const clearSearchResult = () => {
  return dispatch => dispatch({ type: CLEAR_SEARCH_RESULT });
};

// Selectors
export const getCollection = state => state.get('collection');
export const getCollectionLoading = state => state.get('isLoading');
export const getCollectionError = state => state.get('error');
export const getCollectionMetaData = createSelector(
  getCollection,
  state => state.metadata,
);
