// register constants
export const REGISTER_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/customers`;
export const REQUEST_REGISTER_SEARCH = 'REQUEST_REGISTER_SEARCH';
export const RECEIVED_REGISTER_SEARCH = 'RECEIVED_REGISTER_SEARCH';
export const RECEIVED_REGISTER_SEARCH_ERROR = 'RECEIVED_REGISTER_SEARCH_ERROR';

// state list of customer registration
export const STATE_LIST_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/directory/countries/US`;
export const REQUEST_STATE_LIST_SEARCH = 'REQUEST_STATE_LIST_SEARCH';
export const RECEIVED_STATE_LIST_SEARCH = 'RECEIVED_STATE_LIST_SEARCH';
export const RECEIVED_STATE_LIST_SEARCH_ERROR = 'RECEIVED_STATE_LIST_SEARCH_ERROR';

// track url
export const TRACK_URL = `${process.env.APPLICATION_BFF_URL}/track/url`;
export const REQUEST_TRACK_URL = 'REQUEST_TRACK_URL';
export const RECEIVED_TRACK_URL = 'RECEIVED_TRACK_URL';
export const RECEIVED_TRACK_URL_ERROR = 'RECEIVED_TRACK_URL_ERROR';

export const CLEAR_REGISTER_DATA = 'CLEAR_REGISTER_DATA';
