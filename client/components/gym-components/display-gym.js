import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveGym, HIDE_SNACKBAR } from '../../actions/gyms-actions';
import store from '../../reducers';

const DisplayGym = (props) => {
  if (props.gym === null) {
    return null;
  }
  console.log('props.gym', props);
  const saveGym = () => {
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const { email } = userProfile;
      console.log('props.gym', props.gym.result);
      props.saveGym(props.gym.result.place_id, email, props.gym.result);
      console.log('props.savedGym', props.savedGym);
  };
  const getGymPhotoUrl = (photoReference) =>
     'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=' +
      encodeURIComponent(photoReference) +
      '&sensor=true&key=AIzaSyALGeTDHSBu-A1D8FltPiVBlgJZU7Cpmp0';

  const hideSnackBar = () => store.dispatch({type: HIDE_SNACKBAR});

  console.log('props.gym', props.gym);
  console.log('props', props);
  return (
  <div>
    <Card>
      <CardMedia
        overlay={<CardTitle title={props.gym.result.name} subtitle={props.gym.result.formatted_address} />}
      >
      { props.gym.result.photos && props.gym.result.photos[0] ? <img src={getGymPhotoUrl(props.gym.result.photos[0].photo_reference)} />
        : <img src='http://placekitten.com/300/200' />
      }
      </CardMedia>
      {props.gym.result.opening_hours !== undefined
        ? <CardHeader
            title="Daily Hours"
            subtitle={<span>Phone Number <b>{props.gym.result.formatted_phone_number}</b></span>}
            actAsExpander={true}
            showExpandableButton={true}
        />
        : <CardHeader
            subtitle={<span>Phone Number <b>{props.gym.result.formatted_phone_number}</b></span>}
        />
      }

      {console.log('props line 48', props.gym)}
      {props.gym.result.opening_hours !== undefined
        ? <CardText expandable={true}>
          {props.gym.result.opening_hours.weekday_text.map((hours) => {
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
            key={props.gym.result.place_id}
            label='Save this Gym'
            primary={true}
            onTouchTap={() => saveGym()}
            >
          </RaisedButton>
          { props.savedGym.snackBarShowing ?
            <Snackbar
             open={props.savedGym.snackBarShowing}
             message="Gym was successfully saved"
             autoHideDuration={4000}
             style={{backgroundColor: '#262626', width: '40%', margin: 'auto'}}
             bodyStyle={{backgroundColor: '#262626'}}
             onRequestClose={() => hideSnackBar()}
            />
            : null }
        </div>
      </CardActions>
      { props.savedGym.snackBarShowing ? console.log('its true') : console.log('nothing happened')}
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGym);
