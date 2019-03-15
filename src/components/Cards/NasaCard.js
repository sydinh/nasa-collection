import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Shared/Button';

const NasaCard = memo(props => (
  <figure className="nasa-card">
    {props.imgSrc && (
      <div className="nasa-card__img-container">
        <img src={props.imgSrc} alt="" className="nasa-card__img" />
      </div>
    )}
    <figcaption className="nasa-card__caption">
      <div className="nasa-card__caption-header">
        <p>{props.location}</p>
        <p>{props.date}</p>
      </div>
      {props.title && <h3 className="nasa-card__caption-title">{props.title}</h3>}
      {props.description && <p className="nasa-card__caption-description">{props.description}</p>}
    </figcaption>
    {props.isInCollection ? (
      <div className="nasa-card__button-group">
        {props.favorite ? (
          <Button onClick={props.onDeleteFromFavorites} className="button--success">
            Liked
          </Button>
        ) : (
          <Button onClick={props.onAddToFavorites} className="button--default">
            Like
          </Button>
        )}
        <Button onClick={props.onEdit} className="button--default">
          Edit
        </Button>
        <Button onClick={props.onDeleteFromCollection} className="button--default">
          Delete
        </Button>
      </div>
    ) : (
      <Button onClick={props.onAddToCollection} className="button--default nasa-card__button-add">
        Add to NASA collection
      </Button>
    )}
  </figure>
));

NasaCard.propTypes = {
  imgSrc: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  isInCollection: PropTypes.bool,
  favorite: PropTypes.bool,
  onAddToFavorites: PropTypes.func,
  onDeleteFromFavorites: PropTypes.func,
  onAddToCollection: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleteFromCollection: PropTypes.func,
};

NasaCard.defaultProps = {
  imgSrc: '',
  location: '',
  date: '',
  title: '',
  description: '',
  isInCollection: false,
  favorite: false,
  onAddToFavorites: () => {},
  onDeleteFromFavorites: () => {},
  onAddToCollection: () => {},
  onEdit: () => {},
  onDeleteFromCollection: () => {},
};

export default NasaCard;
