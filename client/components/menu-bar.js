import React from 'react';
import Radium from 'radium';

const styles = {
  navbarStyle: {
    display: 'inline-block',
    marginTop: '13px',
    color: '#E1E5EA',
    marginRight: '20px',
    fontSize: '16px'
  }
};

const MenuBar = () => {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container-fluid">
        <div style={styles.navbarStyle}>Find Athletes</div>
        <div style={styles.navbarStyle}>Find Trainers</div>
      </div>
    </nav>
  );
};

export default Radium(MenuBar);
