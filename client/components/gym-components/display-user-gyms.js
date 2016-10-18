import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { displayAthleteGyms } from '../../actions/athlete-actions';

const DisplayUserGyms = (props) => {
  console.log('props', props);
  if (props.userGyms === null) {
    return null;
  }

  const userIsAtGym = () => {
    console.log('i am being clicked');
  };

  return (
    <div style={styles.root}>
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
      {props.userGyms.map((gym) => {
        return (
          <GridTile
            title={gym.name}
            subtitle={<span>Click gym</span>}
            actionIcon={
              <IconButton
                onTouchTap={() => userIsAtGym()}
              >
                <PlayArrow/>
              </IconButton>
            }
            // actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
          </GridTile>
        );
      })}
      </GridList>
    </div>
  );
};

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


const mapStateToProps = (state) => {
  const { userGyms, error, loaded } = state.athleteGym;
  return { userGyms, error, loaded };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({displayAthleteGyms}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayUserGyms);
