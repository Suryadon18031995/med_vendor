// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
// import Loader from '../../../components/Loader/Loader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAddAddressData, fetchEditAddress } from '../../../actions/address';
import { updateVendorLocation } from '../../../actions/vendorArtist';
import AddNewAddressComponent from '../../../components/MyAccount/AddNewAddressComponent.jsx';
import OneColumLeft from '../../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import ErrorBoundary from '../../ErrorBoundary.jsx';
import ErrorHandler from '../../../components/Hoc/ErrorHandler.jsx';
import { fetchStateListData } from '../../../actions/register';

class AddNewAddressContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            country: '',
            region: '',
            isShipping: undefined,
            isBilling: undefined,
            sucessMsg: undefined,
            redirect: false,
            selectedAddress: undefined,
            isEdit: false,
            isBillingFlag: false,
            isShippingFlag: false,
            showStates: true,
            selectStateValue: '',
            stateListRes: undefined,
            isDefaultChange: false,
            stateId: '',
            order: false,
            myAccount: false,
            locationEditShow: false,
        };
    }

    selectCountry = (val) => {
        this.setState({ country: val });
        if (val === 'US') {
            this.setState({
                showStates: true,
            });
        } else {
            this.setState({
                showStates: false,
            });
        }
    }

    handleStateChange = (event) => {
        this.setState({
            selectStateValue: event.target.value,
        });
    }

    handleUSStateChange = (event) => {
        console.log(event);
        const { options, selectedIndex } = event.target;
        this.setState({
            selectStateValue: event.target.value,
            stateId: options[selectedIndex].id,
        });
    }

    selectRegion = (val) => {
        this.setState({ region: val });
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

       console.log(fields);

        if (!this.state.selectStateValue) {
            formIsValid = false;
            errors.selectStateValue = 'This is required fields';
        }

        if (!fields.firstName) {
            formIsValid = false;
            errors.firstName = 'This is required fields';
        }
        if (typeof fields.firstName !== 'undefined') {
            if (!fields.firstName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.firstName = 'First Name is not valid';
            }
        }
      
        if (!fields.lastName) {
            formIsValid = false;
            errors.lastName = 'This is required fields';
        }
        if (typeof fields.lastName !== 'undefined') {
            if (!fields.lastName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.lastName = 'Last Name is not valid';
            }
        }

        if (!fields.telephone) {
            formIsValid = false;
            errors.telephone = 'This is required fields';
        } else if (!fields.telephone.match(/^[0-9]+$/)) {
            formIsValid = false;
            errors.telephone = 'Telephone is not valid';
        }
        if (!fields.streetAddress1) {
            formIsValid = false;
            errors.streetAddress1 = 'This is required fields';
        }
        if (!fields.city) {
            formIsValid = false;
            errors.city = 'This is required fields';
        }
        if (!fields.postalCode) {
            formIsValid = false;
            errors.postalCode = 'This is required fields';
        }
        if (!fields.company) {
            formIsValid = false;
            errors.company = 'This is required fields';
        }

        if (!fields.defaultBilling) {
            this.setState({ isBilling: false });
        } else {
            this.setState({ isBilling: true });
        }

        if (!fields.defaultShipping) {
            this.setState({ isShipping: false });
        } else {
            this.setState({ isShipping: true });
        }

        this.setState({ errors });
        return formIsValid;
    }

    handleChange = (event) => {
        let { fields } = this.state;
        switch (event.target.id) {
            case 'defaultBilling':
            case 'defaultShipping':
                fields[event.target.id] = event.target.checked ? 1 : 0;
                break;
            default: fields[event.target.id] = event.target.value;
        }
        this.setState({ fields });
    }

    handleSaveAddress = () => {
        console.log('edit outside', this.state.fields);
         const street=[
            this.state.fields.street1,
            this.state.fields.street2
         ];            
         
         const addressObj = {
            street: street,
            loc_city: this.state.fields.loc_city,
            loc_postcode: this.state.fields.loc_postcode,
            loc_state: this.state.selectStateValue,
            loc_fax: this.state.fields.loc_fax,
            loc_country: this.state.fields.loc_country,
         }
        const locObj = {
            location_id: this.state.fields.location_id,
            loc_name: this.state.fields.loc_name,
            loc_cust_disp_name: this.state.fields.loc_cust_disp_name,
            loc_phone: this.state.fields.loc_phone,
            loc_email: this.state.fields.loc_email,
            address: addressObj,
            status: '1'          
        }

        console.log(locObj);
        this.setState({
            locationEditShow: true
        });
        this.props.updateVendorLoc(locObj);
    }

    componentDidMount() {
        console.log(this.mapDispatchToProps);
        this.props.getStateListData();
        if (this.props.history.location.state !== undefined) {
            const locationObj = this.props.history.location.state.selectedAddress;
            console.log(locationObj);
            const selectedAddress = {
                location_id: locationObj.location_id,
                loc_name: locationObj.loc_name,
                loc_cust_disp_name: locationObj.loc_cust_disp_name,
                loc_phone: locationObj.loc_phone,
                loc_email: locationObj.loc_email,
                street1: locationObj.street1,
                street2:  locationObj.street2,
                loc_city: locationObj.loc_city,
                loc_postcode: locationObj.loc_postcode,
                loc_state: locationObj.loc_state,
                loc_fax: locationObj.loc_fax,
                loc_country: locationObj.loc_country,
            }

           // this.selectCountry(_get(object, 'country_id', ''));
           // this.selectRegion(_get(object, 'state', ''));

            this.setState({
                fields: selectedAddress,
                selectStateValue: locationObj.loc_state
            });
        }
       
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (!_isEmpty(_get(nextProps, 'updateVendorLocations')) && this.state.locationEditShow) {
            //const message = (_get(nextProps.addAddressData, 'code') === 1) ? 'Address Added Successfully.' : 'Add Address Failed.';
           if(nextProps.updateVendorLocations[0].status === true)
           {
            toast.success("Location Updated Successfully.");
            this.setState({
                //sucessMsg: message,
                redirect: true,
            });
           }
            
        }
        if (!_isEmpty(_get(nextProps, 'addAddressData'))) {
            const message = (_get(nextProps.addAddressData, 'code') === 1) ? 'Address Added Successfully.' : 'Add Address Failed.';
            this.setState({
                sucessMsg: message,
                redirect: true,
            });
        }

        if (!_isEmpty(_get(nextProps, 'editAddressData'))) {
            if (_get(nextProps.editAddressData, 0)) {
                const message = (_get(nextProps.editAddressData[0], 'code') === 1) ? 'Address Updated Successfully.' : 'Address Update Failed.';
                this.setState({
                    sucessMsg: message,
                    redirect: true,
                });
            }
        }

        if (!_isEmpty(_get(nextProps, 'stateListData'))) {
           
                const { stateId } = this.state;
                const stateListRes = nextProps.stateListData.available_regions;
                console.log(nextProps.stateListData.available_regions);
                 const tempValue = stateListRes && stateListRes.length && stateListRes.filter(each => each.id === stateId);
                this.setState({
                    stateListRes: nextProps.stateListData.available_regions,
                   // selectStateValue: tempValue && tempValue[0].code,
                });
            
        }
    }

    handleBackClick = () => {
        this.props.history.push('/customer/account/address');
    }


    
    getOrderData = () => {
        console.log();
        this.setState({
               order: true,
        });
      }  

      getMyAccount = () => {
        console.log();
        this.setState({
               addressLink: true,
        });
      } 

    render() {
       // console.log(this.state.stateListRes);
       if (this.state.redirect) {
            return <Redirect push to={{
                pathname: '/vendor/Location',
               // state: { sucessMsg: this.state.sucessMsg },
            }} />;
        }

        if (this.state.myAccount) {
            this.setState({
                myAccount: false,
           });
           return (
             <Redirect push to={{
               pathname: '/customer/account'
           }} />
            );
         
         
         }

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

        return (
            <div>
                 <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
                   <div className="container">
                        <div className='container-block'>
                                 <div className="col-md-3 col-sm-4 col-xs-12" style={{marginTop:'140px'}}>
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
                    <div className="col-md-9 col-sm-8 col-xs-12"  style={{marginTop:'140px'}}>
                        {/* {!_isEmpty(this.state.sucessMsg)?<span className="sucessMsg">{this.state.sucessMsg}</span>:''} */}
                        <ErrorBoundary>
                            <AddNewAddressComponent
                                handleBackClick={this.handleBackClick}
                                handleSaveAddress={this.handleSaveAddress}
                                handleChange={this.handleChange}
                                errors={this.state.errors}
                                fields={this.state.fields}
                                selectCountry={this.selectCountry}
                                selectRegion={this.selectRegion}
                                country={this.state.country}
                                region={this.state.region}
                                // fields={this.state.selectedAddress}
                                pageTitle={this.state.isEdit ? 'Edit Address' : 'Add New Address'}
                                isBillingFlag={this.state.isBillingFlag}
                                isShippingFlag={this.state.isShippingFlag}
                                showStates={this.state.showStates}
                                stateListRes={this.state.stateListRes}
                                handleStateChange={this.handleStateChange}
                                selectStateValue={this.state.selectStateValue}
                                handleUSStateChange={this.handleUSStateChange}
                            />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
            <br/><br/>
          </div>  
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getAddAddressData: (data,data1) => dispatch(fetchAddAddressData(data,data1)),
    saveAddress: (data,data1) => dispatch(fetchEditAddress(data,data1)),
    getStateListData: () => dispatch(fetchStateListData()),
    updateVendorLoc: (data) => dispatch(updateVendorLocation(data))
});

const mapStateToProps = (state) => {
    const { allAddressReducer, loginReducer, registerReducer, vendorArtistsReducer } = state;

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
        updateVendorLocations,
    } = vendorArtistsReducer || [];

    const {
        addAddressData,
        editAddressData,
        isFetching: isLoading,
        error: allAddressError,
    } = allAddressReducer || [];

    const {
        stateListData,
        error: registerError,
    } = registerReducer || [];

    const error = !_isEmpty(registerError) || _isError(registerError) || !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(loginError) || _isError(loginError);

    return {
        addAddressData,
        editAddressData,
        stateListData,
        isLoading,
        apiToken,
        salesRepUser,
        error,
        primeUser,
        userProfileData,
        custId,
        updateVendorLocations,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(AddNewAddressContainer));
