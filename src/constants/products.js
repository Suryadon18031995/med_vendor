export const PRODUCTS_DETAIL_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/mageapi/products/`;

export const REQUEST_PRODUCT_DETAIL = 'REQUEST_PRODUCT_DETAIL';
export const RECEIVED_PRODUCT_DETAIL = 'RECEIVED_PRODUCT_DETAIL';
export const RECEIVED_PRODUCT_DETAIL_ERROR = 'RECEIVED_PRODUCT_DETAIL_ERROR';

export const RELATED_PRODUCTS_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/mageapi/related_product/`;

export const REQUEST_RELATED_PRODUCT = 'REQUEST_RELATED_PRODUCT';
export const RECEIVED_RELATED_PRODUCT = 'RECEIVED_RELATED_PRODUCT';
export const RECEIVED_RELATED_PRODUCT_ERROR = 'RECEIVED_RELATED_PRODUCT_ERROR';


export const REQUEST_SLOT = 'REQUEST_SLOT';
export const RECEIVED_SLOT = 'RECEIVED_SLOT';
export const RECEIVED_SLOT_ERROR = 'RECEIVED_SLOT';

export const UPSELL_PRODUCTS_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/mageapi/upsell_product/`;

export const REQUEST_UPSELL_PRODUCTS = 'REQUEST_UPSELL_PRODUCTS';
export const RECEIVED_UPSELL_PRODUCTS = 'RECEIVED_UPSELL_PRODUCT';
export const RECEIVED_UPSELL_PRODUCTS_ERROR = 'RECEIVED_RELATED_PRODUCT_ERROR';

export const PRODUCTS_REVIEW_DATA_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/reviews`;

export const REQUEST_PRODUCTS_REVIEW_DATA = 'REQUEST_PRODUCTS_REVIEW_DATA';
export const RECEIVED_PRODUCTS_REVIEW_DATA = 'RECEIVED_PRODUCTS_REVIEW_DATA';
export const RECEIVED_PRODUCTS_REVIEW_DATA_ERROR = 'RECEIVED_PRODUCTS_REVIEW_DATA_ERROR';

export const PRODUCTS_REVIEW_URL = `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/reviews`;
export const REQUEST_POST_PRODUCT_REVIEW = 'REQUEST_POST_PRODUCT_REVIEW';
export const RECEIVED_POST_PRODUCT_REVIEW_SUCCESS = 'RECEIVED_POST_PRODUCT_REVIEW_SUCCESS';
export const RECEIVED_POST_PRODUCT_REVIEW_ERROR = 'RECEIVED_POST_PRODUCT_REVIEW_ERROR';

export const REQUEST_PRODUCTS_LISTING_DATA = 'REQUEST_PRODUCTS_LISTING_DATA';
export const RECEIVED_PRODUCTS_LISTING_DATA = 'RECEIVED_PRODUCTS_LISTING_DATA';
export const RECEIVED_PRODUCTS_LISTING_DATA_ERROR = 'RECEIVED_PRODUCTS_LISTING_DATA_ERROR';

export const ADD_PRODUCT_TAGS_URL = `${process.env.APPLICATION_BFF_URL}/product/tags`;

export const REQUEST_ADD_PRODUCT_TAGS = 'REQUEST_ADD_PRODUCT_TAGS';
export const RECEIVED_ADD_PRODUCT_TAGS = 'RECEIVED_ADD_PRODUCT_TAGS';
export const RECEIVED_ADD_PRODUCT_TAGS_ERROR = 'RECEIVED_ADD_PRODUCT_TAGS_ERROR';

export const PRODUCT_REVIEWS_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/products/reviews`,
    REQUEST: 'REQUEST_SUBMIT_REVIEWS',
    RECEIVED: 'RECEIVED_SUBMIT_REVIEWS',
    RECEIVED_ERROR: 'RECEIVED_SUBMIT_REVIEWS_ERROR',
});

/*export const UPSELL_PRODUCTS_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/product/upsell`,
    REQUEST: 'REQUEST_UPSELL_PRODUCTS',
    RECEIVED: 'RECEIVED_UPSELL_PRODUCTS',
    RECEIVED_ERROR: 'RECEIVED_UPSELL_PRODUCTS_ERROR',
});
*/
export const PRODUCT_REVIEWS_LIST_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/info/products/reviews`,
    REQUEST: 'REQUEST_LIST_REVIEWS',
    RECEIVED: 'RECEIVED_LIST_REVIEWS',
    RECEIVED_ERROR: 'RECEIVED_LIST_REVIEWS_ERROR',
});

export const HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/info/products/reviews`,
    REQUEST: 'REQUEST_HOVER_LIST_REVIEWS',
    RECEIVED: 'RECEIVED_HOVER_LIST_REVIEWS',
    RECEIVED_ERROR: 'RECEIVED_HOVER_LIST_REVIEWS_ERROR',
});

export const PRODUCT_TAGS_LIST_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/info/products/tags`,
    REQUEST: 'REQUEST_LIST_TAGS',
    RECEIVED: 'RECEIVED_LIST_TAGS',
    RECEIVED_ERROR: 'RECEIVED_LIST_TAGS_ERROR',
});

export const PRODUCT_TAG_DETAILS_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/info/products/tags`,
    REQUEST: 'REQUEST_TAG_DETAILS',
    RECEIVED: 'RECEIVED_TAG_DETAILS',
    RECEIVED_ERROR: 'RECEIVED_TAG_DETAILS_ERROR',
});

export const REMOVE_TAG_URL_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/info/products/tags`,
    REQUEST: 'REQUEST_TAG_DELETE',
    RECEIVED: 'RECEIVED_TAG_DELETE',
    RECEIVED_ERROR: 'RECEIVED_TAG_DELETE_ERROR',
});

export const GET_PRODUCT_DATES = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/arabella/V1/calendar-dates/`,
    REQUEST: 'REQUEST_PRODUCT_DATES',
    RECEIVED: 'RECEIVED_PRODUCT_DATES',
    RECEIVED_ERROR: 'RECEIVED_PRODUCT_DATES_ERROR',
});

