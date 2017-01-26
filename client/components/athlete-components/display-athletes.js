import React from 'react';
import { Link } from 'react-router'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ForwardSymbol from 'material-ui/svg-icons/content/forward';


import UserCard from '../user-card';
import UserProfile from '../user-profile';


const DisplayAthletes = ({athletes}) => {
  if (athletes === null) {
    return null;
  }

  const styles = {
    gridList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  };

  return (
    <div className='flex-profile-page'>
      {athletes.map(athlete => {
        return (
          <Link to={`athlete/${athlete.id}`}>
            <div classNameName="card" style={{width: '20rem'}}>
              <img className="card-img-top" src={`http://res.cloudinary.com/raise-the-bar/image/upload/${athlete.imgId}.jpg`} alt="Card image cap" />
              <div className="card-block">
                <h4 className="card-title">{athlete.displayName}</h4>
                <p className="card-text">{athlete.liftingStyle}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );


    // <GridList
    //   classNameName='flex-grid-profile'
    //   cellHeight={496}
    //   style={{margin: '2.5%'}}
    // >
      // {athletes.map((athlete) => (
    //     <GridTile
    //       key={athlete.id}
    //       classNameName='grid-list'
    //       title={
    //         <div
    //           classNameName='grid-name'
    //         >
    //           {athlete.displayName}
    //         </div>
    //       }
    //       subtitle={
    //         <span
    //         >
    //           <b
    //             classNameName='grid-description'
    //           >
    //             {athlete.liftingStyle}
    //           </b>
    //         </span>
    //       }
    //       actionIcon={
    //         <Link to={`athlete/${athlete.id}`}>
    //           <IconButton
    //             iconStyle={{height: '50px', width: '50px'}}
    //             style={{height: '100px', width: '100px'}}
    //           >
    //             <ForwardSymbol color="white" />
    //           </IconButton>
    //         </Link>
    //       }
    //       // style={{margin: 5}}
    //     >
    //       <img src={`http://res.cloudinary.com/raise-the-bar/image/upload/${athlete.imgId}.jpg`} />
    //     </GridTile>
    //   ))}
    // </GridList>
  // );
};

export default DisplayAthletes;
