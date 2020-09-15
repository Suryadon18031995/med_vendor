import _get from 'lodash/get';
import axios from 'axios';
import * as VENDOR_CONSTANTS from '../constants/vendorArtists';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

// FOR PO MANAGEMENT
export const fetchPOManagementDetails = (data, subreddit) => (dispatch) => {
    const constants = _get(VENDOR_CONSTANTS, 'ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS');
    return dispatch(dynamicActionWrapper({
      path: _get(constants, 'URL'),
      method: 'POST',
      body: data,
      initCb: _get(generateFns({ constants }), 'request'),
      successCb: _get(generateFns({ constants }), 'recieved'),
      failureCb: _get(generateFns({ constants }), 'recievedErr'),
      subreddit,
      wrapperActionType: 'ARTIST_VENDOR_ORDER_MANAGEMENT_CONSTANTS_WRAPPER',
      redirect: 'follow',
    }));
  };

// FOR CREATE PRODUCTS
export const createProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCT_UPLOAD_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCT_UPLOAD_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT LISTING
export const fetchArtistProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCTS_LIST_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCTS_LIST_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT LISTING
export const fetchLogisticSettings = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_LOGISTIC_SETTINGS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_LOGISTIC_SETTINGS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT LISTING
export const updateLogisticSettings = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_UPDATE_LOGISTIC_SETTINGS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT UPDATE
export const updateProduct = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCTS_UPDATE_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCTS_UPDATE_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR LOGISTIC SETTINGS
export const addLogisticSettings = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_ADD_LOGISTIC_SETTINGS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PO DETAILS
export const poDetails = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_SHOW_PO_DETAILS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_SHOW_PO_DETAILS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PO Action
export const poAction = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PO_ACTION_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PO_ACTION_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR GETTING RAISE VENDOR INVOICE DETAILS
export const getRaiseVendorInvoiceDetails = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_GET_RAISE_VENDOR_INVOICE_DETAILS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR RAISING INVOICE
export const raiseVendorInvoice = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_RAISE_INVOICE_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_RAISE_INVOICE_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR ARTIST LOGIN
export const login = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_LOGIN_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_LOGIN_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

export const logout = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_LOGOUT_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_LOGOUT_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR PRODUCT REQUIREMENTS
export const fetchProductRequirements = (data, subreddit) => (dispatch) => {
  const constants = _get(VENDOR_CONSTANTS, 'ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'GET',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'ARTIST_PRODUCT_REQUIREMENTS_CONSTANTS_WRAPPER',
    redirect: 'follow',
  }));
};


export const requestVendorLogin = () => ({
  type: VENDOR_CONSTANTS.VENDOR_LOGIN_CONSTANTS.REQUEST,
});


export const recievedVendorLogin = data => ({
  type: VENDOR_CONSTANTS.VENDOR_LOGIN_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedVendorLoginError = (err) => ({
  type: VENDOR_CONSTANTS.VENDOR_LOGIN_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
})

export const vendorLoginData = (data) => {
  console.log(data);
    console.log('fafaf',VENDOR_CONSTANTS.VENDOR_LOGIN_CONSTANTS.URL)
  return dispatch => {
      dispatch(requestVendorLogin());
    axios.post(VENDOR_CONSTANTS.VENDOR_LOGIN_CONSTANTS.URL,JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => dispatch(recievedVendorLogin(res.data)))
      .catch(err => dispatch(recievedVendorLoginError(err)))
  }
}



export const requestVendorLocationList = () => ({
  type: VENDOR_CONSTANTS.VENDOR_LOCATION_LIST_CONSTANTS.REQUEST,
});


export const recievedVendorLocationList = data => ({
  type: VENDOR_CONSTANTS.VENDOR_LOCATION_LIST_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedVendorLocationListError = (err) => ({
  type: VENDOR_CONSTANTS.VENDOR_LOCATION_LIST_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
})

export const vendorLocationList = (data) => {
  console.log(data);
  var url=VENDOR_CONSTANTS.VENDOR_LOCATION_LIST_CONSTANTS.URL+data;
    console.log('fafafss',url);
  return dispatch => {
      dispatch(requestVendorLocationList());
    axios.get(url,
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => dispatch(recievedVendorLocationList(res.data)))
      .catch(err => dispatch(recievedVendorLocationListError(err)))
  }
}


export const requestUpdateVendorLocation = () => ({
  type: VENDOR_CONSTANTS.UPDATE_VENDOR_LOCATION.REQUEST,
});


export const recievedUpdateVendorLocation = data => ({
  type: VENDOR_CONSTANTS.UPDATE_VENDOR_LOCATION.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedUpdateVendorLocationError = (err) => ({
  type: VENDOR_CONSTANTS.UPDATE_VENDOR_LOCATION.RECEIVED_ERROR,
  errorCode: err,
})

export const updateVendorLocation = (data) => {
  console.log(data);
  var url=VENDOR_CONSTANTS.UPDATE_VENDOR_LOCATION.URL
    console.log('fafafss',url);
  return dispatch => {
      dispatch(requestUpdateVendorLocation());
    axios.put(url,JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => dispatch(recievedUpdateVendorLocation(res.data)))
      .catch(err => dispatch(recievedUpdateVendorLocationError(err)))
  }
}



export const requestLogisticByLocationAndVendorId = () => ({
  type: VENDOR_CONSTANTS.VENDOR_LOCATION_BY_LOCATION_AND_VENDOR_CONSTANTS.REQUEST,
});


export const recievedLogisticByLocationAndVendorId = data => ({
  type: VENDOR_CONSTANTS.VENDOR_LOCATION_BY_LOCATION_AND_VENDOR_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedLogisticByLocationAndVendorIdError = (err) => ({
  type: VENDOR_CONSTANTS.VENDOR_LOCATION_BY_LOCATION_AND_VENDOR_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
})

export const fetchLogisticByLocationAndVendorId = (data,data1) => {
  console.log(data);
  console.log(data1);
  var url=VENDOR_CONSTANTS.VENDOR_LOCATION_BY_LOCATION_AND_VENDOR_CONSTANTS.URL+data+'/logistics-list/'+data1;
    console.log('fafafss',url);
  return dispatch => {
      dispatch(requestLogisticByLocationAndVendorId());
    axios.get(url,
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => dispatch(recievedLogisticByLocationAndVendorId(res.data)))
      .catch(err => dispatch(recievedLogisticByLocationAndVendorIdError(err)))
  }
}


export const requestVendorLogisticByLogisticId = () => ({
  type: VENDOR_CONSTANTS.VENDOR_LOGISTIC_BY_LOGISTIC_CONSTANTS.REQUEST,
});


export const recievedVendorLogisticByLogisticId = data => ({
  type: VENDOR_CONSTANTS.VENDOR_LOGISTIC_BY_LOGISTIC_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedVendorLogisticByLogisticIdError = (err) => ({
  type: VENDOR_CONSTANTS.VENDOR_LOGISTIC_BY_LOGISTIC_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
})

export const fetchVendorLogisticByLogisticId = (data) => {
  console.log(data);
  console.log(data1);
  var url=VENDOR_CONSTANTS.VENDOR_LOGISTIC_BY_LOGISTIC_CONSTANTS.URL+data;
    console.log('fafafss',url);
  return dispatch => {
      dispatch(requestVendorLogisticByLogisticId());
    axios.get(url,
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => dispatch(recievedVendorLogisticByLogisticId(res.data)))
      .catch(err => dispatch(recievedVendorLogisticByLogisticIdError(err)))
  }
}