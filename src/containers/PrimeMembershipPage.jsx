/* eslint-disable max-len */
/* eslint-disable import/first */
import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import MetaTags from 'react-meta-tags';
// import PrimeProduct from '../components/BKMComponent/PrimeProduct.jsx';
import PrimeIndex from '../components/Prime/PrimeIndex.jsx';
import { fetchPrimePageProducts } from '../actions/bkm_listing';
import { postAddToCartData } from '../actions/cart';
import { receiveShowLoginModalData, updateCartData, setCartId } from '../actions/login';
import { mapAddToCartApiData } from '../utils/commonMapper';
import BreadCrumbs from '../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';
import Loader from '../components/Loader/Loader.jsx';

class PrimeMembershipPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'HOME PAGE',
                },
                {
                    link: undefined,
                    name: 'My Premium Membership',
                },
            ],
        };
    }

    componentDidMount() {
        /* list api */
        this.props.getPrimeProductsData({ apiToken: this.props.apiToken });
        document.title = 'Join Premium Membership';
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        /* list api response */
        if (!_isEmpty(nextProps.primePageData)) {
            this.setState({ primeProducts: _get(nextProps.primePageData, ['products', 'products']) });
        }
        if (!_isEmpty(nextProps.addCartResponseDetails) && (this.props.type === 'REQUEST_ADD_TO_CART') && (this.props.cartCount !== _get(nextProps.addCartResponseDetails, ['total_products_in_cart']))) {
            this.props.updateCart({
                show: true,
                cartCount: _get(nextProps.addCartResponseDetails, ['total_products_in_cart']),
                cartTotal: _get(nextProps.addCartResponseDetails, ['subtotal']),
                cartProducts: _get(nextProps.addCartResponseDetails, ['result']),
            });
            this.props.setCartId(_get(nextProps.addCartResponseDetails, 'result') && _get(nextProps.addCartResponseDetails, ['result', [0], 'cart_id']));
            // this.props.setCartType({ cartType: 'normal' });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.apiToken !== this.props.apiToken) {
            this.props.getPrimeProductsData({ apiToken: this.props.apiToken });
        }
    }
    /* Add to cart function */
    handleAddCartClick = () => {
        if (this.props.primeUser === '1') {
            alert('You are already a premium member!');
        } else {
            const productId = _get(this.state.primeProducts, [0, 'id']);
            const selValNext = _get(this.state.primeProducts, [0, 'cart_format']);
            if (this.props.apiToken && ((_get(this.props, 'cartType') === 'prime') || (!_get(this.props, 'cartType')))) {
                if (_get(this.props, 'cartType') === 'prime') {
                    alert('Can not buy multiple premium orders!');
                } else {
                    const reqBody = mapAddToCartApiData({
                        cart_format: selValNext,
                        pid: productId,
                        unitQty: 1,
                        qty_per_box: 1,
                        apiToken: this.props.apiToken,
                    });
                    this.props.addToCart(reqBody);
                }
            } else if (_get(this.props, 'cartType') === 'subscription') {
                alert('Subscription orders cannot be purchased in combination with single orders at this time. Please clear your cart before adding this product to your cart');
            } else if (_get(this.props, 'cartType') === 'pre-book') {
                alert("Hello! Your Mother's Day PreBook products must be purchased separately from everyday product on the marketplace. Please complete your everyday purchases and continue shopping for your other favorite products!");
            } else if (_get(this.props, 'cartType') === 'normal') {
                alert("Premium orders cannot be purchased in combination with normal orders at this time. Please clear your cart before adding premium to your cart!");
            } else if (_isEmpty(this.props.apiToken)) {
                this.props.showLoginModal({ show: true });
            }
        }
    }

    render() {
        if (_get(this, 'props.isLoading') || _get(this, 'props.isLoadingAdd')) {
            return (
                <div className="loaderDiv" style={{ minHeight: '500px' }}>
                    <Loader />
                </div>
            );
        }
        return (
            <div>
                <MetaTags>
                    <title>Premium Membership and Exclusive Offers </title>
                    <meta name="description" content='As a BKM Premium Member, you enjoy unlimited free shipping on every order every time for the entire year! You will pay for your entire year of membership fee with less than 10 orders.' />
                </MetaTags>
                <img className='image-responsive custome-desk' onClick={this.handleAddCartClick}
                    src={`${process.env.APPLICATION_CLOUD_URL}/premium/BKM-premium-page-hero-banner.jpg`}
                    alt='Premium Member Banner'
                    style={{ width: '100%', cursor: 'pointer' }} />
                <img className='image-responsive custome-small'
                    src={`${process.env.APPLICATION_CLOUD_URL}/premium/BKM-premium-web-page-hero-banner-mobile-versions.jpg`}
                    alt='Premium Member Banner'
                    style={{ width: '100%' }} />
                <BreadCrumbs
                    list={this.state.breadCrumbsList} />
                <div className="container">
                    <ErrorBoundary>
                        <PrimeIndex
                        />
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPrimeProductsData: data => dispatch(fetchPrimePageProducts(data)),
    addToCart: data => dispatch(postAddToCartData(data)),
    showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
    updateCart: data => dispatch(updateCartData(data)),
    setCartId: data => dispatch(setCartId(data)),
});

const mapStateToProps = (state) => {
    const { loginReducer, bkmReducer, cartReducer } = state;

    const {
        loginData,
        error: loginError,
        apiToken,
        primeUser,
        cartCount,
    } = loginReducer || [];

    const {
        primePageData,
        isFetching: isLoading,
        error: bkmError,
    } = bkmReducer || [];

    const {
        addCartResponseDetails,
        type,
        cartType,
        isFetching: isLoadingAdd,
        error: cartError,
    } = cartReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(bkmError) || _isError(bkmError) || !_isEmpty(cartError) || _isError(cartError);

    return {
        loginData,
        isLoading,
        isLoadingAdd,
        error,
        apiToken,
        primePageData,
        addCartResponseDetails,
        type,
        cartType,
        primeUser,
        cartCount,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(PrimeMembershipPage));
