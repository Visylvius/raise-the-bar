import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

const styles = {
  cardContainer: {
    width: '100%',
    maxWidth: '300px',
    display: 'inline-block',
    marginRight: '50px'
  },
  cardBlock: {
    fontFamily: 'Roboto'
  },
  cardData: {
    backgroundColor:  '#3E4551',
    color: '#fff',
    textAlign: 'center',
    height: 'auto',
    padding: '10px'
  },
  btnAction: {
    margin: '-19px 20px',
    float: 'right',
    backgroundColor: '#4B515D',
    height: '47px',
    width: '47px',
    lineHeight: 0
  },
  btnFloating: {
    cursor: 'pointing',
    display: 'inline-block',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    width: '37px',
    height: '37px',
    lineHeight: '37px',
    padding: 0,
    borderRadius: '50%',
    transition: '.3s',
    verticalAlign: 'middle',
    ':hover': {
      backgroundColor: '#a6c'
    }
  },
  btnFloatingi: {
    width: 'inherit',
    display: 'inline-block',
    textAlign: 'center',
    color: '#fff',
    fontSize: '1.6rem',
    lineHeight: '37px'
  },
  fa: {
    display: 'inline-block',
    font: 'normal normal normal 14px/1 FontAwesome',
    fontSize: 'inherit',
    textRendering: 'auto',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  },
  imgStyles: {
    backgroundSize: 'cover'
  },
  supplementalStyles: {
    fontSize: '18px',
    marginTop: '5px'
  }
};

const UserCard = (props) => {
  return (
    <div className='card-container' style={styles.cardContainer}>
      <div className='card' style={styles.supplementalStyles}>
        <img className='card-img-top img-fluid' src={`/avatars/${props.id}.jpg`} style={styles.imgStyles} />
        <Link to={`/athlete/${props.id}`}><button className="btn-floating btn-action" style={[styles.btnAction, styles.btnFloating]}><i className="fa fa-chevron-right" style={[styles.btnFloatingi, styles.fa, styles.supplementalStyles]}></i></button></Link>
        <div className='card-block' style={styles.cardBlock}>
          <h4 className='card-title top-card'>{props.displayName}</h4>
          <hr />
            <p className='card-text'>Some text to demonstrate where the text in the card will go. I'm writing a bunch to see how it looks when it wraps</p>
        </div>
        <div className='card-data' style={styles.cardData}>
          <h6 className="card-subtitle">{props.liftingStyle}</h6>
        </div>
      </div>
    </div>
  );
};

//Refactor Link
// <Link to={props.profie./}> </Link>

export default Radium(UserCard);
