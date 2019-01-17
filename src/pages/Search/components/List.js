import React from 'react';

import NasaCard from 'components/Cards/NasaCard';

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

function renderCollectionItems(data) {
  console.log(data);

  return (
    <div className="search__list-column" key={data.data[0].nasa_id}>
      <NasaCard
        imgUrl={data.links[0].href}
        location={data.data[0].location}
        date={data.data[0].date_created}
        title={data.data[0].title}
        description={data.data[0].description}
      />
    </div>
  );
}

export default List;
