import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactCrop from 'react-image-crop';
import RaisedButton from 'material-ui/RaisedButton';

import { updateTrainer } from '../../actions/trainer-actions';
import { changeAvatar, cropImage } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const UpdateTrainer = ({fields: {
  displayName,
  name,
  location,
  email,
  price,
  phoneNumber,
  about,
  liftingStyles,
  experience,
  avatar
}, handleSubmit, updateTrainer, changeAvatar, cropImage, crop, trainer, router}, context) => {

  if (trainer === null) {
    return null;
  }
  const { id } = trainer;
  const { trainer_bio } = trainer;

  const onSubmit = (attributes) => {
    console.log('updateTrainer', updateTrainer);
    updateTrainer(attributes, id)
      .then(() => {
        console.log('in the promise of updateTrainer')
        context.router.push(`/trainer/${id}`);
      });
  };

  const onAvatarBlur = (event) => {
    changeAvatar('UpdateTrainer', 'avatar', event.target.files);
  };
  const onAvatarComplete = (crop) => {
    cropImage('UpdateTrainer', 'crop', crop);
  };
  let cropElement = null;
  if (avatar.value) {
    cropElement = <ReactCrop src={avatar.value} onComplete={onAvatarComplete} crop={Object.assign({aspect: 1.2}, crop)}/>;
  }

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} id='updateTrainerForm'>
      {makeInput(displayName, 'smallTextArea', 'Display Name')}
      {makeInput(name, 'smallTextArea', 'Name')}
      {makeInput(location, 'smallTextArea', 'Location')}
      {makeInput(email, 'email', 'Email')}
      {makeInput(price, 'textAreaNumber', 'Price', null, {min: 0, step: 0.05})}
      {makeInput(phoneNumber, 'smallTextArea', 'Phone Number')}
      {makeInput(about, 'textArea', 'update your about here')}
      {makeInput(experience, 'textArea', 'update your bio here')}
      {makeInput(liftingStyles, 'textArea', 'update your liftingStyles here')}
      {makeInput(Object.assign({}, avatar, {onChange: onAvatarBlur, onBlur: onAvatarBlur}), 'file', 'Please upload your profile picture here.')}
        {cropElement}
        <div
          className='submit-btn-wrapper'
          style={{textAlign: 'center'}}
        >
          <RaisedButton
            label="Send"
            primary={true}
            type='submit'
          />
        </div>
    </form>
  );
};



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateTrainer, changeAvatar, cropImage}, dispatch);
};

const mapStateToProps = (state) => {
  const trainer = state.trainer.trainer;
  return { crop: state.crop, trainer };
};

UpdateTrainer.contextTypes = {
  router: PropTypes.object
};

export default reduxForm({
  form: 'UpdateTrainer',
  fields: ['displayName', 'name', 'location', 'email',
  'price', 'phoneNumber', 'about', 'experience', 'liftingStyles', 'avatar'],

}, mapStateToProps, mapDispatchToProps)(UpdateTrainer)
