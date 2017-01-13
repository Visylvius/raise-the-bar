import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import { Link } from 'react-router';
import ForwardSymbol from 'material-ui/svg-icons/content/forward';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';



const GymList = ( { listOfGyms, router }, context ) => {
  if (listOfGyms === null) {
    return null;
  }

  const getGymPhotoUrl = (photoReference) =>
     'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=' +
      encodeURIComponent(photoReference) +
      '&sensor=true&key=AIzaSyALGeTDHSBu-A1D8FltPiVBlgJZU7Cpmp0'

  return (
    <div style={{marginTop: '35px'}}>
      <GridList
        cellHeight={300}
        style={styles.gridList}
      >
      {listOfGyms.results.map((gym) => (
        <GridTile
          key={gym.place_id}
          title={gym.name}
          subtitle={<b>{gym.vicinity}</b>}
          actionIcon={<Link to={`/gym/${gym.place_id}`}><IconButton><ForwardSymbol color="white" /></IconButton></Link>}
        >
        { gym.photos && gym.photos[0]
          ? <img src={getGymPhotoUrl(gym.photos[0].photo_reference)} />
          : <img src='http://placekitten.com/300/200' />
        }
        </GridTile>
        ))}
      </GridList>
    </div>
  );
};


const styles = {
  // root: {
  //
  // },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};


{/* <div>
  {listOfGyms.results.map((gym) => {
    return (
      <Card>
        <CardMedia
          overlay={<CardTitle title={gym.name} subtitle={gym.vicinity} />}
          overlayContentStyle={styles.overlayStyle}
        >


        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <RaisedButton>More Information</RaisedButton></Link>
        </CardActions>
      </Card>
    )
  })}
</div> */}
// {/* <div>
//   <span>Name</span>
//   <div>{gymData.name}</div>
//   <span>address</span>
//   <div>{gymData.address}</div>
// </div> */}


export default GymList;


// {listOfGyms.results.map((gym) => {
//   return (
//     <Card>
//       <CardMedia
//         overlay={<CardTitle title={gym.name} subtitle={gym.vicinity} />}
//       >
//         <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${gym.photos[0].photo_reference}&sensor=true&key=${process.env.API_KEY}`} />
//       </CardMedia>
//
//       <CardText>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
//         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
//         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
//       </CardText>
//       <CardActions>
//         <RaisedButton label="Learn more about this gym" />
//       </CardActions>
//     </Card>
//   )
// })
// }
