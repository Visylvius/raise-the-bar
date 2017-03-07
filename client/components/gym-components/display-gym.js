import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';
import PhoneIcon from 'material-ui/svg-icons/communication/call';
import WorldIcon from 'material-ui/svg-icons/social/public';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import AddIcon from 'material-ui/svg-icons/av/playlist-add';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import TimeIcon from 'material-ui/svg-icons/device/access-time';


import { saveGym, HIDE_SNACKBAR } from '../../actions/gyms-actions';
import store from '../../reducers';

const DisplayGym = ({router, gym, savedGym, saveGym}, context) => {
  if (gym === null) {
    return null;
  }
  console.log('gym', gym);
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

  const createStarIcons = (rating) => {
    const iconArray = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      iconArray.push(i);
    }
    return iconArray;
  };

  const gymNumber = gym.result.formatted_phone_number;
  console.log('gym', gym);
  // console.log('props', props);
  console.log('router', context.router);
  return (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-12'>
        <div
          className='image-container'
          style={{width: '100%', marginTop: '1em'}}
        >
          { gym.result.photos && gym.result.photos[0]
            ?
            <img
                className='gym-profile'
                src={getGymPhotoUrl(gym.result.photos[0].photo_reference)}
                style={{width: '100%', marginTop: '1em', height: '31em'}}
              />
            :
            <img className='gym-profile' src='http://placekitten.com/300/200' />
          }
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-12'>
        <div className='gym-information-banner' style={{backgroundColor: '#43A047'}}>
          <div className='gym-information-wrapper'>
            <p className='gym-information-p top-p'>{gym.result.name}</p>
            <p className='gym-information-p middle-p'>
            {gym.result.rating !== 0
              ?
              <div className='rating-wrapper'>
                <div
                  className='rating-number'
                  style={{marginRight: '10px', display: 'inline-block', fontSize: '24px'}}
                >
                  {gym.result.rating}
                </div>
                {createStarIcons(gym.result.rating).map((iconArray, index) => {
                  return (
                    <div
                      style={{display: 'inline-block'}}
                      className='star-icon'
                      key={index}
                    >
                      <StarIcon />
                    </div>
                  );
                })}
              </div>
              : null
            }
            </p>
            <p className='gym-information-p bottom-p'>{gym.result.formatted_phone_number}</p>
          </div>
        </div>
      </div>
    </div>
    <div className='action-wrapper'>
      <div className='row'>
        <div className='col-4'>
          <div className='button-action-wrapper'>
            <div className='button-action'>
              <IconButton
                iconStyle={{ width: '120px', height: '120px'}}
                style={{width: '240px', padding: '10px'}}
              >
                <PhoneIcon
                  color='#43A047'
                />
              </IconButton>
              <p className='action-text'>CALL</p>
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className='button-action-wrapper'>
            <div className='button-action'>
              <IconButton
                iconStyle={{ width: '120px', height: '120px'}}
                style={{width: '240px', padding: '10px'}}
              >
                <WorldIcon
                  color='#43A047'
                />
              </IconButton>
              <p className='action-text'>WEBSITE</p>
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className='button-action-wrapper'>
            <div className='button-action'>
              <IconButton
                iconStyle={{ width: '120px', height: '120px'}}
                style={{width: '240px', padding: '10px'}}
                key={gym.result.place_id}
                onTouchTap={() => saveUserGym()}
              >
                <AddIcon
                  color='#43A047'
                />
              </IconButton>
              <p className='action-text'>SAVE THE GYM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='info-wrapper'>
      <div className='row'>
        <div className='col-2'>
          <div className='gym-core-info-icon'>
            <div className='fa fa-map-marker action-marker'></div>
          </div>
        </div>
        <div className='col-10'>
          <div className='gym-core-info-text'>
            <p className='info-text'>{gym.result.formatted_address}</p>
          </div>
        </div>
      </div>
    </div>
    <div className='info-wrapper'>
      <div className='row'>
        <div className='col-2'>
          <div className='gym-core-info-icon'>
            <div className='fa fa-clock-o action-marker'></div>
          </div>
        </div>
        <div className='col-10'>
          <div className='gym-core-info-text'>
            <p className='info-text'>
              {gym.result.opening_hours.open_now
                ? <p className='info-text'>Open Now</p>
                : <p className='info-text'>Closed</p>
              }
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='info-wrapper'>
      <div className='row'>
        <div className='col-2'>
          <div className='gym-core-info-icon'>
            <div className='fa fa-phone action-marker'></div>
          </div>
        </div>
        <div className='col-10'>
          <div className='gym-core-info-text'>
            <p className='info-text'>{gym.result.formatted_phone_number}</p>
          </div>
        </div>
      </div>
    </div>
    <a
      href={gym.result.website}
      target="_blank"
      className='website-link'
    >
      <div className='info-wrapper'>
        <div className='row'>
          <div className='col-2'>
            <div className='gym-core-info-icon'>
              <div className='fa fa-globe action-marker'></div>
            </div>
          </div>
          <div className='col-10'>
            <div className='gym-core-info-text'>
              <p className='info-text'>{gym.result.website}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
    {/* <Card> */}
      {/* <CardMedia
        overlay={<CardTitle title={gym.result.name} subtitle={gym.result.formatted_address} />}
      > */}

      {/* </CardMedia> */}
      {gym.result.opening_hours !== undefined
        // ? <CardHeader
        //     title="Daily Hours"
        //     subtitle={<span>Phone Number <b>{gym.result.formatted_phone_number}</b></span>}
        //     actAsExpander={true}
        //     showExpandableButton={true}
        // />
        // : <CardHeader
        //     subtitle={<span>Phone Number <b>{gym.result.formatted_phone_number}</b></span>}
        // />
      }

      {console.log('props line 48', gym)}
      {/* {gym.result.opening_hours !== undefined
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
      } */}

      {/* <CardActions> */}
        {/* <div
          className='button-wrapper'
          style={{textAlign: 'center'}}
        > */}
          { savedGym.snackBarShowing ?
            <Snackbar
             open={savedGym.snackBarShowing}
             message="Gym was successfully saved"
             autoHideDuration={1500}
             style={{backgroundColor: '#262626', width: '40%', margin: 'auto'}}
             bodyStyle={{backgroundColor: '#262626'}}
             onRequestClose={() => hideSnackBar()}
            />
            : null }
        {/* </div> */}
      {/* </CardActions> */}
      { savedGym.snackBarShowing ? console.log('its true') : console.log('nothing happened')}
    {/* </Card> */}
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
