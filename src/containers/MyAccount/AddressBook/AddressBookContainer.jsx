import React from 'react';
import Redirect from 'react-router/Redirect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import connect from 'react-redux/lib/connect/connect';
import { fetchAllAddressData, fetchEditAddress, fetchDeleteAddress } from '../../../actions/address';
import BreadCrumbs from '../../../components/Common/BreadCrumbs.jsx';
import AddressBookComponent from '../../../components/MyAccount/AddressBookComponent.jsx';
import OneColumLeft from '../../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import Loader from '../../../components/Loader/Loader.jsx';
import ErrorHandler from '../../../components/Hoc/ErrorHandler.jsx';
import ErrorBoundary from '../../ErrorBoundary.jsx';

class AddressBookContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAddresses: undefined,
            billingAddressId: undefined,
            shippingAddressId: undefined,
            billingAddress: undefined,
            shippingAddress: undefined,
            otherAddress: [],
            successMessage: undefined,
            // showMsg: true,
            addrEntityId: undefined,
            deleteAddressMessage: undefined,
            selectedAddress: '',
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: undefined,
                    name: 'MY ACCOUNT',
                },
            ],
            isEdit: false,
            isDelete: false,
            isBilling: false,
            isShipping: false,
            order: false,
            addressLink: false,
        };
    }

    UNSAFE_componentWillMount() {
       // var data='44'
       
    }

    componentDidMount() {
        document.title = 'Address Book';
        this.props.getAllAddressData(this.props.custId);
    }

    populateAddress = addressObj => ({
        entity_id: _get(addressObj, 'id', ''),
        customerId: _get(addressObj, 'customer_id', ''),
        firstName: _get(addressObj, 'firstname'),
        lastName: _get(addressObj, 'lastname'),
        company: _get(addressObj, 'company', ''),
        street1: _get(addressObj, 'street[0]', ''),
        street2: _get(addressObj.street.length) <= 1 ? '' : _get(addressObj, 'street[1]', ''),
      //  street2: _get(addressObj.street) !== 1 ? '' : _get(addressObj, 'street[1]', ''),
        city: _get(addressObj, 'city'),
        //region: _get(addressObj, 'region'),
        postcode: _get(addressObj, 'postcode'),
        country_name: _get(addressObj, 'country_id'),
        telephone: _get(addressObj, 'telephone'),
        regionId: _get(addressObj, 'region_id'),
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(nextProps.allAddressData);
        if (!_isEmpty(nextProps.allAddressData)) {
            const allAddresses = nextProps.allAddressData.addresses;
            const billingAddressId = nextProps.allAddressData.default_billing;
            const shippingAddressId = nextProps.allAddressData.default_shipping;
            let billingAddress = '';
            let shippingAddress = '';
            console.log(allAddresses);
            console.log(billingAddressId);
            console.log(shippingAddressId);

            const otherAddress = allAddresses.length && allAddresses.map((eachAddress) => {
                console.log('same',eachAddress);
                console.log('sameb',eachAddress.id);
                console.log('samebb',billingAddressId);
                console.log('same1',eachAddress.id === parseInt(billingAddressId));
                console.log('same2',eachAddress.id === parseInt(shippingAddressId));
                if (eachAddress.id === parseInt(billingAddressId) && eachAddress.id === parseInt(shippingAddressId)) {
                    console.log('same3');
                    billingAddress = this.populateAddress(eachAddress);
                    shippingAddress = billingAddress;
                } else if (eachAddress.id === parseInt(billingAddressId)) {
                    billingAddress = this.populateAddress(eachAddress);
                } else if (eachAddress.id === parseInt(shippingAddressId)) {
                    shippingAddress = this.populateAddress(eachAddress);
                } else return this.populateAddress(eachAddress);
            }).filter(o => o);
            console.log(billingAddress);
            console.log(shippingAddress);
            this.setState({
                allAddresses,
                billingAddressId,
                shippingAddressId,
                billingAddress,
                shippingAddress,
                otherAddress,
            });
        }

        if (!_isEmpty(nextProps.deleteAddressData)) {
            const message = (_get(nextProps.deleteAddressData, 'code') === 1) ? 'Address Deleted Successfully.' : 'Delete Address Failed.';
            const allAddresses = _get(nextProps.deleteAddressData, ['result', 0]);
            const billingAddressId = _get(nextProps.deleteAddressData, 'billingAddressId');
            const shippingAddressId = _get(nextProps.deleteAddressData, 'defaultShippingId');
            let billingAddress = '';
            let shippingAddress = '';

            const otherAddress = allAddresses.length && allAddresses.map((eachAddress) => {
                if (eachAddress.entity_id === billingAddressId) {
                    billingAddress = this.populateAddress(eachAddress);
                } else if (eachAddress.entity_id === shippingAddressId) {
                    shippingAddress = this.populateAddress(eachAddress);
                } else return this.populateAddress(eachAddress);
            }).filter(o => o);

            this.setState({
                allAddresses,
                billingAddressId,
                shippingAddressId,
                billingAddress,
                shippingAddress,
                otherAddress,
                deleteAddressMessage: message,
            });
        }
    }

    handleBackClick = () => {
        this.props.history.go(-1);
    };

    handleAddAddress = () => {
        this.props.history.push('/customer/account/address/new');
    };

    handleDeleteAddress = (event) => {
        this.setState({
            successMessage: undefined,
            isDelete: true,
        });

        this.props.getDeleteAddress({
            addressId: event.target.value,
            apiToken: this.props.apiToken,
        });
    };

    handleEditAddress = (event) => {
        console.log(this.state.isEdit);
         console.log(event);
        const { allAddresses } = this.state;
        console.log('edit');
        allAddresses.forEach((eachAddress) => {
            console.log(parseInt(eachAddress.id) === event);
            console.log(parseInt(eachAddress.id));
            if (parseInt(eachAddress.id) === event) {
                this.setState({
                    selectedAddress: eachAddress,
                    isEdit: true,
                    isBilling: eachAddress.id === this.state.billingAddressId,
                    isShipping: eachAddress.id === this.state.shippingAddressId,
                   // isDefaultChange: event.target.id === 'default',
                });
            }
            console.log(this.state.isEdit);
        });
    };


    getOrderData = () => {
        console.log();
        this.setState({
               order: true,
        });
      }  

      getAddressData = () => {
        console.log();
        this.setState({
               addressLink: true,
        });
      }  


    render() {

        if (this.state.order) {
            this.setState({
              order: false,
           });
           return (
             <Redirect push to={{
               pathname: '/customer/account/orders'
           }} />
            );
         
         
         }

         if (this.state.addressLink) {
            this.setState({
                addressLink: false,
           });
           return (
             <Redirect push to={{
               pathname: '/customer/account/address'
           }} />
            );
         
         
         }

                if (this.state.isEdit) {
                    return <Redirect push to={{
                        pathname: '/customer/account/address/edit',
                        state: {
                            selectedAddress: this.state.selectedAddress,
                            isBilling: this.state.isBilling,
                            isShipping: this.state.isShipping,
                            isDefaultChange: this.state.isDefaultChange,
                        },
                    }} />;
                }
        
                if (_get(this, 'props.isLoading')) {
                    return (
                        <div className="container" style={{ minHeight: '500px' }}>
                            <Loader />
                        </div>
                    );
                }
        
       
        return (
            <div>
                 <br/>
                    <div className="container" style={{marginTop:'120px'}}>
                        <div className='container-block'>
                        <div className="row">
                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <center>
                                    <div style={{backgroundColor:'#eaeaea',height:'400px',width:'250px'}}>
                                        <br/><br/>
                                    
                                        <p style={{color:'#000000'}}><a href="/customer/account">MY ACCOUNT</a></p><br/>
                                        <p style={{color:'#000000'}}><a onClick={() => this.getOrderData()} style={{cursor:'pointer'}}>MY ORDER</a></p><br/>
                                        <p><a style={{color:'rgb(138, 183, 125)'}} onClick={() => this.getAddressData()} style={{cursor:'pointer'}}>MY ADDRESS BOOK</a></p><br/>
                                    </div>
                                 </center>

                            </div>
                            <div className="col-md-9 col-sm-8 col-xs-12">
                                
                               <br/>
                                    
                                    <center>
                                    <h5 style={{fontSize:'45px',fontWeight:'400',fontFamily:'Quintessential'}}>My Address Book</h5>
                                    <br/>
                                        <p style={{color:'#000000'}}>Save address for faster checkouts.<br/>
                                        
                                        You can access your Address Book from any of our family of brands.</p>

                                    </center>

                                 <ErrorBoundary>
                                    <AddressBookComponent
                                        billingAddress={this.state.billingAddress}
                                        shippingAddress={this.state.shippingAddress}
                                        otherAddress={this.state.otherAddress}
                                        handleEditAddress={this.handleEditAddress}
                                        handleDeleteAddress={this.handleDeleteAddress}
                                        handleBackClick={this.handleBackClick}
                                        handleAddAddress={this.handleAddAddress}
                                        successMessage={this.state.successMessage}
                                        deleteAddressMessage={this.state.deleteAddressMessage}
                                    />
                                </ErrorBoundary>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAllAddressData: data => dispatch(fetchAllAddressData(data)),
    getDeleteAddress: data => dispatch(fetchDeleteAddress(data)),
    getEditAddress: data => dispatch(fetchEditAddress(data)),
});

const mapStateToProps = (state) => {
    const { allAddressReducer, loginReducer } = state;


    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
        custId,
    } = loginReducer || [];

    const {
        allAddressData,
        deleteAddressData,
        type,
        isFetching: isLoading,
        error: allAddressError,
    } = allAddressReducer || [];

    const error = !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        allAddressData,
        deleteAddressData,
        isLoading,
        apiToken,
        salesRepUser,
        type,
        error,
        primeUser,
        userProfileData,
        custId,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(AddressBookContainer));
