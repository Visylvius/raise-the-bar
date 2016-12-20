import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { toggleGymToActive } from '../../actions/gyms-actions';
import {Tab} from 'material-ui/Tabs';
import store from '../../reducers/index'

const DisplayProfileGyms = (props) => {
  return (
    <div>
      {/*You don't have a gym yet, why not select one?*/}
      {console.log('props', props)}
      {console.log('props.gyms', props.gyms)}
      { props.gyms.loaded ?
        <div className='gym-card-container'>
          {props.gyms.userGyms.map((result, index) => {
            const gymPhoto = props.getGymPhotoUrl(result.imgId);
            return (
              <Card>
              {console.log('getGymPhoto', props.getGymPhotoUrl(result.imgId))}
                <CardMedia
                  overlay={<CardTitle title={result.name} subtitle={result.address} />}
                >
                {/* {console.log('imgId', result.imgId)} */}
                { result.imgId && result.imdId !== null ?
                  <img src={props.getGymPhotoUrl(result.imgId)} />
                  : <img src='http://placekitten.com/300/200' />
                }
                </CardMedia>
                <CardHeader
                  title="Daily Hours"
                  subtitle={result.phoneNumber}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  {result.dailyHours.weekday_text.map((hours) =>
                    <div className='daily-hours-container'>{hours}</div>
                  )}
                </CardText>
                <CardActions>
                  <RaisedButton
                    label='Currently at the gym'
                    key={result.id}
                    primary={true}
                    className={`button-${index}`}
                    onTouchTap={() => {
                      props.setGymToActive(result.placeId, JSON.parse(localStorage.getItem('profile')))
                      store.dispatch({type: 'TOGGLE_ACTIVE_LOCAL', placeId: result.placeId })
                    }}
                  />
                  { props.isUserAtTheGym(result, props.gyms) ?
                    <div
                      style={{
                          color: '#FF9800',
                          float: 'right',
                          marginTop: '9px'
                        }}
                    >
                      Is at this gym
                    </div>
                    : null }
                </CardActions>
                { console.log('result.startedWorkingOut', result.startedWorkingOut) }
                { ((Date.now() / 1000) - result.startedWorkingOut) < (1*3600) ? console.log('user is at the gym', true) : console.log('user is not at the gym', false) }
              </Card>
            );
          })}
        </div>
        : <div>Gyms are loading</div>}
    </div>
  );
};
  export default DisplayProfileGyms;
