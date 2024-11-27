import { signal } from '@preact/signals-react';

enum SessionItems {
  OPTIN = 'OPTIN',
  TOKEN = 'accessToken'
}

/** set a session item and return his value. If not possible returs null */
const setSessionItem = (key: SessionItems, value: string) => {
  try {
    sessionStorage.setItem(key, value);
    return value;
  } catch {
    return null;
  }
};

/** get a session item and return his value. If not possible returns null */
const getSessionItem = (key: SessionItems) => sessionStorage.getItem(key);

/** clear both session and local storage */
const clear = () => {
  window.sessionStorage.clear();
  window.localStorage.clear();
};

const optin = signal<boolean>(Boolean(getSessionItem(SessionItems.OPTIN)));

export default {
  pullPaymentsOptIn: {
    set: () => {
      if (setSessionItem(SessionItems.OPTIN, 'true')) optin.value = true;
      return optin.value;
    },
    /** return a signal */
    get: () => {
      getSessionItem(SessionItems.OPTIN);
      return optin;
    },
    clear: () => {
      if (setSessionItem(SessionItems.OPTIN, 'false')) optin.value = false;
    }
  },
  user: {
    hasToken: () => Boolean(getSessionItem(SessionItems.TOKEN)),
    /** clear both session and local storage */
    logOut: clear,
    setToken: (token: string) => setSessionItem(SessionItems.TOKEN, token)
  }
};
