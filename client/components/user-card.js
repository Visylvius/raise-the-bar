import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

const UserCard = (props) => {
  return (

      <div
        className='grid-box'
        key={props.id}
      >
        <img src={props.userImg} />
        <div className='user-info'>
          <div className='display-name'>
            {props.displayName}
          </div>
          <div className='user-info'>
            {props.liftingStyle}
          </div>
        </div>
      </div>
  )
};

export default UserCard;
