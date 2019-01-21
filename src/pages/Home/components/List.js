import React from 'react';

import NasaCard from 'components/Cards/NasaCard';
import { imgPlaceholder } from 'utils/imgUtil';

const List = props => {
  if (props.isLoading)
    return <section className="home__instruction">Loading the collection...</section>;
  if (!props.collection)
    return <section className="home__instruction">You have no item in the collection !</section>;

  const collectionEntries = Object.entries(props.collection);

  return (
    <div className="home__list">
      {collectionEntries.map(data => {
        const nasaLinks = data[1].links ? data[1].links[0] : [];
        const imgUrl = imgPlaceholder(nasaLinks.href);

        return (
          <div className="home__item" key={data[0]}>
            <NasaCard
              isInCollection
              imgUrl={imgUrl}
              location={data[1].data[0].location}
              date={data[1].data[0].date_created}
              title={data[1].data[0].title}
              description={data[1].data[0].description}
              favorite={data[1].favorite}
              onAddToFavorites={() => props.onAddToFavorites(data)}
              onDeleteFromFavorites={() => props.onDeleteFromFavorites(data)}
              onDeleteFromCollection={() => props.onDeleteFromCollection(data)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default List;
