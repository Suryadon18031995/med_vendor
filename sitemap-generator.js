<<<<<<< HEAD
require('babel-register');

import { paramsApplier as applyParams, sitemapBuilder as buildSitemap } from 'react-router-sitemap';

const axios = require('axios');
const sm = require('sitemap');
const fs = require('fs');

// remaining routes to be added
{ /* <Route path="/blog/category/:id"/>
<Route path="/blog/archive/:id"/>
<Route path="/blog/author/:id"/>
<Route path="/blog/tags/:id"/>
<Route path="/blog/:id"/>
<Route path="/ErrorsPage"/>
<Route path="/customer/account/tags/detail/:tagId"/>
<Route path="/print/order/:id"/>
<Route path="/product/reviews/:id"/> */ }

const paths = ['/', '/freshDeals', '/seasonalSubscription', '/wholesale-flowers/:id', '/customer/account', '/customer/account/edit', '/customer/account/address', '/customer/account/orders', '/customer/account/recuring_profile', '/customer/account/reviews', '/customer/account/tags', '/customer/account/wishlist', '/customer/account/pending', '/customer/account/vendor_reviews', '/customer/account/favourites', '/salesRep', '/wholesale-flowers.html', '/new-arrivals.html', '/wholesale-flowers/floral-supplies.html', '/wholesale-flowers/local-delivery.html', '/catalogsearch/result/', '/preMadeBouquets', '/nextday-delivery.html', '/best-seller.html', '/FallCollectionContainer', '/wedding-flowers.html', '/register', '/about-us', '/blog', '/blog/search', '/sustainable_floral_fund', '/forgotPassword', '/view-cart', '/contacts', '/privacy-policy', '/term-and-conditions', '/returns-and-refunds-policy', '/faq-vendor', '/faq-customer', '/track-order/', '/login', '/logoutSuccess', '/RegisterSuccess', '/profileDetail', '/customer/account/address/new', '/customer/account/address/edit', '/customer/pastPurchase', '/checkout/onepage', '/customer/account/viewOrder', '/checkout/onepage/success', '/firstData', '/customer/account/re-order', '/paypal', '/prebook', '/vendors', '/umicrosite/vendor/register/', '/about-us#features', '/about-us#howitwork', '/about-us#pricing', '/bkm/vendor', '/:id'];
const urlData = [];
axios.defaults.headers.post['Content-Type'] = 'application/json';

=======
require('babel-register');

import { paramsApplier as applyParams, sitemapBuilder as buildSitemap } from 'react-router-sitemap';

const axios = require('axios');
const sm = require('sitemap');
const fs = require('fs');

// remaining routes to be added
{ /* <Route path="/blog/category/:id"/>
<Route path="/blog/archive/:id"/>
<Route path="/blog/author/:id"/>
<Route path="/blog/tags/:id"/>
<Route path="/blog/:id"/>
<Route path="/ErrorsPage"/>
<Route path="/customer/account/tags/detail/:tagId"/>
<Route path="/print/order/:id"/>
<Route path="/product/reviews/:id"/> */ }

const paths = ['/', '/freshDeals', '/seasonalSubscription', '/wholesale-flowers/:id', '/customer/account', '/customer/account/edit', '/customer/account/address', '/customer/account/orders', '/customer/account/recuring_profile', '/customer/account/reviews', '/customer/account/tags', '/customer/account/wishlist', '/customer/account/pending', '/customer/account/vendor_reviews', '/customer/account/favourites', '/salesRep', '/wholesale-flowers.html', '/new-arrivals.html', '/wholesale-flowers/floral-supplies.html', '/wholesale-flowers/local-delivery.html', '/catalogsearch/result/', '/preMadeBouquets', '/nextday-delivery.html', '/best-seller.html', '/FallCollectionContainer', '/wedding-flowers.html', '/register', '/about-us', '/blog', '/blog/search', '/sustainable_floral_fund', '/forgotPassword', '/view-cart', '/contacts', '/privacy-policy', '/term-and-conditions', '/returns-and-refunds-policy', '/faq-vendor', '/faq-customer', '/track-order/', '/login', '/logoutSuccess', '/RegisterSuccess', '/profileDetail', '/customer/account/address/new', '/customer/account/address/edit', '/customer/pastPurchase', '/checkout/onepage', '/customer/account/viewOrder', '/checkout/onepage/success', '/firstData', '/customer/account/re-order', '/paypal', '/prebook', '/vendors', '/umicrosite/vendor/register/', '/about-us#features', '/about-us#howitwork', '/about-us#pricing', '/bkm/vendor', '/:id'];
const urlData = [];
axios.defaults.headers.post['Content-Type'] = 'application/json';

>>>>>>> 26a72402f14215350a5e88c808d1bb904903918a
