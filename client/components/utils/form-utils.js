import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export const makeInput = (field, inputType, label, options, inputAttributes) => {
  let control;
  if (inputType === 'select') {
    control = (
      <select className='form-control' {...field}>
        {options.map((option) => {
          console.log(option.value);
          return (
            <option key={`${label}_${option.label}`} value={option.value}>{option.label}</option>
          );
        })}
      </select>
    );
  } else if (inputType === 'file') {
    control =
                <input
                  className='form-control'
                  accept='image/*'
                  required
                  type={inputType}
                  {...field}
                  value={null}
                />
  } else if (inputType === 'textArea') {
    //value={field.value} is required to make the resetForm function work.
    control = <TextField
                floatingLabelText={label}
                multiLine={true}
                fullWidth={true}
                rows={2}
                {...field}
                textareaStyle={{color: '#000'}}
                floatingLabelStyle={{color: '#000'}}
                floatingLabelFocusStyle={{color: '#43A047'}}
                className='text-field'
                underlineShow
              />;
  } else if (inputType === 'sendMessage') {
    //value={field.value} is required to make the resetForm function work.
    control = <TextField
                floatingLabelText={label}
                multiLine={true}
                // fullWidth={true}
                rows={2}
                {...field}
                textareaStyle={{color: '#fff'}}
                floatingLabelStyle={{color: '#fff'}}
                floatingLabelFocusStyle={{color: '#43A047'}}
                className='text-field'
                underlineShow
              />;
  } else if (inputType === 'textAreaNumber') {
    control = <TextField
                floatingLabelText={label}
                {...field}
                className='text-field-number'
                type='number'
                inputStyle={{color: '#000'}}
                floatingLabelStyle={{color: '#000'}}
                floatingLabelFocusStyle={{color: '#43A047'}}
                underlineShow
              />;
  } else if (inputType === 'smallTextArea') {
    control = <TextField
                floatingLabelText={label}
                {...field}
                className='text-field-small'
                type='text'
                inputStyle={{color: '#000'}}
                floatingLabelStyle={{color: '#000'}}
                floatingLabelFocusStyle={{color: '#43A047'}}
                underlineShow
              />;
  } else {
    control = <input type={inputType} {...field} {...inputAttributes} className='form-control'></input>;
  }
  return (
    <div className={`form-group ${field.touched && field.invalid ? 'has-danger' : ''}`}>
      {/* <label>{label}</label> */}
      {control}
      <div className='text-help form-control-label'>
        {field.touched ? field.error : ''}
      </div>
    </div>
  );
};

export const createValidate = (messages) => {
  return (attributes) => {
    console.log('attributes', attributes);
    const errors = {};
    for (var key in messages) {
      if (messages.hasOwnProperty(key) && attributes[key] === undefined ) {
        errors[key] = messages[key];
      }
    }
    return errors;
  };
};

//file input before changes
{/* <input className='form-control' accept='image/*' required type={inputType} {...field} value={null}></input>; */}


//style for fileInput
{/* <RaisedButton
              label='Choose an Image'
              primary={true}
            >
            style={{
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
              }}
</RaisedButton> */}
