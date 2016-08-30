// import React from 'react';
// import Radium from 'radium';
//
// const styles = {};
//
// const MenuBar = (props) => {
//   return (
//     <div>
//       <nav className="navbar navbar-dark bg-inverse">
//         <ul className="nav navbar-nav">
//           <li className="nav-item active">
//             <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">Athletes</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">Trainers</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">Find Gyms Near You</a>
//           </li>
//         </ul>
//       </nav>
//       <div>
//         {props.children}
//       </div>
//     </div>
//
//   );
// };
//
// export default Radium(MenuBar);


import React, { PropTypes } from 'react';
import auth from '../AuthService';

class MenuBar extends React.Component {


   userButton() {
     if (localStorage.getItem('id_token')) {
       return <a className='nav-link' href='#' onClick={this.logout.bind(this)}>Logout</a>;
     } else {
       return <a className='nav-link' href='#' onClick={auth.login.bind(this)}>Login</a>;
     }
   }

   logout(){
     // destroys the session data
     console.log('in logout');
     this.props.auth.logout()
     // redirects to login page
     this.context.router.push('/');
   }



  render(){
    return (
      <div>
        <nav className="navbar navbar-dark bg-inverse">
          <ul className="nav navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Athletes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Trainers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Find Gyms Near You</a>
            </li>
            <li className='nav-item'>
              {this.userButton()}
            </li>
          </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MenuBar.contextTypes = {
  router: PropTypes.object
};

MenuBar.PropTypes = {
  // auth: PropTypes.instanceOf(auth)
};

export default MenuBar;
