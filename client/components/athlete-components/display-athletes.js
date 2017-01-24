import React from 'react';
import { Link } from 'react-router'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ForwardSymbol from 'material-ui/svg-icons/content/forward';


import UserCard from '../user-card';
import UserProfile from '../user-profile';


const DisplayAthletes = ({athletes}) => {
  if (athletes === null) {
    return null;
  }

  const styles = {
    gridList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  };

  return (
    <GridList
      className='flex-grid-profile'
      cellHeight={496}
      style={{margin: '2.5%'}}
    >
      {athletes.map((athlete) => (
        <GridTile
          key={athlete.id}
          className='grid-list'
          title={
            <div
              className='grid-name'
            >
              {athlete.displayName}
            </div>
          }
          subtitle={
            <span
            >
              <b
                className='grid-description'
              >
                {athlete.liftingStyle}
              </b>
            </span>
          }
          actionIcon={
            <Link to={`athlete/${athlete.id}`}>
              <IconButton
                iconStyle={{height: '50px', width: '50px'}}
                style={{height: '100px', width: '100px'}}
              >
                <ForwardSymbol color="white" />
              </IconButton>
            </Link>
          }
          // style={{margin: 5}}
        >
          <img src={`http://res.cloudinary.com/raise-the-bar/image/upload/${athlete.imgId}.jpg`} />
        </GridTile>
      ))}
    </GridList>
  );
};

export default DisplayAthletes;
