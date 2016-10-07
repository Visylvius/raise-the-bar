import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import UserCard from '../user-card';
import UserProfile from '../user-profile';
import ForwardSymbol from 'material-ui/svg-icons/content/forward';


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

  const athleteCard = athletes.map((athlete) => {
    const userType = JSON.parse(localStorage.getItem('type'));
    console.log(userType, 'userType in user-card');
    console.log(athlete)
    //const profileLink = `/athlete/${athlete.id}`
    return (
      <UserProfile
        key={athlete.id}
        title={athlete.displayName}
        subtitle={athlete.liftingStyle}
        userType='athlete'
      />
    )
  })

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
            subtitle={<b>{athlete.liftingStyle}</b>}
            actionIcon={<IconButton><ForwardSymbol color="white" /></IconButton>}
          >
            <img src={`/avatars/athlete/${athlete.id}.jpg`} />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
};

export default DisplayAthletes;
