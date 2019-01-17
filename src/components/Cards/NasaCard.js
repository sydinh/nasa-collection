import React from 'react';
import PropTypes from 'prop-types';

const NasaCard = props => (
  <figure className="nasa-card">
    {props.imgUrl && (
      <div className="nasa-card__img-container">
        <img src={props.imgUrl} alt="" className="nasa-card__img" />
      </div>
    )}
    <figcaption className="nasa-card__caption">
      {props.location ||
        (props.date && (
          <div className="nasa-card__caption-header">
            <p>{props.location}</p>
            <p>{props.date}</p>
          </div>
        ))}
      {props.title && <h3 className="nasa-card__caption-title">{props.title}</h3>}
      {props.description && <p className="nasa-card__caption-description">{props.description}</p>}
    </figcaption>
  </figure>
);

NasaCard.propTypes = {
  imgUrl: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

NasaCard.defaultProps = {
  imgUrl: '',
  location: '',
  date: '',
  title: '',
  description: '',
};

export default NasaCard;
