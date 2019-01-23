import React from 'react';

import Loading from 'components/Loading';
import { displayPluralOrSingular } from 'utils/stringUtil';

import Item from './Item';

const List = props => {
  if (props.isLoading) return <Loading isSearching />;

  if (props.error) return <p className="search__invalid-feedback">{props.error.reason}</p>;

  if (props.collection.length === 0) return null;

  const { items: collectionItems } = props.collection;

  return (
    <div className="search__list">
      {props.metaData && (
        <p className="search__list-title">
          {props.metaData.total_hits} {displayPluralOrSingular(props.metaData.total_hits, 'result')}{' '}
          for “{props.searchTerm}”
        </p>
      )}
      <div className="search__list-row">
        {collectionItems &&
          collectionItems.map(data => (
            <Item
              data={data}
              key={data.data[0].nasa_id}
              onAddToCollection={props.onAddToCollection}
            />
          ))}
      </div>
    </div>
  );
};

export default List;
