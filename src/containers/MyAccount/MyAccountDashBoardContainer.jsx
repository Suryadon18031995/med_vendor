/* eslint-disable class-methods-use-this */
import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';
import Dashboard from '../../components/MyAccount/MyAccountDashboard.jsx';
import { fetchProfileData, fetchUpdateCustomerDetails } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import lazyLoader from '../../assets/images/lazy-loader.gif';

class MyAccountDashBoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            firstName: '',
            lastName: '',
            email: '',
            telephone: '',
        };
    }

    componentDidMount() {
        document.title = 'My Account';
        console.log(this.props);
        this.setState({
            firstName: this.props.loginResponseData.firstname,
            lastName: this.props.loginResponseData.lastname,
            email: this.props.loginResponseData.email,
            telephone: this.props.loginResponseData.custom_attributes[0].value,
        });
        console.log(this.state);

        
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps);
       
    }

    updateDetails =() =>
    {
            console.log(this.state);
            var reqObj={
               id:  this.props.loginResponseData.id,
               email: this.state.email,
               firstname: this.state.firstName,
               lastname: this.state.lastName,
               store_id: 6,
               website_id: 1,
               custom_attributes: [
                {
                    attribute_code: 'customer_mobile_number',
                    value: this.state.telephone
                }
               ]
            };
            console.log(reqObj);
            this.props.updateCustomerDetails(this.props.loginResponseData.id,{customer: reqObj});
            
    }

    handleInputChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
      };

    render() {
        console.log(this.state);
        return (
            <div>
             
                <div className="container" style={{marginTop:'135px'}}>
                    <div className='container-block'>
                        <div className="row">
                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <center>
                                    <div style={{backgroundColor:'#eaeaea',height:'400px',width:'250px'}}>
                                        <br/><br/>
                                    
                                        <p><a style={{color:'rgb(138, 183, 125)'}} href="/customer/account">MY ACCOUNT</a></p><br/>
                                        <p style={{color:'#000000'}}><a href="/customer/account/orders">MY ORDER</a></p><br/>
                                        <p style={{color:'#000000'}}><a href="/customer/account/address">MY ADDRESS BOOK</a></p><br/>
                                        <p style={{color:'#000000'}}><a href="/customer/account/reviews">MY RATINGS & REVIEWS</a></p><br/>
                                    </div>
                                 </center>

                            </div>
                            <div className="col-md-9 col-sm-8 col-xs-12">
                               
                                    <br/><br/>
                                    <center>
                                    <h3 style={{fontFamily:'Quintessential',fontSize:'22px',fontWeight:'400'}}>Account</h3>
                                    </center>
                                    <br/>
                                    <div className="row">
                                            <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
                                                                    <input type="text"id="firstName" name="firstName" placeholder="First Name" required="" value={this.state.firstName} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
                                                                    <input type="text" id="lastName" name="lastname" placeholder="Last Name" required=""  value={this.state.lastName} onChange={this.handleInputChange}/>
                                            </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                            <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
                                                                    <input type="text" name="email" id="emailAddress"  value={this.state.email} placeholder="Email Address" onChange={this.handleInputChange} />
                                           
                                            </div>
                                            <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
                                                                    <input type="text" name="billingTelephone" id="billingTelephone" value={this.state.telephone} onChange={this.handleInputChange} />
                                                               
                                            </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="field">
                                        <center>
                                                <input onClick={this.updateDetails} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px'}} className="field_bt" value="Update"/>
                                        </center>
                                    </div>  
                                    <br/>
                                    <br/>
                              </div>
                            </div>
                    </div >
                </div>

                <br/>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    getuserProfileData: data => dispatch(fetchProfileData(data)),
    updateCustomerDetails: data => dispatch(fetchUpdateCustomerDetails(data)),
});
const mapStateToProps = (state) => {
    const { loginReducer } = state;

    const {
        loginResponseData,
        salesRepUser,
        userProfileData,
        error: loginError,
        apiToken,
        primeUser,
        updateCustomerDetails,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError);

    return {
        loginResponseData,
        salesRepUser,
        userProfileData,
        error,
        apiToken,
        primeUser,
        updateCustomerDetails,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(MyAccountDashBoardContainer));
