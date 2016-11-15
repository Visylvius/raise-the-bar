import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveGym } from '../../actions/gyms-actions';

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
  };
  const getGymPhotoUrl = (photoReference) =>
     'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=' +
      encodeURIComponent(photoReference) +
      '&sensor=true&key=AIzaSyALGeTDHSBu-A1D8FltPiVBlgJZU7Cpmp0';

  console.log('props.gym', props.gym);
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
      <CardHeader
        title="Daily Hours"
        subtitle={<span>Phone Number <b>{props.gym.result.formatted_phone_number}</b></span>}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        {props.gym.result.opening_hours.weekday_text.map((hours) => {
          return (
            <div
              key={hours}
              className='daily-hours-container'>
              {hours}
            </div>
          );
        })}
      </CardText>
      <CardActions>
        <div
          className='button-wrapper'
          style={{textAlign: 'center'}}
        >
          <RaisedButton
            key={props.gym.result.place_id}
            label='Save this Gym'
            primary={true}
            onTouchTap={() => saveGym()}>
          </RaisedButton>
        </div>
      </CardActions>
    </Card>
  </div>
  );
};

const mapStateToProps = (state) => {
  const { gym, error, loading } = state.gym;
  return { gym, error, loading };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveGym}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGym);
