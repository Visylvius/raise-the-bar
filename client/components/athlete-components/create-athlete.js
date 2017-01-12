import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactCrop from 'react-image-crop';
import '!style!css!sass!react-image-crop/dist/ReactCrop.css';
import RaisedButton from 'material-ui/RaisedButton';

import { makeAthlete, changeAvatar, cropImage } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';


const CreateAthlete = ({fields: {
  displayName,
  name,
  liftingStyle,
  location,
  trainer,
  cardDescription,
  avatar,
  bio
}, handleSubmit, makeAthlete, changeAvatar, cropImage, crop, router}, context) => {
  const onSubmit = (attributes) => {
    localStorage.setItem('type', JSON.stringify({type: 'athlete'}));
    makeAthlete(attributes)
      .then(() => {
        context.router.push('/findathletes');
      })
  };
  const onAvatarBlur = (event) => {
    changeAvatar('CreateAthlete', 'avatar', event.target.files);
  };
  const onAvatarComplete = (crop) => {
    cropImage('CreateAthlete', 'crop', crop);
  };
  let cropElement = null;
  if (avatar.value) {
    cropElement = <ReactCrop src={avatar.value} onComplete={onAvatarComplete} crop={Object.assign({aspect: 1.2}, crop)}/>;
  }
  console.log('router', context.router);
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} id='athleteForm'>
      {makeInput(displayName, 'textArea', 'Display Name')}
      {makeInput(name, 'textArea', 'Name')}
      {makeInput(liftingStyle, 'textArea', 'Lifting Style')}
      {makeInput(location, 'textArea', 'Location')}
      {makeInput(cardDescription, 'textArea', 'Tell us a little bit about yourself')}
      {makeInput(Object.assign({}, avatar, {onChange: onAvatarBlur, onBlur: onAvatarBlur}), 'file', 'Please upload your profile picture here.')}
        {cropElement}
        <div
          style={{textAlign: 'center'}}
          className='submit-btn-wrapper'
        >
          <RaisedButton
            label="Submit"
            primary={true}
            type='submit'
          />
        </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({makeAthlete, changeAvatar, cropImage}, dispatch);

const mapStateToProps = (state) => { crop: state.crop };

CreateAthlete.contextTypes = {
  router: PropTypes.object
};

export default reduxForm({
  form: 'CreateAthlete',
  fields: ['displayName', 'name', 'liftingStyle', 'location', 'cardDescription', 'avatar'],
  validate: createValidate({
    displayName: 'Please enter a display name',
    name: 'Please enter a name',
    liftingStyle: 'Please enter your prefered lifting style',
    location: 'Please enter your location',
    // trainer: 'Validate that you are a trainer',
    // hasTrainer: 'Please validate if you have a trainer'
  })
}, mapStateToProps, mapDispatchToProps)(CreateAthlete);
