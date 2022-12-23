import * as Realm from 'realm-web';
const APP_ID = process.env.REACT_APP_TRADER_APP_ID || 'unknown_app_id';
const realm = new Realm.App({id: APP_ID});

/**
 * Handle Realm Authorization
 * @returns Realm instance
 */
export const useRealm = (
  /**
   * Run function when user logs out
   */
  onLogout: Function = () => {}
) => {

  /**
   * Get credentials object that can be used to Log in by email
   */
  const getCredentials = (email: any, password: any) => {
    return Realm.Credentials.emailPassword(
      email, password
    );
  };

  /**
   * Log out user
   */
  const logOut = () => {
    if(realm.currentUser) {
      realm.currentUser.logOut();
      onLogout();
    }
  };

  return {
    realm,
    isUserLoggedIn: () => !!realm.currentUser,
    logOut,
    getCredentials
  };
};

