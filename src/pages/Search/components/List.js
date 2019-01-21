import React from 'react';

import NasaCard from 'components/Cards/NasaCard';
import { imgPlaceholder } from 'utils/imgUtil';
import { displayPluralOrSingular } from 'utils/stringUtil';

const List = props => {
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
          collectionItems.map(data => {
            const nasaData = data.data[0];
            const nasaLinks = data.links ? data.links[0] : [];
            const imgSrc = imgPlaceholder(nasaLinks.href);

            return (
              <div className="search__list-column" key={nasaData.nasa_id}>
                <NasaCard
                  imgSrc={imgSrc}
                  location={nasaData.location}
                  date={nasaData.date_created}
                  title={nasaData.title}
                  description={nasaData.description}
                  onAddToCollection={() => props.onAddToCollection(data)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default List;
