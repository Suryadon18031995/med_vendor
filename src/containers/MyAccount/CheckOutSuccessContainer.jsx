import React, { Component } from 'react';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import _isEmpty from 'lodash/isEmpty';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
// import '../../assets/stylesheets/checkout.css';
import { fetchPlaceOrderData, clearPlaceOrderReducer, updateProductQty } from '../../actions/placeOrder';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import { flushCartViewData,removeCartValue,clearCartReducer } from '../../actions/cart';
import { flushCartData, updatePrimeValue } from '../../actions/login';

const reduceObject = (data) => {
    const abc = data && data.map(each => ({
        name: each.name,
        price: each.product_price,
        quantity: each.qty,
        sku: each.sku,
    }));
    return abc;
};

class CheckOutSuccessContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHome: false,
            amount: _get(this.props.placeOrderData, 'amount'),
        };
    }

    handleContinueClick = () => {
        this.setState({ showHome: true });
    }

    componentDidMount() {
        this.props.clearPlaceOrderData();
        // const script = document.createElement('script');
        // // script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-923729795';
        // script.text = `gtag('event', 'conversion', {
        //     send_to: 'AW-923729795/mR6KCLjaooEBEIP_u7gD',
        //     value: $${_get(this.props.history, 'location.state.placeOrderAmount')},
        //     currency: 'USD',
        //     transaction_id: ${_get(this.props.history, 'location.state.orderId')},
        // });`;
        // script.type = 'text/javascript';

        // const purchaseScript = document.createElement('script');
        // purchaseScript.text = `window.dataLayer = window.dataLayer || [];
        // window.dataLayer.push({
        //   event: 'purchase',
        //   ecommerce: {
        //     purchase: {
        //       actionField: {
        //         id: ${_get(this.props.history, 'location.state.orderId')}
        //         revenue: $${_get(this.props.history, 'location.state.placeOrderAmount')},
        //         tax: '0.00',
        //         shipping: '0.00'
        //       },
        //     }
        //   }
        // });
        // </script>`;
        // purchaseScript.type = 'text/javascript';
        // document.body.appendChild(script);
        // document.body.appendChild(purchaseScript);

       // this.props.flushCartViewData();
       // this.props.flushCartData();
        //this.props.updateProductQty({ productIds: _get(this.props.history, 'location.state.productIds') });
        //if (this.props.cartType === 'prime') {
          //  this.props.updatePrimeValue('1');
        //}

      //  const pdData = JSON.stringify(reduceObject(this.props.productInfo));

        // new script for ecom track

        // const purchaseScriptNew = document.createElement('script');
        // purchaseScriptNew.text = `window.dataLayer = window.dataLayer || [];
        // window.dataLayer.push({
        //   'event': 'ecomm_event',
        //   'transactionId': ${_get(this.props.history, 'location.state.orderId')},
        //     'transactionTotal': ${_get(this.props.history, 'location.state.placeOrderAmount')},
        //     'transactionTax': 0.00 ,
        //     'transactionShipping': 0.00,
        //     'transactionProducts': ${pdData}
        // });`;
        // purchaseScriptNew.type = 'text/javascript';
        // document.body.appendChild(purchaseScriptNew);
    }

    render() {
        if (_get(this.state, 'showHome')) {
            return <Redirect push to="/" />;
        }

        if (_get(this.state, 'showViewOrder')) {
            return <Redirect push to={{
                pathname: '/customer/account/viewOrder',
                state: { orderId: this.state.orderId },
            }} />;
        }
        if (!this.props.apiToken) {
            return <Redirect push to={{
                pathname: '/login',
            }} />;
        }

        return (
            <div className="container" style={{marginTop:'150px'}}>
                <div className="checkout-success row">
                       <center>
                      
                                <h1>Your order has been received.</h1>
                                <br/>
                                <h2 className="sub-title">Thank you for your purchase!</h2><br/>
                                <p>Your order # is: {_get(this.props.history, 'location.state.orderId')}. </p>
                        </center>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getPlaceOrder: data => dispatch(fetchPlaceOrderData(data)),
    clearPlaceOrderData: () => { dispatch(clearCartReducer()); },
    flushCartViewData: () => dispatch(flushCartViewData()),
    flushCartData: () => dispatch(flushCartData()),
    updateProductQty: data => dispatch(updateProductQty(data)),
    updatePrimeValue: data => dispatch(updatePrimeValue(data)),
    deleteCartValue: () => dispatch(removeCartValue()),
});

const mapStateToProps = (state) => {
    const {
        loginReducer, placeOrderReducer, cartReducer,
    } = state;

    const {
        apiToken,
        currencyCode,
        cartId,
        error: loginError,
    } = loginReducer || [];

    const {
        placeOrderData,
        firstData,
        error: placeOrderError,
    } = placeOrderReducer || [];

    const {
        cartType,
        productInfo,
    } = cartReducer || [];

    const error = !_isEmpty(placeOrderError) || _isError(placeOrderError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        apiToken,
        currencyCode,
        cartId,
        placeOrderData,
        firstData,
        error,
        cartType,
        productInfo,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(CheckOutSuccessContainer));
