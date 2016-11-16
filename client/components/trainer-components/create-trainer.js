import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import ReactCrop from 'react-image-crop';
import '!style!css!sass!react-image-crop/dist/ReactCrop.css';
import RaisedButton from 'material-ui/RaisedButton';

import { makeTrainer } from '../../actions/trainer-actions';
import { changeAvatar, cropImage } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const CreateTrainer = ({fields: {
  displayName,
  name,
  location,
  price,
  phoneNumber,
  avatar
}, handleSubmit, makeTrainer, changeAvatar, cropImage, crop}, { router }) => {
  const onSubmit = (attributes) => {
    localStorage.setItem('type', JSON.stringify({type: 'trainer'}));
    makeTrainer(attributes);
  };
  const onAvatarBlur = (event) => {
    changeAvatar('CreateTrainer', 'avatar', event.target.files);
  };
  const onAvatarComplete = (crop) => {
    cropImage('CreateTrainer', 'crop', crop);
  };
  let cropElement = null;
  if (avatar.value) {
    cropElement = <ReactCrop src={avatar.value} onComplete={onAvatarComplete} crop={Object.assign({aspect: 1.2}, crop)}/>;
  }
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      {makeInput(displayName, 'smallTextArea', 'Display Name')}
      {makeInput(name, 'smallTextArea', 'Name')}
      {makeInput(location, 'smallTextArea', 'Location')}
      {makeInput(price, 'textAreaNumber', 'Price', null, {min: 0, step: 0.05})}
      {makeInput(phoneNumber, 'textAreaNumber', 'Phone Number')}
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

const validate = (attributes) => {

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({makeTrainer, changeAvatar, cropImage}, dispatch);
};

const mapStateToProps = (state) => {
  return { crop: state.crop};
};

export default reduxForm({
  form: 'CreateTrainer',
  fields: ['displayName', 'name', 'location', 'price', 'phoneNumber', 'avatar']
}, mapStateToProps, mapDispatchToProps)(CreateTrainer);
