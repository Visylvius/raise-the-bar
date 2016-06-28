import React from 'react';
import Radium from 'radium';

const baseStyles = {
  upperContainer: {
    marginTop: '20px',
    backgroundColor: '#blue'
  },
  pageContainer: {
    height: '100vh',
    backgroundColor: '#E6E6E6'
  },
  profileTop: {
    height: '123px',
    backgroundColor: '#E6E5E4',
    borderRadius: '5px 5px 0px 0px'
  },
  profileBottom: {
    height: '400px',
    backgroundColor: 'FFF'
  },
  imageContainer: {
    marginTop: '15px',
    marginLeft: '18px',
    height: '150px',
    width: '200px',
    borderRadius: '5px'
  },
  athleteName: {
    marginLeft: '270px',
    marginTop: -'140px',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  liftingStyle: {
    marginLeft: '270px',
    fontSize: '18px',
    color: '#C9C9C8'
  },
  navigationLinks: {
    marginTop: -'24px',
    marginLeft: '40px'
  },
  lineBreak: {
    marginTop: '60px'
  },
  icons: {
    marginLeft: '20px'
  },
  hrSpace: {
    width: '195px',
    marginRight: '90px'
  },
  mainBio: {
    paddingTop: '10px',
    marginRight: '400px',
    fontSize: '20px',
    width: '200px'
  },
  profileNavigation: {
    width: '335px'
  },
  bioText: {
    height: '250px',
    width: '500px',
    border: '1px solid blue',
    marginLeft: '150px',
    marginTop: '-20px'
  },
  mainBioData: {
    border: '1px solid black'
  },
  bioDataMain: {
    width: '500px',
    wordWrap: 'break-word'
  },
  bioAbout: {
    marginLeft: '48px'
  },
  mainBioHr: {
    marginRight: '330px',
    marginBottom: -'40px'
  }
};

const AthleteProfile = (props) => {
  return (
  <div className='container-fluid'>
   <div className='row profile-top' style={baseStyles.profileTop}>
     <div className='col-md-4'>
       <img style={baseStyles.imageContainer} src='http://placekitten.com/300/200' />
       <div className='athlete-name' style={baseStyles.athleteName}>Athlete Name</div>
       <div className='lifting-style' style={baseStyles.liftingStyle}>Location</div>
     </div>
   </div>
   <div className='row'>
     <div className='col-md-4 profile-navigation' style={baseStyles.profileNavigation}>
       <hr className='line-break hr-space' style={baseStyles.hrSpace} />
       <div className='icons' style={baseStyles.icons}><i className='fa fa-user'></i></div>
       <div className='navigation-links' style={baseStyles.navigationLinks}>Profile</div>
       <hr className='hr-space' style={baseStyles.hrSpace} />
       <div className='icons' style={baseStyles.icons}><i className='fa fa-envelope'></i></div>
       <div className='navigation-links' style={baseStyles.navigationLinks}>Message</div>
       <hr className='hr-space' style={baseStyles.hrSpace}/>
       <div className='icons' style={baseStyles.icons}><i className='fa fa-building'></i></div>
       <div className='navigation-links' style={baseStyles.navigationLinks}>Gyms</div>
       <hr className='hr-space' style={baseStyles.hrSpace}/>
       <div className='icons' style={baseStyles.icons}><i className='fa fa-calendar'></i></div>
       <div className='navigation-links' style={baseStyles.navigationLinks}>Schedule</div>
     </div>
     <div className='row'>
       <div className='col-md-4'>
         <div className='main-bio' id='bio-about' style={[baseStyles.bioAbout, baseStyles.mainBio]}>About</div>
          <hr className='main-bio-hr' style={baseStyles.mainBioHr} />
         <div className='bio-text' style={baseStyles.bioText}>
           <div className='bio-data-main' style={baseStyles.bioDataMain}>
IBREAKLINESHASNKDNKJNSGKJDFNGKJDFNGKJDFNGKJNDFJKGNDFJKGNKJDFNGJKDFNGKJLDFNGKJDFNGKJDFNGKJDFNGKJLDFNGKJDNFGKJNDFGKJNDFKJGNDFKJNGKJDFNGKJDFNGKJNDFJKNGJKDFNGKJNDFJKNBKJDFNGJKDNFKGJNDFJKGNDFJKNGJK
           </div>
         </div>
         <div className='main-bio' style={baseStyles.mainBio}>Experience</div>
         <hr className='main-bio-hr' style={baseStyles.mainBioHr} />
         <div className='bio-text' style={baseStyles.bioText}>
           <div className='bio-data-main' style={baseStyles.bioDataMain}>
IBREAKLINESHASNKDNKJNSGKJDFNGKJDFNGKJDFNGKJNDFJKGNDFJKGNKJDFNGJKDFNGKJLDFNGKJDFNGKJDFNGKJDFNGKJLDFNGKJDNFGKJNDFGKJNDFKJGNDFKJNGKJDFNGKJDFNGKJNDFJKNGJKDFNGKJNDFJKNBKJDFNGJKDNFKGJNDFJKGNDFJKNGJK
           </div>
         </div>
         <div className='main-bio' style={baseStyles.mainBio}>Lifting Styles</div>
         <hr className='main-bio-hr' style={baseStyles.mainBioHr} />
         <div className='bio-text' style={baseStyles.bioText}>
           <div className='bio-data-main' style={baseStyles.bioDataMain}>
IBREAKLINESHASNKDNKJNSGKJDFNGKJDFNGKJDFNGKJNDFJKGNDFJKGNKJDFNGJKDFNGKJLDFNGKJDFNGKJDFNGKJDFNGKJLDFNGKJDNFGKJNDFGKJNDFKJGNDFKJNGKJDFNGKJDFNGKJNDFJKNGJKDFNGKJNDFJKNBKJDFNGJKDNFKGJNDFJKGNDFJKNGJK
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
  );
};

export default Radium(AthleteProfile);
