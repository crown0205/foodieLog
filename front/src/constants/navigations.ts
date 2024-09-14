const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const MapNavigations = {
  MAP_HOME: 'MapHome',
} as const;

export {authNavigations, MapNavigations, mainNavigations};
