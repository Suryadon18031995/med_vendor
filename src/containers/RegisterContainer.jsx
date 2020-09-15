import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _groupBy from 'lodash/groupBy';
import Modal from 'react-bootstrap/lib/Modal';
import Link from 'react-router-dom/Link';
import Redirect from 'react-router/Redirect';
import RegisterComponent from './../components/BKMComponent/RegisterComponent.jsx';
import CategoriesComponenet from './../components/Header/categoriesComponent.jsx';
import ScrollApp from './../components/ScrollTopComponent/scroll.jsx';
import { fetchCustomerRegisterData, fetchStateListData, fetchTrackUrlData } from './../actions/register';
import { mapCustomerRegisterData } from './../utils/commonMapper';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';
import flower from '../assets/img/top-flower.jpg';
import facebook from '../assets/img/facebook.jpg';
import google from '../assets/img/google.jpg';

// eslint-disable-next-line camelcase
function new_script(src) {
  return new Promise(((resolve, reject) => {
    // eslint-disable-next-line no-var
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => {
      resolve();
    });
    script.addEventListener('error', (e) => {
      reject(e);
    });
    document.body.appendChild(script);
  }));
}

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.mblMenu = this.mblMenu.bind(this);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      emailAddress: undefined,
      billingStreet1: undefined,
      billingCity: undefined,
      billingTelephone: undefined,
      billingZip: undefined,
      vatId: '',
      subcriptionInput: 'yes',
      password: undefined,
      confirmation: undefined,
      showStates: true,
      selectValue: 'US',
      getStates: true,
      errors: '',
      stateValue: false,
      selectStateValue: '',
      checkRecaptcha: [],
      checked: true,
      stateListRes: undefined,
      registerSuccessRes: false,
      showMsg: true,
      showPopup: false,
      fields: {
        pinCode: '560001',
      },
      searchText: '',
      condition: false,
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      cateGoriesList: undefined,
      navbarFixedTop: '',
    };
  }

  callback = () => {
  };

  verifyCallback = (response) => {
    this.setState({
      checkRecaptcha: response.length,
    });
  };

  handlePopupShow() {
    this.setState({ showPopup: true });
  }

  handleChangeZipcode = () => {
    if (_get(this.state, 'fields.pinCode') === '') {
      this.setState({
        fields: { ...this.state.fields, pinCode: '560001' },
        showPopup: false,
      });
    } else {
      this.setState({ showPopup: false });
    }
  }
  handleChangeZip() {
    if (this.state.zipcode === '') {
      this.setState({
        zipcode: this.state.zipcodeInit,
        showPopup: false,
      });
      !this.props.apiToken && this.props.setZipcodeData(this.state.zipcodeInit);
    } else {
      this.setState({ showPopup: false });
      !this.props.apiToken && this.props.setZipcodeData(this.state.zipcode);
    }
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChange = (event) => {
    this.setState({
      selectValue: event.target.value,
    });
    if (event.target.value === 'US') {
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
      stateValue: true,
      selectStateValue: event.target.value,
    });
  }

  customerRegisterData = () => {
    console.log(this.handleValidation());
    if (this.handleValidation()) {

     const reqBody = mapCustomerRegisterData(this.state);
     console.log(reqBody);
      this.props.getRegisterData({ customer: reqBody, password: this.state.password });
      //this.setState({ isLoading: false });

    }
  }

  componentDidMount() {
    document.title = 'Register';
    

    window.addEventListener('scroll', () => {

      const h = window.innerHeight;
      if (h > 80) {
        if (window.scrollY > 30) {
          this.setState({ navbarFixedTop: 'navbar-fixed-top' });

        } else {
          this.setState({ navbarFixedTop: '' });

        }
      }
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;

    //  FirstName
    if (this.state.firstName === undefined || this.state.firstName === '') {
      formIsValid = false;
      errors.firstName = 'Please fill out this field';
    }

    // lastName
    if (this.state.lastName === undefined || this.state.lastName === '') {
      formIsValid = false;
      errors.lastName = 'Please fill out this field';
    }
    // telephone
    if (this.state.billingTelephone === undefined || this.state.billingTelephone === '') {
      formIsValid = false;
      errors.billingTelephone = 'Please fill out this field';
    }

    if (this.state.billingTelephone !== undefined) {
      if (this.state.billingTelephone.length < 10) {
        formIsValid = false;
        errors.billingTelephone = 'Please Lengthen this text to 10 Numbers';
      } else {
        const re = /^[0-9\b]+$/;
        if (re.test(this.state.billingTelephone)) {
          // formIsValid = true;
        } else {
          formIsValid = false;
          errors.billingTelephone = 'Please Provide Numeric value';
        }
      }
    }

    // password
    if (this.state.password === undefined || this.state.password === '') {
      formIsValid = false;
      errors.password = 'Please fill out this field';

    }

    if (this.state.password !== undefined) {
      if (this.state.password.length < 6) {
        formIsValid = false;
        errors.password = 'Please lengthen this text to 6 characters or more';
      }
    }

    // confirm password
    if (this.state.confirmation === undefined || this.state.confirmation === '') {
      formIsValid = false;
      errors.confirmation = 'Please fill out this field';
    }

    if (this.state.confirmation !== undefined) {
      if (this.state.confirmation.length < 6) {
        formIsValid = false;
        errors.confirmation = 'Please lengthen this text to 6 characters or more';
      }
    }

    // Email
    if (this.state.emailAddress === undefined || this.state.emailAddress === '') {
      formIsValid = false;
      errors.emailAddress = 'Please fill out this field';
    }

    if (this.state.emailAddress !== undefined && this.state.emailAddress !== '') {
      const lastAtPos = this.state.emailAddress.lastIndexOf('@');
      const lastDotPos = this.state.emailAddress.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.emailAddress.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.emailAddress.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.emailAddress = 'Email is not valid';
      }
    }

  

    if (this.state.password !== this.state.confirmation) {
      alert('Password do not match');
    }

    this.setState({ errors });
    return formIsValid;
  }

  handlePopupClose() {
    this.setState({ showPopup: false });
  }
  mblMenu() {
    this.setState({ condition: !this.state.condition });
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }
  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleOpen1 = () => {
    this.setState({ isOpen1: !this.state.isOpen1 });
  };
  toggleOpen2 = () => {
    this.setState({ isOpen2: !this.state.isOpen2 });
  };
  onSearchTextChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ searchText: value }));
  }
  /* for Header Search Box. */
  keyPress = (e) => {
    let inputValue = null;
    inputValue = e.target.value;
    if (e.keyCode === 13) {
      this.setState({
        headerSearchRedirect: true, // uncheck for redirection.
        searchText: inputValue,
        mouseEvent: false,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (inputValue.length > 3) {
        this.props.getCategoryAutoCompleteData({
          value: inputValue,
        });
      } else {
        this.setState(() => ({
          searchedData: {},
        }));
        return null;
      }
    }
    return false;
  }
  // show autocomplete if data is already there.
  handleMouseEvent = (event) => {
    if (!event.target.value) {
      this.setState(() => ({
        searchedData: {},
      }));
    } else {
      this.setState(() => ({ mouseEvent: true }));
    }
  }
  handleAllResultRedirection = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.
      mouseEvent: false,
    });
  };
  showProductDetailPage = (productId, urlKey) => {
    this.setState(() => ({
      url: urlKey,
      productId,
      mouseEvent: false,
    }));
  };
  handleChangeZip = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleClick = () => {
    this.props.history.push('/view-cart');
  };
  handleClickForMyAccount = () => {
    this.props.history.push('/customer/account');
  };
  render() {
    console.log(this.props);
    if (this.state.registerSuccessRes === true) {
      return <Redirect push to="/RegisterSuccess" />;
    }
    const menuClass = `dropdown-menu ${this.state.isOpen ? 'show' : ''}`;
    const menuClass1 = `dropdown-menu ${this.state.isOpen1 ? 'show' : ''}`;
    const menuClass2 = `dropdown-menu ${this.state.isOpen2 ? 'show' : ''}`;
    const { searchText, searchedData, mouseEvent } = this.state;
    const prodList = _get(searchedData, 'productIdlist');
    const prodListData = _get(searchedData, 'searchProdResult');
    if (this.state.headerSearchRedirect) {
      this.setState({
        headerSearchRedirect: false,
        mouseEvent: false,
      });
      return (<Redirect to={{
        pathname: '/catalogsearch/result/',
        search: '',
        state: { searchedData, searchText },
      }} />);
    }
    let deliverToZip;
    if (this.state.showMsg) {
      deliverToZip = (
        <div className='deliver-pincode-link-div'>
          <a
            className="link-account"
            id="link-Register"
            onClick={this.handlePopupShow}
            title=""
          >
            Deliver to{' '}
            <strong>{this.state.zipcode}</strong>
          </a>
        </div>
      );
    }

    return (
      <div>
        <section>
          <div>
          <img src={flower} alt="#" style={{width:'100%',marginTop:'60px'}} />
          </div>
          </section>
        <section>
            <div className="text-center" style={{marginTop: '30px'}}>
            <h1 style={{fontFamily:'Quintessential',fontSize:'50px'}}>Enjoy The Convenience</h1>
            <br/>
            <p style={{fontSize:'25px',fontWeight:'500'}}>Of a Single Account Across All</p>
            <br/><br/>  
            <div className="row">
          <center>
                  <img src={google} style={{height:'70px',width:'70px'}}/>
     
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={facebook} style={{height:'70px',width:'70px'}}/>  
          </center>
          <br/><br/>
          <h1 style={{fontFamily:'Beautiful People Personal Use',fontSize:'45px'}}>Not Registered?</h1>
          <br/>
            <p style={{fontSize:'25px',fontWeight:'500'}}>Register Today And Enjoy</p>
            <br/>
            <p style={{fontSize:'25px',fontWeight:'500'}}>Free Delivery On Your First Order</p>
          </div>          
            </div>
            
        </section>
        <ErrorBoundary>
          <RegisterComponent
            state={this.state}
            isFetching={this.props.isLoading}
            handleInputChange={this.handleInputChange}
            customerRegisterData={this.customerRegisterData}
            handleChange={this.handleChange}
            handleStateChange={this.handleStateChange}
            callback={this.callback}
            verifyCallback={this.verifyCallback}
            handleCheck={this.handleCheck}
            stateListData={this.props.stateListData}
          />
        </ErrorBoundary>
        {/* <div className="back-top-top">
          <ScrollApp />
        </div> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRegisterData: data => dispatch(fetchCustomerRegisterData(data)),
  getStateListData: data => dispatch(fetchStateListData(data)),
  postTrackUrl: data => dispatch(fetchTrackUrlData(data)),
});

const mapStateToProps = (state) => {
  const { registerReducer, loginReducer } = state;

  const {
    registerData,
    stateListData,
    isFetching: isLoading,
    error: registerError,
  } = registerReducer || [];

  const {
    apiToken,
    categoriesListData,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(registerError) || _isError(registerError);

  return {
    registerData,
    stateListData,
    isLoading,
    apiToken,
    categoriesListData,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(RegisterContainer));
