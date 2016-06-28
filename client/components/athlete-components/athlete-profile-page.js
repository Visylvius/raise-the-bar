import React from 'react';
import Radium from 'radium';


const AthleteProfile = (props) => {
  return (
    <div className='container-fluid'>
   <div className='row profile-top'>
     <div className='col-md-4'>
       <img className='something' src='http://placekitten.com/300/200' />
       <div className='athlete-name'>Athlete Name</div>
       <div className='lifting-style'>Location</div>
     </div>
   </div>
   <div className='row'>
     <div className='col-md-4 profile-navigation'>
       <hr className='line-break hr-space' />
       <div className='icons'><i className='fa fa-user'></i></div>
       <div className='navigation-links'>Profile</div>
       <hr className='hr-space' />
       <div className='icons'><i className='fa fa-envelope'></i></div>
       <div className='navigation-links'>Message</div>
       <hr className='hr-space' />
       <div className='icons'><i className='fa fa-building'></i></div>
       <div className='navigation-links'>Gyms</div>
       <hr className='hr-space' />
       <div className='icons'><i className='fa fa-calendar'></i></div>
       <div className='navigation-links'>Schedule</div>
     </div>
     <div className='row'>
       <div className='col-md-4'>
         <div className='main-bio' id='bio-about'>About</div>
          <hr className='main-bio-hr' />
         <div className='bio-text'>
           <div className='bio-data-main'>
IBREAKLINESHASNKDNKJNSGKJDFNGKJDFNGKJDFNGKJNDFJKGNDFJKGNKJDFNGJKDFNGKJLDFNGKJDFNGKJDFNGKJDFNGKJLDFNGKJDNFGKJNDFGKJNDFKJGNDFKJNGKJDFNGKJDFNGKJNDFJKNGJKDFNGKJNDFJKNBKJDFNGJKDNFKGJNDFJKGNDFJKNGJK
           </div>
         </div>
         <div className='main-bio'>Experience</div>
         <hr className='main-bio-hr' />
         <div className='bio-text'>
           <div className='bio-data-main'>
IBREAKLINESHASNKDNKJNSGKJDFNGKJDFNGKJDFNGKJNDFJKGNDFJKGNKJDFNGJKDFNGKJLDFNGKJDFNGKJDFNGKJDFNGKJLDFNGKJDNFGKJNDFGKJNDFKJGNDFKJNGKJDFNGKJDFNGKJNDFJKNGJKDFNGKJNDFJKNBKJDFNGJKDNFKGJNDFJKGNDFJKNGJK
           </div>
         </div>
         <div className='main-bio'>Lifting Styles</div>
         <hr className='main-bio-hr' />
         <div className='bio-text'>
           <div className='bio-data-main'>
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
