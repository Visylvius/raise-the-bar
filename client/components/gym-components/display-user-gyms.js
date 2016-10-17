import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { displayAthleteGyms } from '../../actions/athlete-actions';

const DisplayUserGyms = (props) => {
  console.log('props', props);
  return (
      <div style={styles.root}>
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        <GridTile
          subtitle={<span>by <b></b></span>}
          // actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
        </GridTile>
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
