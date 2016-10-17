import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ForwardSymbol from 'material-ui/svg-icons/content/forward';

import { fetchTrainers } from '../../actions/trainer-actions';

const DisplayTrainers = (props) => {

  const { trainers } = props;
  if (trainers === null) {
    return null;
  }

  return (
    <div style={styles.root}>
      <GridList
        cellHeight={250}
        style={styles.gridList}
      >
        {trainers.map((trainer) => (
          <GridTile
            key={trainer.id}
            title={trainer.displayName}
            subtitle={<span>style <b>{trainer.location}</b></span>}
            actionIcon={<Link to={`trainer/${trainer.id}`}><IconButton><ForwardSymbol color="white" /></IconButton></Link>}
          >
            <img src={`/avatars/trainer/${trainer.imgId}.jpg`} />
          </GridTile>
        ))}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchTrainers}, dispatch)
};

const mapStateToProps = (state) => {
  const { trainers, error, loading } = state.trainers
  return { trainers, error, loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTrainers);
