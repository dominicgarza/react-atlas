import React from 'react';
import * as Realm from 'realm-web';
const APP_ID = process.env.REACT_APP_TRADER_APP_ID || 'unknown_app_id';
const realm = new Realm.App({id: APP_ID});

/**
 * Handle Realm Authorization
 */
export const useRealm = (
  /**
   * Run function when user logs in
   */
  onLogin: Function,
  /**
   * Run function when user logs out
   */
  onLogout: Function
) => {

  const [currentUser, setCurrentUser] = React.useState(realm.currentUser);
  const [errors, setErrors] = React.useState();

  /**
   * Get credentials object that can be used to Log in by email
   */
  const loginWithEmail = React.useCallback(
    async (email: any, password: any) => {
    const credentials = Realm.Credentials.emailPassword(
      email, password
    );
    
    try {
      await realm.logIn(credentials);
      setCurrentUser(realm.currentUser)
      setErrors(undefined);
      onLogin();

    } catch(err: any) {
      setErrors(err);
      console.error(`Failed to log in ${err.error}`);
    }

    }, [onLogin]);

  /**
   * Log out user
   */
  const logOut = React.useCallback(
    async () => {
      if (!currentUser) {
        return;
      }
      await currentUser.logOut();
      await realm.removeUser(currentUser);
      setCurrentUser(realm.currentUser);
      onLogout();
    }, [onLogout, currentUser]
  );

  return {
    realm,
    currentUser,
    isUserLoggedIn: !!currentUser,
    logOut,
    loginWithEmail,
    errors
  };
};

