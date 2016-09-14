import React from 'react';

const GymCard = (props) => {
  return (
    <div className="card">
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">{props.address}</p>
        <button className="btn btn-primary">More Information</button>
      </div>
    </div>
  );
};

export default GymCard;
