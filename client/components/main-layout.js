import React from 'react';
import Radium from 'radium';

const baseStyles = {
  mainDiv: {
    height: '100%'
  }
};

const MainLayout = (props) => {
  return (
    <div className='main-wrapper' style={baseStyles.mainDiv}>
      <main style={baseStyles.mainDiv}>
        {props.children}
      </main>
    </div>
  );
};

export default Radium(MainLayout);
