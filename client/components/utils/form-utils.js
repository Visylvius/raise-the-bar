import React from 'react';
import TextField from 'material-ui/TextField';

export const makeInput = (field, inputType, label, options, inputAttributes) => {
  let control;
  if (inputType === 'select') {
    control = (
      <select className='form-control' {...field } >
        {options.map((option) => {
          return (
            <option key={`${label}_${option.label}`} value={option.value}>{option.label}</option>
          );
        })}
      </select>
    );
  } else if (inputType === 'file') {
    control = <input className='form-control' type={inputType} {...field} value={null}></input>;
  } else if (inputType === 'textArea') {
    //value={field.value} is required to make the resetForm function work.
    control = <TextField floatingLabelText={label} multiLine={true} fullWidth={true} rows={2} {...field} className='text-field'/>;
  } else {
    control = <input type={inputType} {...field} {...inputAttributes} className='form-control'></input>;
  }
  return (
    <div className={`form-group ${field.touched && field.invalid ? 'has-danger' : ''}`}>
      <label>{label}</label>
      {control}
      <div className='text-help form-control-label'>
        {field.touched ? field.error : ''}
      </div>
    </div>
  );
};

export const createValidate = (messages) => {
  return (attributes) => {
    const errors = {};
    for (var key in messages) {
      if (messages.hasOwnProperty(key) && attributes[key] === undefined ) {
        errors[key] = messages[key];
      }
    }
    return errors;
  };
};
