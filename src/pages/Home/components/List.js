import React, { memo } from 'react';

import Item from './Item';

const List = memo(props => {
  if (props.isLoading)
    return <section className="home__instruction">Loading the collection...</section>;

  if (!props.collection)
    return <section className="home__instruction">You have no item in the collection !</section>;

  const collectionEntries = Object.entries(props.collection);

  return (
    <div className="home__list">
      {collectionEntries.map(data => (
        <Item
          data={data}
          key={data[0]}
          onAddToFavorites={props.onAddToFavorites}
          onDeleteFromFavorites={props.onDeleteFromFavorites}
          onEdit={props.onEdit}
          onDeleteFromCollection={props.onDeleteFromCollection}
        />
      ))}
    </div>
  );
});

export default List;
