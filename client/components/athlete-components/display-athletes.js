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
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto',
    },
  };

  return (
    <div style={styles.root}>
      <GridList
        cellHeight={250}
        style={styles.gridList}
      >
        {athletes.map((athlete) => (
          <GridTile
            key={athlete.id}
            title={athlete.displayName}
            subtitle={<span>style <b>{athlete.liftingStyle}</b></span>}
            actionIcon={<Link to={`athlete/${athlete.id}`}><IconButton><ForwardSymbol color="white" /></IconButton></Link>}
          >
            <img src={`http://res.cloudinary.com/raise-the-bar/image/upload/${athlete.imgId}.jpg`} />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
};

export default DisplayAthletes;
