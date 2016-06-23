import React from 'react';
import Radium from 'Radium';


const MainLayout = (props) => {
  return (
    <div>
      <main>
        {props.children}
      </main>
    </div>
  );
};

export default Radium(MainLayout);
