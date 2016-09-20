import React from 'react';

import { Link } from 'react-router';

const GymCard = (props) => {
  console.log('props in gym card', props);
  // const linkUrl = ;
  // console.log('linkUrl', linkUrl);
  return (
    <div className="card">
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">{props.address}</p>
        <Link to={`/gym/${props.placeId}`}><button className="btn btn-primary">More Information</button></Link>
      </div>
    </div>
  );
};

export default GymCard;
