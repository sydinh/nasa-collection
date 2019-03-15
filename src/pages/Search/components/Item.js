import React, { memo } from 'react';

import NasaCard from 'components/Cards/NasaCard';
import { imgPlaceholder } from 'utils/imgUtil';

const Item = memo(props => {
  const nasaData = props.data.data ? props.data.data[0] : [];
  const nasaLinks = props.data.links ? props.data.links[0] : [];
  const imgSrc = imgPlaceholder(nasaLinks.href);

  return (
    <div className="search__list-column">
      <NasaCard
        imgSrc={imgSrc}
        location={nasaData.location}
        date={nasaData.date_created}
        title={nasaData.title}
        description={nasaData.description}
        onAddToCollection={() => props.onAddToCollection(props.data)}
      />
    </div>
  );
});

export default Item;
