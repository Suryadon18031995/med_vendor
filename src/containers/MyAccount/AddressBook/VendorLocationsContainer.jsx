import React from 'react';
import Redirect from 'react-router/Redirect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import connect from 'react-redux/lib/connect/connect';
import { fetchAllAddressData, fetchEditAddress, fetchDeleteAddress } from '../../../actions/address';
import { vendorLocationList } from '../../../actions/vendorArtist';
import BreadCrumbs from '../../../components/Common/BreadCrumbs.jsx';
import AddressBookComponent from '../../../components/MyAccount/AddressBookComponent.jsx';
import Loader from '../../../components/Loader/Loader.jsx';
import ErrorHandler from '../../../components/Hoc/ErrorHandler.jsx';
import ErrorBoundary from '../../ErrorBoundary.jsx';

class VendorLocationContainer extends React.Component {
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
            allLocations: [],
            otherLocation: [],
        };
    }

    UNSAFE_componentWillMount() {
       // var data='44'
       
    }

    componentDidMount() {
        document.title = 'Vendor Locations';
        console.log(this.props);
        this.props.getVendorLocation(this.props.vendorId);
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

    populateLocation = locationObj => ({
        location_id: locationObj.location_id,
        loc_name: locationObj.loc_name,
        loc_cust_disp_name: locationObj.loc_cust_disp_name,
        loc_phone: locationObj.loc_phone,
        loc_email: locationObj.loc_email,
        street1: locationObj.address.street[0],
        //street2: locationObj.address.street.length <= 1 ? '' : 'locationObj.address.street.street[1]',
        loc_city: locationObj.address.loc_city,
        loc_postcode: locationObj.address.loc_postcode,
        loc_state: locationObj.address.loc_state.region_id,
        loc_fax: locationObj.address.loc_fax,
        loc_country: locationObj.address.loc_country.country_id,
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const ot= [];
        if (!_isEmpty(nextProps.vendorLocations)) {
            console.log(nextProps.vendorLocations);
            if(nextProps.vendorLocations[0].status === true)
            {
               // const otherLocation = nextProps.vendorLocations[0].location.length && nextProps.vendorLocations[0].location.map((eachAddress) => {
                  //  this.populateLocation(eachAddress);
                 //});
                // for(var i=0;nextProps.vendorLocations[0].location.length;i++)
                 //{
                   // ot.push(this.populateLocation(nextProps.vendorLocations[0].location[i]));
                // }
                this.setState({
                    allLocations:nextProps.vendorLocations[0].location,
                    //otherLocation: ot
                });
               
            }
        }
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
                });
            }
            console.log(this.state.isEdit);
        });
    };

    handleEditLocation = (locationObj) => {
        console.log(locationObj);
        var obj={
            location_id: locationObj.location_id,
            loc_name: locationObj.loc_name,
            loc_cust_disp_name: locationObj.loc_cust_disp_name,
            loc_phone: locationObj.loc_phone,
            loc_email: locationObj.loc_email,
            street1: locationObj.address.street[0],
            street2: locationObj.address.street.length <= 1 ? '' : locationObj.address.street[1],
            loc_city: locationObj.address.loc_city,
            loc_postcode: locationObj.address.loc_postcode,
            loc_state: locationObj.address.loc_state.region_id,
            loc_fax: locationObj.address.loc_fax,
            loc_country: locationObj.address.loc_country.country_id,
        }
        console.log(obj);
        this.setState({
            selectedAddress: obj,
            isEdit: true,
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
        console.log(this.state);
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
                    console.log(this.state.isEdit);
                    console.log(this.state.selectedAddress);
                    return <Redirect push to={{
                        pathname: '/vendor/Location-Edit',
                        state: {
                            selectedAddress: this.state.selectedAddress,
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
                                                    
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getMyAccount()}>LOGIN</a></p><br/>
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer',color:'rgb(138, 183, 125)'}} href="/vendor/Location">VENDOR LOCATION</a></p><br/>
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>EARNINGS</a></p><br/>
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>PROFILE UPDATE</a></p><br/>
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>MY AVAILABILITY</a></p><br/>
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>LABEL</a></p><br/>
                                                        <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>MY INVENTORY</a></p><br/>
                                                    </div>
                                                </center>
                                </div>
                            <div className="col-md-9 col-sm-8 col-xs-12">
                                
                               <br/>
                                    
                                    <center>
                                    <h5 style={{fontSize:'45px',fontWeight:'400',fontFamily:'Quintessential'}}>All Locations</h5>
                                    <br/>
                                    </center>

                                 <ErrorBoundary>
                                    <AddressBookComponent
                                        allLocations={this.state.allLocations}
                                        otherLocation={this.state.otherLocation}
                                        handleEditLocation={this.handleEditLocation}
                                    />
                                </ErrorBoundary>
                             </div>
                         </div>
                     </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getVendorLocation: data => dispatch(vendorLocationList(data)),
    getDeleteAddress: data => dispatch(fetchDeleteAddress(data)),
    getEditAddress: data => dispatch(fetchEditAddress(data)),
});

const mapStateToProps = (state) => {
    const { allAddressReducer, loginReducer, vendorArtistsReducer } = state;


    const {
        apiToken,
        salesRepUser,
        error: loginError,
        primeUser,
        userProfileData,
        custId,
    } = loginReducer || [];


    const {   
        vendorLogin,
        vendor,
        vendor_types,
        shipping_methods,
        cost_channels,
        loginMessage,
        loginStatus,
        vendorId,
        vendorLocations,
    } = vendorArtistsReducer || [];
    

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
        vendorLogin,
        vendor,
        vendor_types,
        shipping_methods,
        cost_channels,
        loginMessage,
        loginStatus,
        vendorId,
        vendorLocations,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(VendorLocationContainer));
