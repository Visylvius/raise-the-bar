import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ForwardSymbol from 'material-ui/svg-icons/content/forward';


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

const UserProfile = (props) => {
  const userType = JSON.parse(localStorage.getItem('type'));
  console.log(userType, 'userType in user-card');
  return (
    <div style={styles.root}>
      <GridList
        cellHeight={180}
        style={styles.gridList}
        cols={2}
      >
        <Subheader>{props.userType}</Subheader>
        <GridTile
            key={props.id}
            title={props.displayName}
            subtitle={<b>{props.liftingStyle}</b>}
            actionIcon={<IconButton><ForwardSymbol color="white" /></IconButton>}
            userType={props.userType}
          >
            <img src={`/avatars/${userType}/${props.id}.jpg`} />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
};

export default UserProfile;
