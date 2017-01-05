import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper'
import axios from 'axios';

class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    // console.log('calling loggedIn', this.loggedIn());
    this.lock = new Auth0Lock(clientId, domain, {});
    console.log(this.lock, 'lock');
    console.log('this in authservice', this);
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
    this.lock.on('authorization_error', this._authorizationError.bind(this));

    // this.on('user-logged-in', this._checkUserProfile.bind(this));


    // // binds login functions to keep this context
    // this.login = this.login.bind(this);
    // const windowHash = this.lock.parseHash(window.location.hash);
    // console.log('window hash', windowHash);
    // //
    // if (windowHash !== null) {
    //   this.setToken(windowHash.id_token);
    // }
    //
    console.log('get token', this.getToken());
    // if (!this.getToken()) {
    //   this.setToken(this.lock.parseHash(window.location.hash));
    // }
  }

  _doAuthentication(authResult){
   // Saves the user token
   console.log('in doAuth', authResult);
   this.setToken(authResult.idToken);
   console.log('this in doAuth', this);
   // Async loads the user profile data
   this.lock.getProfile(authResult.idToken, (error, profile) => {
     console.log('in get profile');
     if (error) {
       console.log('Error loading the Profile', error);
     } else {
       this.setProfile(profile);
       this._retrieveUserProfile(profile)
        .then((serverProfile) => {
          if (serverProfile) {
            console.log('user profile exists');
          } else {
            //use this.emit to communicate to outside of the auth service
            console.log('emitting event', serverProfile);
            this.emit('server-profile-non-existent', serverProfile);
          }
        });
     }
   });
 }

 _authorizationError(error){
   // Unexpected authentication error
   console.log('Authentication Error', error);
 }

 setProfile(profile){
   // Saves profile data to localStorage
   localStorage.setItem('profile', JSON.stringify(profile));
   // Triggers profile_updated event to update the UI
   this.emit('profile_updated', profile);
 }

 _retrieveUserProfile(profile) {
   const { email } = profile;
   return new Promise((resolve, reject) => {
     axios.get(`/api/user/${email}`)
      .then((result) => {
        if (result.data.type === 'not found') {
          console.log('user was not found');
          resolve(null);
        }
        console.log('user exists', result);
        if (result.data.type === 'athlete') {
          localStorage.setItem('type', JSON.stringify({type: 'athlete'}));
        } else if (result.data.type === 'trainer') {
          localStorage.setItem('type', JSON.stringify({type: 'trainer'}));
        }
        resolve(result);
      });
   });
 }

 getProfile(){
   // Retrieves the profile data from localStorage
   const profile = localStorage.getItem('profile');
   return profile ? JSON.parse(localStorage.profile) : {};
 }

  login() {
    this.lock.show({});
  }
  loggedIn(){
    // Checks if there is a saved token and it's still valid
    console.log('in logged in');
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    //messagingToken
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('type');
  }
}

export default new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
