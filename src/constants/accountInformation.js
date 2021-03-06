// Account Information Constants
export const ACCOUNT_INFORMATION_URL = `${process.env.APPLICATION_BFF_URL}/info/account`;
export const REQUEST_ACCOUNT_INFORMATION = 'REQUEST_ACCOUNT_INFORMATION';
export const RECEIVED_ACCOUNT_INFORMATION = 'RECEIVED_ACCOUNT_INFORMATION';
export const RECEIVED_ACCOUNT_INFORMATION_ERROR = 'RECEIVED_ACCOUNT_INFORMATION_ERROR';

// Edit Account Information Constants
export const EDIT_ACCOUNT_INFORMATION_URL = `${process.env.APPLICATION_BFF_URL}/user/register`;
export const REQUEST_EDIT_ACCOUNT_INFORMATION_RES = 'REQUEST_EDIT_ACCOUNT_INFORMATION_RES';
export const RECEIVED_EDIT_ACCOUNT_INFORMATION_RES = 'RECEIVED_EDIT_ACCOUNT_INFORMATION_RES';
export const RECEIVED_EDIT_ACCOUNT_INFORMATION_ERROR = 'RECEIVED_EDIT_ACCOUNT_INFORMATION_ERROR';

// My Rewards
export const MY_REWARDS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/info/account/myrewards`,
    REQUEST: 'REQUEST_MY_REWARDS_DATA',
    RECEIVED: 'RECEIVED_MY_REWARDS_DATA',
    RECEIVED_ERROR: 'RECEIVED_MY_REWARDS_ERROR',
});
