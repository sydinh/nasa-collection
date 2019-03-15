import React, { memo } from 'react';

import NasaCard from 'components/Cards/NasaCard';
import { imgPlaceholder } from 'utils/imgUtil';

const Item = memo(props => {
  const links = props.data[1].links ? props.data[1].links[0] : [];
  const imgSrc = imgPlaceholder(links.href);

  return (
    <div className="home__item">
      <NasaCard
        isInCollection
        imgSrc={imgSrc}
        location={props.data[1].data[0].location}
        date={props.data[1].data[0].date_created}
        title={props.data[1].data[0].title}
        description={props.data[1].data[0].description}
        favorite={props.data[1].favorite}
        onAddToFavorites={() => props.onAddToFavorites(props.data)}
        onDeleteFromFavorites={() => props.onDeleteFromFavorites(props.data)}
        onEdit={() => props.onEdit(props.data)}
        onDeleteFromCollection={() => props.onDeleteFromCollection(props.data)}
      />
    </div>
  );
});

export default Item;
