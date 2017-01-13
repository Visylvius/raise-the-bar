import React, {PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';

import { saveGym, HIDE_SNACKBAR } from '../../actions/gyms-actions';
import store from '../../reducers';

const DisplayGym = ({router, gym, savedGym, saveGym}, context) => {
  if (gym === null) {
    return null;
  }
  // console.log('gym', props);
  const saveUserGym = () => {
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const { email } = userProfile;
      console.log('gym', gym.result);
      saveGym(gym.result.place_id, email, gym.result);
      console.log('savedGym', savedGym);
  };
  const getGymPhotoUrl = (photoReference) =>
     'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=' +
      encodeURIComponent(photoReference) +
      '&sensor=true&key=AIzaSyALGeTDHSBu-A1D8FltPiVBlgJZU7Cpmp0';

  const hideSnackBar = () => store.dispatch({type: HIDE_SNACKBAR});

  console.log('gym', gym);
  // console.log('props', props);
  console.log('router', context.router);
  return (
  <div>
    <Card>
      <CardHeader
        avatar={
          <Badge
            primary={true}
            onTouchTap={() => context.router.goBack()}
            badgeContent={
              <IconButton
                tooltip="Go Back"
                className='back-button'

              >
                <BackIcon />
              </IconButton>
            }
          />
        }
      />
      <CardMedia
        overlay={<CardTitle title={gym.result.name} subtitle={gym.result.formatted_address} />}
      >
      { gym.result.photos && gym.result.photos[0] ? <img src={getGymPhotoUrl(gym.result.photos[0].photo_reference)} />
        : <img src='http://placekitten.com/300/200' />
      }
      </CardMedia>
      {gym.result.opening_hours !== undefined
        ? <CardHeader
            title="Daily Hours"
            subtitle={<span>Phone Number <b>{gym.result.formatted_phone_number}</b></span>}
            actAsExpander={true}
            showExpandableButton={true}
        />
        : <CardHeader
            subtitle={<span>Phone Number <b>{gym.result.formatted_phone_number}</b></span>}
        />
      }

      {console.log('props line 48', gym)}
      {gym.result.opening_hours !== undefined
        ? <CardText expandable={true}>
          {gym.result.opening_hours.weekday_text.map((hours) => {
            return (
              <div
                key={hours}
                className='daily-hours-container'
              >
                {hours}
              </div>
            );
          })}
          </CardText>
        : null
      }

      <CardActions>
        <div
          className='button-wrapper'
          style={{textAlign: 'center'}}
        >
          <RaisedButton
            key={gym.result.place_id}
            label='Save this Gym'
            primary={true}
            onTouchTap={() => saveUserGym()}
            >
          </RaisedButton>
          { savedGym.snackBarShowing ?
            <Snackbar
             open={savedGym.snackBarShowing}
             message="Gym was successfully saved"
             autoHideDuration={4000}
             style={{backgroundColor: '#262626', width: '40%', margin: 'auto'}}
             bodyStyle={{backgroundColor: '#262626'}}
             onRequestClose={() => hideSnackBar()}
            />
            : null }
        </div>
      </CardActions>
      { savedGym.snackBarShowing ? console.log('its true') : console.log('nothing happened')}
    </Card>
  </div>
  );
};

const mapStateToProps = (state) => {
  const { gym, error, loading } = state.gym;
  const savedGym = state.savedGym;
  return { gym, error, loading, savedGym };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveGym}, dispatch);
};

DisplayGym.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGym);
