import React from 'react';

import NasaCard from 'components/Cards/NasaCard';
import { IMG_REGEX, IMG_PLACEHOLDER } from '../constants';

const List = ({ collection, searchTerm }) => {
  if (collection.length === 0) return null;

  const { items: collectionItems } = collection;
  const { total_hits: totalHits } = collection.metadata;

  return (
    <div className="search__list">
      <p className="search__list-title">
        {totalHits} {totalHits > 2 ? 'results' : 'result'} for “{searchTerm}”
      </p>
      <div className="search__list-row">
        {collectionItems && collectionItems.map(data => renderCollectionItems(data))}
      </div>
    </div>
  );
};

function renderCollectionItems({ data, links }) {
  const nasaData = data[0];
  const nasaLinks = links[0];
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
      />
    </div>
  );
}

export default List;
