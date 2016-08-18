import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper'


class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    //

    // console.log('calling loggedIn', this.loggedIn());
    this.lock = new Auth0Lock(clientId, domain, {});
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);

    const windowHash = this.lock.parseHash(window.location.hash);
    console.log('window hash', windowHash);

    if (windowHash !== null) {
      this.setToken(windowHash.id_token);
    }

    console.log('get token', this.getToken());
    // if (!this.getToken()) {
    //   this.setToken(this.lock.parseHash(window.location.hash));
    // }
  }

  _doAuthentication(authResult){
    // Saves the user token
    console.log('running do auth');
    this.setToken(authResult.idToken);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show({});
    //callbackURL: 'http://localhost:4000/'
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
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }
}

export default new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
