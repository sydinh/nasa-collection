import React from 'react';

import NasaCard from 'components/Cards/NasaCard';
import { IMG_REGEX, IMG_PLACEHOLDER } from '../constants';

const List = props => {
  if (props.collection.length === 0) return null;

  const { items: collectionItems } = props.collection;

  return (
    <div className="search__list">
      {props.metaData && (
        <p className="search__list-title">
          {props.metaData.total_hits} {props.metaData.total_hits > 2 ? 'results' : 'result'} for “
          {props.searchTerm}”
        </p>
      )}
      <div className="search__list-row">
        {collectionItems &&
          collectionItems.map(data => {
            const nasaData = data.data[0];
            const nasaLinks = data.links[0];
            const href = nasaLinks.href;

            let imgUrl = '';
            if (IMG_REGEX.test(href)) {
              imgUrl = href;
            } else {
              imgUrl = IMG_PLACEHOLDER;
            }

            return (
              <div className="search__list-column" key={nasaData.nasa_id}>
                <NasaCard
                  imgUrl={imgUrl}
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
