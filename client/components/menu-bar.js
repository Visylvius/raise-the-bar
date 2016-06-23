import React from 'react';
import Radium from 'radium';

const styles = {};

const MenuBar = (props) => {
  return (
    <div>
      <nav class="navbar navbar-dark bg-inverse">
        <ul class="nav navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Athletes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Trainers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Find Gyms Near You</a>
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
