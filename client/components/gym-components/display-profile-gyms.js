import React, {PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';

import { toggleGymToActive, deleteGym, SHOW_DELETE_GYM_MODAL, HIDE_DELETE_GYM_MODAL } from '../../actions/gyms-actions';
import store from '../../reducers/index';

const DisplayProfileGyms = ({gyms, userData, userType, getGymPhotoUrl, isUserAtTheGym, setGymToActive, router}, context) => {
  const userProfile = JSON.parse(localStorage.getItem('profile'));
  const profileType = JSON.parse(localStorage.getItem('type'));
  const { type } = profileType;
  const { email } = userProfile;
  const showDeleteGymModal = () => {
    return (
      <ModalContainer>
        <ModalDialog>
          <p>Are you sure you want to delete this gym?</p>
          <p>This action cannot be undone.</p>
          <RaisedButton
            onTouchTap={() => {
              console.log('gyms', gyms);
              store.dispatch({type: HIDE_DELETE_GYM_MODAL, gymId: gyms.gymId, userGyms: gyms.userGyms});
              store.dispatch(deleteGym(gyms.gymId, email, type));
            }}
          >
          Confirm
          </RaisedButton>
          <RaisedButton>
            Cancel
          </RaisedButton>
        </ModalDialog>
      </ModalContainer>
    )
  }
  console.log('router context', context.router);
  return (
    <div>
      {/*You don't have a gym yet, why not select one?*/}
      {/* {console.log('props', props)} */}
      {console.log('gyms', gyms)}
      { gyms.loaded && gyms.userGyms.length > 0 ?
        <div className='gym-card-container'>
          {gyms.userGyms.map((result, index) => {
            console.log('result id', typeof result.id);
            const gymPhoto = getGymPhotoUrl(result.imgId);
            return (
              <Card>
              {console.log('getGymPhoto', getGymPhotoUrl(result.imgId))}
                <CardMedia
                  overlay={
                      <CardTitle
                        title={result.name}
                        subtitle={result.address}
                      >
                      {userData.email === email && userType === type
                        ? <Badge
                            className='delete-gym'
                            onTouchTap={() =>
                              store.dispatch({type: SHOW_DELETE_GYM_MODAL, gymId: result.id })
                            }
                            badgeContent={
                              <IconButton
                                tooltip="Delete this Gym"
                                iconStyle={{color: '#757575' }}
                              >
                                <ClearIcon />
                              </IconButton>
                            }
                            style={{float: 'right', marginTop: '-50px' }}
                          />
                        : null
                      }
                      </CardTitle>
                  }
                >
                {/* {console.log('imgId', result.imgId)} */}
                { result.imgId && result.imdId !== null ?
                  <img src={getGymPhotoUrl(result.imgId)} />
                  : <img src='http://placekitten.com/g/300/200' />
                }

                </CardMedia>
                {result.dailyHours !== null
                  ? <CardHeader
                      title="Daily Hours"
                      subtitle={result.phoneNumber}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                  : <CardHeader
                      title="Hours weren't avaliable"
                      subtitle={result.phoneNumber}
                    />
                }

                {result.dailyHours !== null
                  ? <CardText expandable={true}>
                      {result.dailyHours.weekday_text.map((hours) =>
                        <div className='daily-hours-container'>{hours}</div>
                      )}
                    </CardText>
                  : null
                }
                <CardActions>
                  {userData.email === email && userType === type
                    ?
                    <RaisedButton
                      label='Currently at the gym'
                      key={result.id}
                      primary={true}
                      className={`button-${index}`}
                      onTouchTap={() => {
                        setGymToActive(result.placeId, JSON.parse(localStorage.getItem('profile')));
                        store.dispatch({type: 'TOGGLE_ACTIVE_LOCAL', placeId: result.placeId });
                      }}
                    />
                    : null
                  }
                  { isUserAtTheGym(result, gyms) ?
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
                { ((Date.now() / 1000) - result.startedWorkingOut) < (1 * 3600) ? console.log('user is at the gym', true) : console.log('user is not at the gym', false) }
              </Card>
            );
          })}
        </div>
        :
        <Card>
          <CardHeader
            title="This User Hasn't selected any gyms yet"
          />
        </Card>}
        {/* {console.log('props', props)} */}
        { gyms.deleteGymModal ? showDeleteGymModal() : null }
    </div>
  );
};

DisplayProfileGyms.contextTypes = {
  router: PropTypes.object
};

export default DisplayProfileGyms;
