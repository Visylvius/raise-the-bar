import React from 'react';
import Radium from 'radium';

const styles = {};

const MenuBar = (props) => {
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
        </ul>
      </nav>
      <div>
        {props.children}
      </div>
    </div>

  );
};

export default Radium(MenuBar);
