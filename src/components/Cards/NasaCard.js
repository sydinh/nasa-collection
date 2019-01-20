import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Shared/Button';

const NasaCard = props => {
  const buttonFavoriteClass = classNames({
    'button--primary': true,
    'button--liked': props.favorite,
  });

  return (
    <figure className="nasa-card">
      {props.imgUrl && (
        <div className="nasa-card__img-container">
          <img src={props.imgUrl} alt="" className="nasa-card__img" />
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
          <Button onClick={props.onAddToFavorites} className={buttonFavoriteClass}>
            {props.favorite ? 'Liked' : 'Like'}
          </Button>
          <Button onClick={props.onDeleteFromCollection} className="button--primary">
            Delete
          </Button>
        </div>
      ) : (
        <Button onClick={props.onAddToCollection} className="button--primary nasa-card__button-add">
          Add to NASA collection
        </Button>
      )}
    </figure>
  );
};

NasaCard.propTypes = {
  imgUrl: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  isInCollection: PropTypes.bool,
  favorite: PropTypes.bool,
  onAddToFavorites: PropTypes.func,
  onAddToCollection: PropTypes.func,
  onDeleteFromCollection: PropTypes.func,
};

NasaCard.defaultProps = {
  imgUrl: '',
  location: '',
  date: '',
  title: '',
  description: '',
  isInCollection: false,
  favorite: false,
  onAddToFavorites: () => {},
  onAddToCollection: () => {},
  onDeleteFromCollection: () => {},
};

export default NasaCard;
