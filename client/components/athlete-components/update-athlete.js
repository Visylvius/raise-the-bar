import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactCrop from 'react-image-crop';

import { updateAthlete, changeAvatar, cropImage } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';


const UpdateAthlete = ({fields: {
  displayName,
  name,
  liftingStyle,
  location,
  trainer,
  hasTrainer,
  preferedGyms,
  avatar,
  about,
  liftingStyles,
  experience
}, handleSubmit, updateAthlete, changeAvatar, cropImage, crop, athlete, router}, context) => {

  if (athlete === null) {
    return null;
  }
  const { id } = athlete;
  const { athlete_bio } = athlete;

  const onSubmit = (attributes) => {
    updateAthlete(attributes, id)

    //show loader to user until profile finishes updating
    //store.dispatch started updating user just an action that tells the store that user is updating you cn
    //put the axios.put here instead of the action creator
    //in the .then from axios you want to dispatch an action
    // .then(return dispatch(action))
    .then(() => {
      console.info('pushing the router');
      context.router.push(`/athlete/${id}`);
    });
  };
  const onAvatarBlur = (event) => {
    changeAvatar('UpdateAthlete', 'avatar', event.target.files);
  };
  const onAvatarComplete = (crop) => {
    cropImage('UpdateAthlete', 'crop', crop);
  };
  let cropElement = null;
  if (avatar.value) {
    cropElement = <ReactCrop src={avatar.value} onComplete={onAvatarComplete} crop={Object.assign({aspect: 1.2}, crop)}/>;
  }
  console.log(crop);
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} id='updateAthleteForm'>
      {makeInput(displayName, 'text', 'Display Name')}
      {makeInput(name, 'text', 'Name')}
      {makeInput(liftingStyle, 'text', 'Lifting Style')}
      {makeInput(location, 'text', 'Location')}
      {makeInput(about, 'textArea', 'Update your Bio here')}
      {makeInput(liftingStyles, 'textArea', 'Update your Lifting Styles Here')}
      {makeInput(experience, 'textArea', 'Update Your Experience Here')}
      {makeInput(Object.assign({}, avatar, {onChange: onAvatarBlur, onBlur: onAvatarBlur}), 'file', 'Please upload your profile picture here.')}
        {cropElement}
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateAthlete, changeAvatar, cropImage}, dispatch);
};

const mapStateToProps = (state) => {
  const athlete = state.profile.athlete;
  return { crop: state.crop, athlete };
};

UpdateAthlete.contextTypes = {
  router: PropTypes.object
};

export default reduxForm({
  form: 'UpdateAthlete',
  fields: ['displayName', 'name', 'liftingStyle', 'location', 'trainer', 'hasTrainer', 'preferedGyms',
  'avatar', 'about', 'liftingStyles', 'experience']


}, mapStateToProps, mapDispatchToProps)(UpdateAthlete);

//Update fields on the athlete field, be able to do a new image,
