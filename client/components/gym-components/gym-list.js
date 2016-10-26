import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import GymCard from './gym-card.js';

const GymList = ( { listOfGyms } ) => {
  if (listOfGyms === null) {
    return null;
  }

  const getGymPhotoUrl = (photoReference) =>
     'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=' +
      encodeURIComponent(photoReference) +
      '&sensor=true&key=AIzaSyALGeTDHSBu-A1D8FltPiVBlgJZU7Cpmp0'


  console.log(listOfGyms);

  return (
    <div>
      {listOfGyms.results.map((gym) => {
        return (
          <Card>
            <CardMedia
              overlay={<CardTitle title={gym.name} subtitle={gym.vicinity} />}
            >
            { gym.photos && gym.photos[0]
              ? <img src={getGymPhotoUrl(gym.photos[0].photo_reference)} />
              : <img src='http://placekitten.com/300/200' />
            }

            </CardMedia>
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
            </CardActions>
          </Card>
        )
      })}
    </div>
  );
};

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
