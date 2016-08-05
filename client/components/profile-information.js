import React from 'react';

const ProfileInformation = (props) => {
  return (
    <div className='row'>
      <div className='col-md-4'>
        <div className='main-bio' id='bio-about' style={[baseStyles.bioAbout, baseStyles.mainBio]}>About</div>
         <hr className='main-bio-hr' style={baseStyles.mainBioHr} />
        <div className='bio-text' style={baseStyles.bioText}>
          <div className='bio-data-main' style={baseStyles.bioDataMain}>
           {props.about}
          </div>
        </div>
        <div className='main-bio' style={baseStyles.mainBio}>Experience</div>
        <hr className='main-bio-hr' style={baseStyles.mainBioHr} />
        <div className='bio-text' style={baseStyles.bioText}>
          <div className='bio-data-main' style={baseStyles.bioDataMain}>
           {props.experience}
          </div>
        </div>
        <div className='main-bio' style={baseStyles.mainBio}>Lifting Styles</div>
        <hr className='main-bio-hr' style={baseStyles.mainBioHr} />
        <div className='bio-text' style={baseStyles.bioText}>
          <div className='bio-data-main' style={baseStyles.bioDataMain}>
           {props.liftingStyles}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;

const baseStyles = {
  bioAbout: {
    marginLeft: '48px'
  },
  mainBio: {
    paddingTop: '10px',
    marginRight: '400px',
    fontSize: '20px',
    width: '200px'
  },
  mainBioHr: {
    marginRight: '330px',
    marginBottom: '-40px'
  },
  bioText: {
    height: '250px',
    width: '500px',
    border: '1px solid blue',
    marginLeft: '150px',
    marginTop: '-20px'
  },
  bioDataMain: {
    width: '500px',
    wordWrap: 'break-word'
  },
};
