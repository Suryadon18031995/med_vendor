import React from 'react';
// import Modal from 'react-bootstrap/lib/Modal';
// import Modal from 'react-bootstrap-modal';
// import Button from 'react-bootstrap/lib/Button';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _groupBy from 'lodash/groupBy';
import Redirect from 'react-router/Redirect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Link from 'react-router-dom/Link';
import logoIcon from './assets/images/LOGO.png';
import navBarIcon from './assets/images/navbar-icon-three.png';
import axios from 'axios';
import * as emailjs from 'emailjs-com';
import swal from 'sweetalert';
import ScrollApp from './components/ScrollTopComponent/scroll.jsx';
import ErrorHandler from './components/Hoc/ErrorHandler.jsx';
import { LoginLoader } from './components/Loader/Loader.jsx';
import Image from 'react-image-resizer';
import {
  fetchHomePage, fetchCustomerToken, fetchCustomerDetails, fetchZipCode,receiveHideLoginModalData,fetchForgotPassword,setZipcodeData,
} from './actions/login';
import { fetchCustomerRegisterData , clearRegisterData , fetchStateListData } from './actions/register';
import { fetchCategoriesAutoCompleteResult } from './actions/bkm_listing';
import { mapCustomerRegisterData } from './utils/commonMapper';
import {
  fetchCartItemsByCustomer,getGuestConvertCartList,fetchGetCartData,
} from './actions/cart';
import { fetchAllAddressData, getBillingAddress ,getShippingAddress  } from './actions/address';
import Suggetion from './components/Header/SuggetionComponent.jsx';
import PaypalImage from './assets/images/Paypal_BKM.png';
import SecureImage from './assets/images/security_BKM.png';
import GodaddyImage from './assets/images/godaddy-seal.jpg';
import headerImage from './assets/img/2.png';
import email from './assets/img/h.png';
import login from './assets/img/20.png';
import search from './assets/img/21.png';
import flower from './assets/img/top-flower.jpg';
import MaModal from './components/Common/MaterialUIModal.jsx';
import MaModalOne from './components/Common/MaterialUIModalOne.jsx';
import MaModalSerch from './components/Common/MaterialUIModalSearch.jsx';
import MaModalContact from './components/Common/MaterialUIContact.jsx';
import facebook from './assets/img/facebook.jpg';
import google from './assets/img/google.jpg';
import cart from './assets/img/1.png';
import lazyLoader from './assets/img/loader.gif';
import logLoader from './assets/img/25.gif';
import flowerback from './assets/img/f1.jpg';

class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.showCart = this.showCart.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showLoginData = this.showLoginData.bind(this);
    this.toggleCartDropdown = this.toggleCartDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.mblMenu = this.mblMenu.bind(this);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      telephone: undefined,
          password: undefined,
          confirmPassword: undefined,
          company: 'NA',
          streetAddress: 'NA',
          city: 'NA',
          zipCode: 'NA',
          country: 'NA',
          state: 'NA',
          taxId: 'NA',
          newsletSub: 'NA',
      showLogin: false,
      zipcode: undefined,
      homePage: undefined,
      zipcodeInit: undefined,
      redirectRegister: false,
      loginEmail: undefined,
      loginPassword: undefined,
      loginResult: !_isEmpty(props.loginData) ? _get(props.loginData, [0, 'message']) : undefined,
      hover: false,
      totalProd: [],
      // totalProd: props.showCartResult ? _get(props, 'showCartResult', 0) : _get(props.loginData, [0, 'cartDetails', 'result'], 0),
      wishListProduct: _get(props, 'showWishListData', _get(props.loginData, [0, 'wishListDetails', 'result'])),
      wishListTotalProduct: _get(props, 'addToWishlist.totalCount', _get(props.loginData, [0, 'wishListDetails', 'totalCount'])),
      favouriteProducts: undefined,
      favouriteTotalProduct: _get(props.addToFavs, 'product_count', _get(props.loginData, [0, 'favrtDetails', 'product_count'])),
      showError: false,
      // showCartData: false,
      handleCartClick: false,
      showMsg: true,
      showPopup: false,
      errors: {},
      totalProdInCart: 0,
      subtotal: 0,
      // totalProdInCart: _isEmpty(props.firstCartData) ? _get(props.loginData, [0, 'cartDetails', 'total_products_in_cart'], 0) : _get(props.firstCartData, ['cart', 0, 'total_products_in_cart'], 0),
      // subtotal: _isEmpty(props.firstCartData) ? _get(props.loginData, [0, 'cartDetails', 'subtotal']) : _get(props.firstCartData, ['cart', 0, 'subtotal']),
      cateGoriesList: undefined,
      headerSearchRedirect: false,
      searchText: '',
      searchedData: {},
      searchData: [],
      categoryData: [],
      homePageData: [],
      header: [], 
      banner: {},
      infographics: {},
      testimonials: {},
      categoryBlocks: {},
      featuredProducts: {},
      mouseEvent: false,
      popupCall: false,
      callLogin: false,
      redirectToDetailsPage: false,
      url: undefined,
      productId: undefined,
      condition: false,
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      showRemoveIcon: true,
      navbarFixedTop: '',
      subscribeEmail: '',
      newsletterSubscriptionMessage: '',
      newsletterSubscriptionStatus: '',
      showLargeDropDowns: '',
      width: window.innerWidth,
      loginForm: false,
      showChangeAddress: false,
      registerCall: false,
      cartDataShow: null,
      cartResult: undefined,
      productDetails: [],
      cartDataId: undefined,
      itemCount: 0,
      showAddress: false,
      allAddresses: undefined,
      billingAddressId: undefined,
      shippingAddressId: undefined,
      billingAddress: undefined,
      shippingAddress: undefined,
      otherAddress: [],
      responsive: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      children: [],
      addressData: [],      
      catName: undefined,
      catDesc: undefined,
      catImage: undefined,
      catData: undefined,
      link: false,
      showConvert: false,
      homeLoading: true,
      loginLoaderData: false,
      loginResponse: false,
      regEmail:'',
      regPassword: '',
      showForgot: false,
      forgotEmail: undefined,
      forgotData: false,
      removeLoader: false,
      postalCode:'',
      shipAddressPopupData: undefined,
      showFullLoader: true,
      loginError: undefined,
      loginLoader: false,
      showSearch: false,
      showContact: false,
      myAccountLink: false,
      viewCartLink: false,
      homeLink: false,
    };

    //this.props.hideLoginModal({ show: false });
  }

  componentDidUpdate(prevProps) {
    //console.log('test');
    //console.log('test Data',prevProps);
  }

  loginDataFun = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.handleValidation()) {
        this.setState({
          popupCall: true,
          callLogin: true,
        });
        this.props.getLoginData({
          username: this.state.loginEmail,
          password: this.state.loginPassword,
        });
      }
    }
  };

  loginclickFun = () => {
    if (this.handleValidation()) {
      this.setState({
        popupCall: true,
        callLogin: true,
        loginLoaderData: true,
        loginError: undefined,
      });
      this.props.getAccessToken({
        username: this.state.loginEmail,
        password: this.state.loginPassword,
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleInputChange1 = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  

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

  handleValidation() {
    const errors = {};
    let formIsValid = true;
    console.log('test');
    console.log(this.state.loginEmail);

    // Email
    if (this.state.loginEmail === undefined) {
      formIsValid = false;
      errors.loginEmail = 'This is a required field.';
    }

    if (typeof this.state.loginEmail !== 'undefined' && this.state.loginEmail !== '') {
      const lastAtPos = this.state.loginEmail.lastIndexOf('@');
      const lastDotPos = this.state.loginEmail.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.loginEmail.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          this.state.loginEmail.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.loginEmail = 'Email is not valid';
      }
    }

    if (this.state.loginPassword === undefined) {
      formIsValid = false;
      errors.loginPassword = 'This is a required field';
    }

    if (typeof this.state.loginPassword !== 'undefined' && this.state.loginPassword !== '') {
      if (this.state.loginPassword.length < 6) {
        formIsValid = false;
        errors.loginPassword =
          'Please enter more than 6 characters.';
      }
    }
    this.setState({ errors });
    console.log(this.state);
    return formIsValid;
  }

  handleValidationRegister() {
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
    if (this.state.telephone === undefined || this.state.telephone === '') {
      formIsValid = false;
      errors.telephone = 'Please fill out this field';
    }

    if (this.state.telephone !== undefined) {
      if (this.state.telephone.length < 10) {
        formIsValid = false;
        errors.telephone = 'Please Lengthen this text to 10 Numbers';
      } else {
        const re = /^[0-9\b]+$/;
        if (re.test(this.state.telephone)) {
          // formIsValid = true;
        } else {
          formIsValid = false;
          errors.telephone = 'Please Provide Numeric value';
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
        errors.password = 'Please enter 6 characters or more';
      }
    }

    // confirm password
    if (this.state.confirmPassword === undefined || this.state.confirmPassword === '') {
      formIsValid = false;
      errors.confirmPassword = 'Please fill out this field';
    }

    if (this.state.confirmPassword !== undefined) {
      if (this.state.confirmPassword.length < 6) {
        formIsValid = false;
        errors.confirmPassword = 'Please enter 6 characters or more';
      }
    }

    // Email
    if (this.state.email === undefined || this.state.email === '') {
      formIsValid = false;
      errors.email = 'Please fill out this field';
    }

    if (this.state.email !== undefined && this.state.email !== '') {
      const lastAtPos = this.state.email.lastIndexOf('@');
      const lastDotPos = this.state.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.email = 'Email is not valid';
      }
    }

    
    if (this.state.password !== this.state.confirmPassword) {
      alert('Password do not match');
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  }

changeZipCodeData =() =>
  {
  console.log(this.state.postalCode);
   this.props.setZipcodeData(this.state.postalCode);
   this.setState({
    showChangeAddress: false,
  })
  }

  

  customerRegisterData = () => {
    console.log(this.handleValidationRegister());
    if (this.handleValidationRegister()) {
      const reqBody = mapCustomerRegisterData(this.state);
      this.setState({
        regEmail: this.state.email,
        regPassword: this.state.password,
        loginLoaderData: true,
      });
      console.log(reqBody);
      this.props.getRegisterData({customer: reqBody , password: this.state.password });
      this.setState({ isLoading: false, addLoginFromHere: true });
      //this.showLoginModal();
      this.setState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        telephone: undefined,
        password: undefined,
        confirmPassword: undefined,
        company: 'NA',
        streetAddress: 'NA',
        city: 'NA',
        zipCode: 'NA',
        country: 'NA',
        state: 'NA',
        taxId: 'NA',
        newsletSub: 'NA',
        registerCall: true,
      });
    
     
    }
  }

  handlePopupShow() {
    this.setState({ showPopup: true });
  }

  handlePopupClose() {
    this.setState({ showPopup: false });
  }

  handleExit() {
    this.setState({
      showLogin: false,
    });
    if (_isEmpty(this.props.apiToken)) {
      this.props.clearLoginData();
      this.props.hideLoginModal({ show: false });
    }
  }
 
  // showCart = () => {
  //   this.setState({
  //     showCartData: true,
  //     handleCartClick: true,
  //   });
  //   this.props.getCartData({ quoteId: this.state.cart_id });
  // };

  //showRegister = () => {
    //this.setState({
     // showLogin: false,
      //redirectRegister: true,
    //});
    //this.props.hideLoginModal({ show: false });
  //};

  showRegister  = () => {
    this.setState({
      loginForm: false,
    });
  };

  forgotPassword = () => {
    this.setState({
      showLogin: false,
    });
    this.props.hideLoginModal({ show: false });
  }

  handleValidationForgot() {
    const errors = {};
    let formIsValid = true;
    console.log('test');
    console.log(this.state.forgotEmail);

    // Email
    if (this.state.forgotEmail === undefined) {
      formIsValid = false;
      errors.forgotEmail = 'This is a required field.';
    }

    if (typeof this.state.forgotEmail !== 'undefined' && this.state.forgotEmail !== '') {
      const lastAtPos = this.state.forgotEmail.lastIndexOf('@');
      const lastDotPos = this.state.forgotEmail.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.forgotEmail.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          this.state.forgotEmail.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.forgotEmail = 'Email is not valid';
      }
    }
    this.setState({ errors });
    return formIsValid;
    }


    customerForgotPassword = () => {
      console.log(this.state.forgotEmail);
      console.log(this.handleValidationForgot());
      if (this.handleValidationForgot()) 
        {
          var reqObj={
            email: this.state.forgotEmail,
            template: 'email_reset',
            websiteId: 1
          }
          this.setState({
            removeLoader: true,
            forgotEmail: ''
          });
          console.log(reqObj);
          this.props.getForgotPassword(reqObj);
          
        }
      }
  toggleCartDropdown = (elementId, menuElementId) => {
    const ele = document.getElementById(elementId);
    const eleMenu = menuElementId && document.getElementById(menuElementId);
    let claerClass;
    let clearClass;
    if (ele != null) {
      switch (elementId) {
        // eslint-disable-next-line no-case-declarations
        case 'wishlistCart':
          ele.classList.toggle('hover-Menu-Class');
          eleMenu.classList.toggle('hover-Wishlist-cart');
          claerClass = () => {
            ele.classList.toggle('hover-Menu-Class');
          };
          setTimeout(claerClass, 1000);
          clearClass = () => {
            eleMenu.classList.toggle('hover-Wishlist-cart');
          };
          setTimeout(clearClass, 1000);
          this.props.updateCart({ showFavsCart: false });
          break;
        // eslint-disable-next-line no-case-declarations
        case 'favouritesCart':
          ele.classList.toggle('hover-Menu-Class');
          eleMenu.classList.toggle('hover-Wishlist-cart');
          claerClass = () => {
            ele.classList.toggle('hover-Menu-Class');
          };
          setTimeout(claerClass, 1000);
          clearClass = () => {
            eleMenu.classList.toggle('hover-Wishlist-cart');
          };
          setTimeout(clearClass, 1000);
          this.props.updateCart({ showFavsCart: false });
          break;
        default: ele.classList.toggle('hoverClass');
          claerClass = () => {
            // alert('Hello');
            ele.classList.toggle('hoverClass');
          };
          setTimeout(claerClass, 1000);
          this.props.updateCart({ show: false });
      }
    }
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
   let data = [];
   console.log(nextProps.forgotPasswordData);
   console.log(this.state.removeLoader);
   if(nextProps.forgotPasswordStatus === 404 && this.state.removeLoader)
     {
      this.setState({
        removeLoader: false,
       });
       alert('EmailId does not Exist');
       
     } 

     if (nextProps.forgotPasswordData === true && this.state.removeLoader)
     {
       console.log(nextProps.forgotPasswordData);
       this.setState({
        removeLoader: false,
        showForgot: false,
        forgotEmail: '',
       });
       toast.success("Email sent for change password");
     }
   console.log(this.props.registerStatus);
   if (nextProps.custId !== '' && this.state.showAddress)
    {
      this.props.getAllAddressData(nextProps.custId);
      this.props.fetchShippingAddress(nextProps.custId);
      this.props.fetchBillingAddress(nextProps.custId);
      this.setState({
          showAddress: false,
      });
    }
   if (!_isEmpty(nextProps.allAddressData)) {
     data = nextProps.allAddressData.addresses;
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
        addressData: this.createChildren({ data }),
    });
}
   if(this.state.registerCall)
   {
     console.log(nextProps.registerData)
     console.log(this.props.registerStatus);
     if(!_isEmpty(nextProps.registerData))
     {
      this.showLoginModal();
       console.log('test 200');
       toast.success("You Registered Successfully.");
      //swal("", "You Registered Successfully.", "success");
      console.log('email',this.state.regEmail);
      console.log('password',this.state.regPassword);
      this.props.getAccessToken({
        username: this.state.regEmail,
        password: this.state.regPassword,
      });
      this.setState({
        popupCall: true,
        callLogin: true,
        registerCall: false,
      });
      this.props.clearRegData();
      
     }

     

     if(nextProps.registerStatus === 400)
     {
       this.setState({
        registerCall: false,
       })
      console.log('test 300');
      alert(nextProps.registerMessage);
      this.props.clearRegData();
      
     }
   }
   if(nextProps.tokenType === 'RECEIVED_TOKEN_CONSTANTS' && this.state.callLogin)
   {
     console.log(this.state.callLogin);
     console.log(this.props.apiToken);
     console.log(this.props.maskId);
     if(this.props.maskId !== undefined)
     {
      this.props.getGuestConvertCartList({ mask_id: this.props.maskId },nextProps.apiToken);
      this.props.getCart(nextProps.apiToken);
      this.setState({
        showConvert: true,
      });
     }else{
      //this.props.getCartData(nextProps.apiToken);
      this.props.getCart(nextProps.apiToken);
     }
     this.props.getLoginData(nextProps.apiToken);
     
     this.setState({
      callLogin: false,
       showLogin: false,
       showAddress: true,
       loginResponse: true,
       loginError: undefined,
       loginLoaderData: false,
     });
   }
   
   if (!_isEmpty(nextProps.loginResponseData) && this.state.loginResponse) {
     this.setState({
      loginLoaderData: false,
      loginResponse: false,
     })
   }
   if(this.state.showConvert)
   {
    //this.props.getCartData(this.props.apiToken);
    
    this.props.getCart(this.props.apiToken);
    this.setState({
      showConvert: false
    })
   }
   if (!_isEmpty(_get(nextProps, 'firstCartData'))  && this.state.shipShow === false) {
    console.log(nextProps.firstCartData);
    this.setState({
      cartResult: nextProps.firstCartData,
      productDetails: nextProps.firstCartData.items,
      cartDataId: nextProps.firstCartData.id,
      itemCount: nextProps.firstCartData.items_count,
    });
}

   if(nextProps.tokenType === 'REQUEST_TOKEN_CONSTANTS_ERROR' && this.state.callLogin)
   {
    // alert("Invalid EmailId & password!");
     this.setState({
      loginLoaderData: false,
      loginError: 'Invalid EmailId & password!',
      callLogin: false,
      loginLoader: false,
     });
   }
   if (!_isEmpty(_get(nextProps, 'homePageData'))) {
   // console.log(_get(nextProps, 'homePageData[0].status'));
    //console.log(_get(nextProps, 'homePageData[0].response.categoryList'));
     if(_get(nextProps, 'homePageData[0].status') === 200)
      {
      //  console.log('test sdsh');
        this.setState({
          header: _get(nextProps, 'homePageData[0].response.categoryList.header.top_menu'),
          homePageData: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block'),
          categoryData: _get(nextProps, 'homePageData[0].response.categoryList'),
          banner: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[0].home_product_block'),
          infographics: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[1].home_category_block.34'),
          categoryBlocks: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[2]'),
          testimonials: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[3]'),
          featuredProducts: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[4]'),
          homeLoading: false,
          //showFullLoader: false,
        });
        
      }
    //  console.log(this.state.categoryData);
  }


    /* getting autocomplete data from header searched  */
    if (!_isEmpty(_get(nextProps, 'autoCompleteData'))) {
      console.log(nextProps.autoCompleteData);
      console.log(this.state.searchText);
      let data = [];
      for(var i = 0;i<nextProps.autoCompleteData.items.length;i++)
      {
                if(nextProps.autoCompleteData.items[i].qty > 0)
                {
                  data.push(nextProps.autoCompleteData.items[i]);
                }
      }
      this.setState(() => ({
        searchData: data,
        mouseEvent: true,
      }));
      if (this.state.searchText) {
        this.setState(() => ({
          searchData: data,
          mouseEvent: true,
        }));
      }

    }

    if (!_isEmpty(_get(nextProps, 'showLoginModal')) && _get(nextProps, 'showLoginModal.show')) {
      this.handleShow('login');
    }

  }

  addShow = (e) => {
    console.log(e);
    const selectedAddress = {
      addressId: e.id,
      firstName: e.firstname,
      middleName: e.middlename,
      lastName: e.lastname,
      company: e.company,
      telephone: e.telephone,
      streetAddress1: e.street[0],
      streetAddress2: e.street.length <= 1 ? '' : e.street[1],
      city: e.city,
      postalCode: e.postcode,
      stateId: e.region_id,
        }
        this.setState({
          shipAddressPopupData: selectedAddress,
        })
        console.log(e);
        this.props.setZipcodeData(e.postcode);
        this.setState({
          showChangeAddress: false,
        })


    }

  
  createChildren = ({ data }) => Object.keys(data).map(i =>
      
    <div onClick={() => this.addShow(data[i])}>
      <center>
               <div style={{border:'1px solid #f96495',height:'175',width:'200px'}}>
                                        
                                        <div style={{fontSize: '14px',fontWeight: '700',border:'1px solid #f96495',backgroundColor: 'rgb(245, 245, 245)',textTransform: 'none',padding:'10px'}}>
                                    Address
                                      </div>
                                            <address>
                                                <br />{_get(data[i], 'firstname')}<br />{_get(data[i], 'lastname')}
                                                <br />{_get(data[i], 'company')}<br />{_get(data[i], 'street[0]')}
                                                <br />{_get(data[i], 'city')}, {_get(data[i], 'region.region')}, {_get(data[i], 'postcode')}
                                                <br />{_get(data[i], 'country_id')}<br />
                                            </address>
                                            
                </div>
         </center>
    </div>
  );
  

  handleEmailChange = (event) => {
    // console.log('event:', event.target.value);
    this.setState({ subscribeEmail: event.target.value });
  }

  handleSubscribe = () => {
    this.props.postNewsletterSubscription({ emailId: this.state.subscribeEmail });
  }

  UNSAFE_componentWillMount() {
    //this.props.getLoginData();
    if(this.props.stateListData !== undefined)
    {
      this.props.getStateListData();
    }
    if(this.props.zipcode === '')
    {
    fetch('https://geoip-db.com/json/')
      .then(response => response.json())
     .then((json) => {
         const ipAddress = json.IPv4;
         console.log(ipAddress);
          this.props.getZipcodeData(ipAddress);
       }).catch(function (error) {
        console.log(error);
       });
      }
    // this.props.getCategoriesData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   // sort: this.state.sortValue,
    //   // pageNo: 1,
    // });
    if (this.props.cartCount) {
      this.setState({
        totalProdInCart: this.props.cartCount,
        subtotal: this.props.cartTotal,
        totalProd: this.props.cartProducts,
      });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    console.log(this.props);
     setTimeout(() => {
      this.setState({
        showFullLoader: false,
      })
     }, 2000);
    this.props.receiveHideLoginModalData();
    //const copyCartObj = JSON.parse(localStorage.getItem("cart"));
    //console.log(copyCartObj);
    //this.setState({ cartDataShow : copyCartObj });
    this.props.clearRegData();
    //localStorage.removeItem("cart"); 
   // console.log(window.orientation);
   //if(this.props.apiToken)
   //{
    // this.props.getCartData(this.props.apiToken);
   //}
    window.addEventListener('resize', this.handleWindowSizeChange);
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };


    document.addEventListener('click', this.handleClickOutside, true);
    this.setState(() => ({
      searchedData: {},
      loginForm: true,
    }));

    window.addEventListener('scroll', () => {
      const element = document.getElementById('slideNav');
      const elementWantclassName1 = document.getElementById('bkmLogo');
      const elementWantclassName2 = document.getElementById('desktopOnly');
      const h = window.innerHeight;
      if (h > 80) {
        if (window.scrollY > 30) {
          this.setState({ navbarFixedTop: 'navbar-fixed-top' });
          element && element.classList.add('animated');
          elementWantclassName1 && elementWantclassName1.classList.add('scroll');
          elementWantclassName2 && elementWantclassName2.classList.add('scroll');
        } else {
          this.setState({ navbarFixedTop: '' });
          element && element.classList.remove('animated');
          elementWantclassName1 && elementWantclassName1.classList.remove('scroll');
          elementWantclassName2 && elementWantclassName2.classList.remove('scroll');
        }
      }

      if(this.props.zipcode === '')
      {
      fetch('https://geoip-db.com/json/')
        .then(response => response.json())
       .then((json) => {
           const ipAddress = json.IPv4;
           console.log(ipAddress);
            this.props.getZipcodeData(ipAddress);
         }).catch(function (error) {
          console.log(error);
         });
        }

    
   
    });

   //console.log("data123", "test Data");
    

   // this.props.getHomePage();
  //  console.log(this.props);
    

     
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    console.log('test 22');
    window.removeEventListener('resize', this.handleWindowSizeChange);
    document.removeEventListener('click', this.handleClickOutside, true);
    this.setState(() => ({
      isOpen: false,
      mouseEvent: false,
      searchText: '',
    }));
  }

  showLoginData  = () => {
    this.setState({
      loginForm: true,
      
    });
  };

  showHomePage = () =>
  {
    this.setState({
      homeLink: true,      
    });
  };


  /* for Header Search Box. */
  handleClickSearch = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.
      mouseEvent: false,
    });
  }
  keyPress = (e) => {
    let inputValue = null;
    
    console.log(e.key);
    inputValue = e.target.value;
    console.log(inputValue);
    if (e.key === 'Enter') {
      console.log(inputValue);
      this.setState({
        showSearch:false,
        mouseEvent: false,
        headerSearchRedirect: true, // uncheck for redirection.
        searchText: inputValue,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (inputValue.length > 2) {
        console.log('inside');
        this.props.getCategoryAutoCompleteData(inputValue);
      } else {
        console.log('outside');
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
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }
  handleAllResultRedirection = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.

      mouseEvent: false,
    });
  }

  /**
  * Alert if clicked on outside of element
  */
  handleClickOutside = (event) => {
    console.log(event);
    this.setState(() => ({ mouseEvent: false, searchText: '' }));
   // const domNode = document.getElementById('dropdownMenuDesktop3');
    //const domNode1 = document.getElementById('dropdownMenuMobile3');
   //if (!domNode && !domNode.contains(event.target) && !domNode1 && !domNode1.contains(event.target)) {
   // this.setState({ isOpen: false });
     //}
    //if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //this.setState(() => ({ mouseEvent: false, searchText: '' }));
    // }
  }
  handleClose() {
    this.setState({ showLogin: false });
  }


  handleShow = (id) => {
    // if (window.screen.width >= 768) {
    this.setState({ showLogin: true });
    // } else {
    //   this.state.condition && this.setState({ condition: !this.state.condition });
    //   this.props.history.push(id === 'login' ? '/login' : '/register');
    // }
  }
  mblMenu() {
    this.setState({ condition: !this.state.condition });
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
  toggleOpen3 = () => {
    this.setState({ isOpen3: !this.state.isOpen3 });
  };
  onSearchTextChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ searchText: value }));
  }
  handleClick = () => {
    this.props.history.push('/view-cart');
  };
  handleClickForMyAccount = () => {
    this.props.history.push('/customer/account');
  };
  showProductDetailPage = (productId, urlKey) => {
    this.setState(() => ({
      url: urlKey,
      productId,
      mouseEvent: false,
    }));
  };

  removeProduct = (cartRid) => {
    this.props.getaddRemoveUpdateProduct({
      apiToken: this.props.apiToken, itemId: cartRid,
    }, 'DELETE');
  }

  handleMouseEnter = () => {
    this.setState({ showLargeDropDowns: 'custom-class-trail' });
  }

  handleMouseLeave = () => {
    this.setState({ showLargeDropDowns: '' });
  }

  showLoginModal = () => this.setState(prevState => ({
    showLogin: !prevState.showLogin,
  }));
  
  showSearchModal = () => this.setState(prevState => ({
    showSearch: !prevState.showSearch,
  }));

  showContactModal = () => this.setState(prevState => ({
    showContact: !prevState.showContact,
  }));

  showForgotModal = () => this.setState(prevState => ({
    
    showLogin: false,
    showForgot: !prevState.showForgot,
  }));

  showDataModal =() => {
    console.log('close modal');
    this.setState(prevState => ({
      showLogin: !prevState.showLogin,
    }));
  }

  showAddressModal = () => this.setState(prevState => ({
    showChangeAddress: !prevState.showChangeAddress,
  }));

  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }
  
  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }

  getData = (data) => {
    console.log(data);
    this.setState({
           catData: data,
           link: true,
    });
  }  

  getAccountData = () => {
    console.log();
    this.setState({
           myAccountLink: true,
    });
  }  

  getCartData = () => {
    console.log();
    this.setState({
           viewCartLink: true,
    });
  }  
  
  handleAddAddress = () => {
    this.setState({
      showChangeAddress: false,
    })
   // setTimeout(() => {
      this.props.history.push('/customer/account/address/new');
 // }, 2000);
    
};

changeBillingAddress = (d) =>
  {
    console.log(d);
    this.props.setZipcodeData(d);
    this.setState({
      showChangeAddress: false,
    })
  }



  // eslint-disable-next-line class-methods-use-this
  render() {
    //console.log(this.state);
    //console.log(this.props);
    const { width } = this.state;
     const isMobile = width <= 500;
    // console.log(isMobile);
     if (isMobile) {

       //console.log('mobile');
     }else{
       //console.log('web');
     }
    //console.log(this.state.categoryData);
    //console.log(this.state.homePageData);
    //console.log(this.state.infographics);
    //console.log(this.state.testimonials);
    //console.log(this.state.featuredProducts);
    //console.log(this.state.categoryBlocks);
    if (this.state.redirectRegister) {
      return (<Redirect to={{
        pathname: '/register',
      }} />);
    }

    if (this.state.viewCartLink) {
      this.setState({
        viewCartLink: false,
     });
     return (
       <Redirect push to={{
         pathname: '/view-cart'
     }} />
      );
   
   
   }


   if (this.state.homeLink) {
    this.setState({
      homeLink: false,
   });
   return (
     <Redirect push to={{
       pathname: '/'
   }} />
    );
 
 }

   if (this.state.myAccountLink) {
    this.setState({
      myAccountLink: false,
   });
   return (
     <Redirect push to={{
       pathname: '/customer/account'
   }} />
    );
 
 
 }

    if (this.state.link) {
      this.setState({
        link: false,
      });
      if (this.state.catData.name === 'ABOUT US') {
      return (
        <Redirect push to={{
          pathname: '/about-us',
      }} />
       );
    }else{

      return (
        <Redirect push to={{
          pathname: '/catalog/category/view/s/'+this.state.catData.name+'/id/'+this.state.catData.id ,
          state: {  catName: this.state.catData.name, catDesc: this.state.catData.short_description, catImage: this.state.catData.image },
      }} />
       );

    }
    }
    //console.log(this.state.loginLoaderData);
    if (this.state.showFullLoader) {
      return (
        <div id="cover-spin">
          <center>
            <img src={ lazyLoader } style={{height:'126px',marginTop:'300px'}} alt="lazy-loader"/>
            </center>  
        </div>
      );
  }
  

    const menuClass = `dropdown-menu ${this.state.isOpen ? 'show' : ''}`;
    const menuClass1 = `dropdown-menu ${this.state.isOpen1 ? 'show' : ''}`;
    const menuClass2 = `dropdown-menu ${this.state.isOpen2 ? 'show' : ''}`;
    const menuClass3 = `dropdown-menu ${this.state.isOpen3 ? 'show' : ''}`;
    const { searchText, searchedData, mouseEvent } = this.state;
    const prodList = _get(searchedData, 'productIdlist');
    const prodListData = _get(searchedData, 'searchProdResult');
    console.log(this.state.headerSearchRedirect)
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
// console.log(this.state);
    return (

      <div className="App">
                  <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
          <div>
      

            <header className="header header_style1">
              <div className="row">
                    <div className="col-md-4">
                
                    </div>
                    <div className="col-md-4" style={{marginTop:'10px'}}>
                          <center>
                             <a onClick={() => this.showHomePage()} style={{cursor:'pointer'}}><img src={headerImage} alt="#" style={{height:'80px',width:'150px'}} /></a>
                          </center>
                    </div>
                    <div className="col-md-4">
                      </div>
              </div>


       </header>
       
       
       
        </div>
        
        {this.props.children}
        <MaModal open={this.state.showLogin} handleCloseModal={this.showLoginModal}>
         {this.state.loginForm ? 
          <div className='text-center' style={{marginLeft:'30px',marginRight:'30px'}}>
         
          <div className="row">
            <div className="col-sm-10"></div>
            <div className="col-sm-2" style={{marginTop:'10px'}}>
            <a style={{paddingLeft:'5px',cursor:'pointer',float:'right'}} onClick={this.showLoginModal}>
          <span style={{fontSize:'25px'}}>X</span>
          </a>
            </div>
          </div>
          <div className=''>          
          <h1 style={{fontFamily:'Quintessential',fontSize:'30px'}}>Please Sign In</h1><br/>
          
          </div> 
            <div className="row"  style={{position: 'relative'}}>
                <div className="col-md-3">
              </div>
              <div className="col-md-6 field1">
                <input type="text" name="loginEmail" 
                    onChange={this.handleInputChange} id="loginEmail" placeholder="Email Address" required="" />
              </div>
              <div className="col-md-3" style={{marginTop:'20px'}}>
              <span className={`${ this.state.errors.loginEmail }`? 'blink' : ''}>{this.state.errors.loginEmail}</span>
              </div>
              </div>
              <div className="row"  style={{position: 'relative'}}>
              <div className="col-md-3">
              </div>
              <div className="col-md-6 field1">
                <input type="password" id="loginPassword" name="loginPassword" onChange={this.handleInputChange}  placeholder="Password" required=""/>
              </div>
              <div className="col-md-3" style={{marginTop:'20px'}}>
              <span className={`${ this.state.errors.loginPassword }`? 'blink' : ''}>{this.state.errors.loginPassword}</span>
              </div>
              </div>
              <div>
                <br/>
                <div className="row"  style={{position: 'relative'}}>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3" style={{marginTop:'-25px'}}>
                    <a onClick={this.showForgotModal} style={{color:'#8AB77D',cursor:'pointer'}}>Forgot Password?</a>
                    </div>
                </div>
                {
                  this.state.loginError !==undefined &&
                      <p style={{color:'red'}}>{this.state.loginError}</p>
                }
               
                 <div className="field">
                                {this.state.loginLoaderData === false ? 
                                      <center>
                                        <input onClick={this.loginclickFun} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px'}} className="field_bt" value="SUBMIT"/>
                                      
                                      </center>
                                 :
                                 <center>

                                    <img src={logLoader} alt="#" style={{height:'80px',width:'80px'}} />
                                 </center>
                                 }
                                    </div>
               <br/>
                 <div class="row">
                   <center>
                    <p>Not a member?&nbsp;
                        <a onClick={this.showRegister} style={{color:'#8AB77D',cursor:'pointer'}}>Register</a>
                    </p>
                    </center>                        
                       
                </div>
            </div>
            <div>

            </div>


           </div>
           :
           <div><div className='text-center' style={{marginLeft:'30px',marginRight:'30px'}}>
          <div className="row">
            <div className="col-sm-10"></div>
            <div className="col-sm-2" style={{marginTop:'10px'}}>
            <a style={{paddingLeft:'5px',cursor:'pointer',float:'right'}} onClick={this.showLoginModal}>
          <span style={{fontSize:'25px'}}>X</span>
          </a>
            </div>
          </div>
           <div className='cust-margin-login'>          
           <h3 style={{fontFamily:'Quintessential'}}>Please Register</h3>
           </div>           
           <div className="row">
             <center style={{fontFamily:'Quintessential'}}>
           Or via email
            </center>
            </div>
             <div className="row" style={{position: 'relative',marginTop:'12px'}}>
               <div className="col-md-6 field1">
                 <input type="text" id="firstName" placeholder="First Name" autocomplete="new-password" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                
                 <span className={`${ this.state.errors.firstName }`? 'blink' : ''}>{this.state.errors.lastName}</span>
               </div>
               <div className="field1 col-md-6">
                 <input type="text" id="lastName" placeholder="Last Name" autocomplete="new-password" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                 
                 <span className={`${ this.state.errors.lastName }`? 'blink' : ''}>{this.state.errors.lastName}</span>
               </div>
             </div>
             <div className="row"  style={{position: 'relative',marginTop:'12px'}}>
               <div className="field1 col-md-6">
                 <input type="email" autocomplete="new-password" id="email" name="email" value={this.state.email} placeholder="Email Address" onChange={this.handleInputChange}/>
                 
                 <span className={`${ this.state.errors.email }`? 'blink' : ''}>{this.state.errors.email}</span>
               </div>
 
               <div className= "field1 col-md-6">
                 <input type="text" autocomplete="new-password" id="telephone" name="telephone"  placeholder="Cell Phone"   value={this.state.telephone} onChange={this.handleInputChange}/>
                 
                 <span className={`${ this.state.errors.telephone }`? 'blink' : ''}>{this.state.errors.telephone}</span>
               </div>
               </div>
               <div className="row"  style={{position: 'relative',marginTop:'12px'}}>
               <div className="field1 col-md-6">
                 <input type="password" autocomplete="new-password" id="password" className="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                
                 <span className={`${ this.state.errors.password }`? 'blink' : ''}>{this.state.errors.password}</span>
               </div>
               <div className="field1 col-md-6">
                 <input type="password" autocomplete="new-password" id="confirmPassword" className="confirmPassword" placeholder="Confirm Password"  value={this.state.confirmPassword} onChange={this.handleInputChange}/>
                 
                 <span className={`${ this.state.errors.confirmPassword }`? 'blink' : ''}>{this.state.errors.confirmPassword}</span>
               </div>
               </div>
               <div>
               
             </div>
             <div>
             
             {this.state.registerCall === false ? 
                                     <center>               
                                     <input type="submit" onClick={this.customerRegisterData} style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="SIGN UP"/>
                                     </center>
                                 :
                                 <center>

                                    <img src={logLoader} alt="#" style={{height:'80px',width:'80px'}} />
                                 </center>
                                 }
 
             </div>
             <br/>
                 <div class="row" style={{marginTop:'-10px'}}>
                   <center>
                    <p>Have an Account?&nbsp;
                        <a onClick={this.showLoginData} style={{color:'#8AB77D',cursor:'pointer'}}>Login</a>
                    </p>
                    </center>                        
                       
                </div>
 
  
            </div></div>}
        </MaModal>

        <MaModalOne open={this.state.showChangeAddress} handleCloseModal={this.showAddressModal}>
                  <div className="row" style={{backgroundColor:'#f96495',marginTop:'-20px',height:'64px',marginLeft:'0px',marginRight:'0px'}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6"> <center><h3 style={{color:'white',paddingTop:'9px'}}>Change Your Location</h3>
                      
                      </center></div>
                      <div className="col-md-3"><a style={{padding:'20px',cursor:'pointer',float:'right'}} onClick={this.showAddressModal}>X</a></div>
                  </div>
                    <div>
                      {this.props.apiToken === '' ?
                      <div>
                          <div className="row"  style={{position: 'relative',marginTop:'100px',height:'250px'}}>
                                <div className="col-md-3">
                              </div>
                              <div className="col-md-6 field1">
                                <input type="text" name="postalCode" 
                                    onChange={this.handleInputChange1} id="postalCode" placeholder="Zip Code" required="" />
                              </div>
                              <div className="col-md-3">
                              </div>
                          </div>
                          <br/><br/>
                          <center>               
                          <input type="submit" onClick={this.changeZipCodeData} style={{backgroundColor: '#f96495',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Apply"/>
                          </center>

                      </div>                      
                      :
                      <div>
                        <br/>

                    {
                      this.state.addressData.length !== 0 ?
                      <div>
                        <br/>
                        <div className="row"  style={{position: 'relative',marginTop:'2px'}}>
                              <div className="col-md-2 ">
                                </div>
                              <div className="col-md-6 field1">
                                <input type="text" name="postalCode" 
                                    onChange={this.handleInputChange1} id="postalCode" placeholder="Zip Code" required="" />
                              </div>
                              <div className="col-md-4" style={{marginTop:'17px'}}>
                              <center>               
                                   <input type="submit" onClick={this.changeZipCodeData} style={{backgroundColor: '#8AB77D',color: 'white',width:'160px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Apply"/>
                               </center>
                              </div>
                          </div>
                          
                          <center>
                          <hr style={{border:'1px solid #eaeaea',width:'500px'}}/>
                          </center>
                          <br/>
                      <AliceCarousel
                           items={this.state.addressData}
                           responsive={this.state.responsive}
                           mouseTrackingEnabled={true}
                           onSlideChange={this.onSlideChange}
                           onSlideChanged={this.onSlideChanged}
                         />
                         
                                    <center>
                                        <input onClick={() => this.handleAddAddress()}  type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add New Address"/>
                                    </center> 
                       <br/>
                     </div>
                    :  
                    <div style={{marginTop:'50px'}}>
                      <br/>
                         <div className="row"  style={{position: 'relative'}}>
                             <div className="col-md-2">
                              </div>
                              <div className="col-md-6 field1">
                                <input type="text" name="postalCode" 
                                    onChange={this.handleInputChange1} id="postalCode" placeholder="Zip Code" required="" />
                              </div>
                              <div className="col-md-4" style={{marginTop:'17px'}}>
                              <center>               
                                   <input type="submit" onClick={this.changeZipCodeData} style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Apply"/>
                                </center>
                              </div>
                          </div>
                          <br/>
                          <br/>
                          <center>
                          <hr style={{border:'1px solid #eaeaea',width:'500px'}}/>
                          </center>
                          <br/>
                                <div className="row">
                                  <div className="col-md-3"></div>
                                    <div className="col-md-6">
                                    <h5 style={{textTransform:'none'}}>We could not find any Address in your Address Book, please add new address or Enter zip code to search products.</h5> 
                                    </div>
                                    <div className="col-md-3"></div>
                                </div> 
                                <br/><br/>
                                <center>
                                        <input onClick={() => this.handleAddAddress()}  type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add New Address"/>
                                    </center>  
                                    <br/> 
                       </div>
                    }

                      </div> 
                      }
                    </div>
                   
        </MaModalOne>

        <MaModal open={this.state.showForgot} handleCloseModal={this.showForgotModal}>
            <div className='text-center' style={{marginLeft:'30px',marginRight:'30px'}}>
          
              <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2" style={{marginTop:'10px'}}>
                    <a style={{paddingLeft:'5px',cursor:'pointer',float:'right'}} onClick={this.showForgotModal}>
                      <span style={{fontSize:'25px'}}>X</span>
                    </a>
                </div>
              </div>
              
              <div className='cust-margin-login'>          
                 <h1 style={{fontFamily:'Quintessential',fontSize:'30px'}}>Please Enter Email</h1><br/>
                  <br/><br/>
                       <div className="row"  style={{position: 'relative'}}>
                              <div className="col-md-3">
                              </div>
                               <div className="col-md-6 field1">
                              <input type="text" name="forgotEmail" 
                                  onChange={this.handleInputChange} id="forgotEmail" placeholder="Email Address" required="" />
                              </div>
                              <div className="col-md-3">
                              <span className={`${ this.state.errors.forgotEmail }`? 'blink' : ''}>{this.state.errors.forgotEmail}</span>
                              </div>
                       </div>
                       <br/><br/>
                       <div>
                         {this.state.removeLoader !== true ?
                          <center>               
                          <input type="submit" onClick={this.customerForgotPassword} style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Send Link"/>
                          </center> :
                           <center>               
                            <img src={ lazyLoader } style={{height:'60px',width:'60px'}}  alt="lazy-loader"/>
                           </center>
                          }
              
                          </div>


                  </div> 
            </div>
        </MaModal>



         <MaModalSerch open={this.state.showSearch} handleCloseModal={this.showSearchModal}>
          <div>
            <br/>
             <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="row">
                      <div className="col-md-10">
                          <form class="example1">
                            <input type="text" onKeyPress ={this.keyPress} placeholder="Search by color,occasion" name="searchData"/>
                            
                            <button type="submit"><i class="fa fa-search"></i></button>
                           
                          </form>
                          {this.state.searchData.length != 0 && 
                            <Suggetion searchedData={this.state.searchData}/>
                            }
                       </div>   
                       <div className="col-md-3" style={{marginLeft:'-60px'}}>
                          <a style={{paddingLeft:'5px',cursor:'pointer',float:'right'}} onClick={this.showSearchModal}>
                                    <span style={{fontSize:'25px'}}>X</span>
                          </a>
                      </div> 
                </div> 
              </div>
              <div className="col-md-2"></div>
            </div>
            <br/>
          </div>
        </MaModalSerch>

        <MaModalContact open={this.state.showContact} handleCloseModal={this.showContactModal}>
          <div style={{backgroundImage: `url(${flowerback})`,width:'592px',height:'562px'}}>
              
          </div>
        </MaModalContact>
          
          
       

  <footer className="footer_style_2">
               <div className="row">
                   <div className="col-xs-2" style={{marginTop:'32px'}}>
                      <center>
                          <a href="https://www.facebook.com/arabellabouquet/" target="_blank">
                            <i className="fa fa-facebook fa-2x" style={{color:'#ffffff'}}></i></a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="https://www.instagram.com/arabellabouquet/" target="_blank"><i className="fa fa-instagram fa-2x"  style={{color:'#ffffff'}}></i></a>
                        </center> 
                   
                   </div>
                   <div className="col-xs-4">
                      
                    </div>
                    <div className="col-xs-6 ">
                    <div class="row" style={{marginTop:'32px'}}>
                        <div class="column"><center><a href="/about-us" style={{color:'white'}}>About Us</a></center></div>
                        <div class="column"><center><a href="/blog" style={{color:'white',marginLeft:'-65px'}}>Blog</a></center></div>
                        <div class="column"><center><a href="/terms-of-service" style={{color:'white',marginLeft:'-65px'}}>Terms Of Service</a></center></div>
                        <div class="column"><center><a href="/privacy-policy" style={{color:'white',marginLeft:'-65px'}}> Privacy Policy</a></center></div>
                        <div class="column"><center><a onClick={this.showContactModal} style={{color:'white',marginLeft:'-65px'}}>Contact Us</a></center></div>
                      </div>
                    </div>
              </div>
  </footer>
      

      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRegisterData: data => dispatch(fetchCustomerRegisterData(data)),
  getAccessToken: data => dispatch(fetchCustomerToken(data)),
  getLoginData: (data) => dispatch(fetchCustomerDetails(data)),
  getHomePage: () => dispatch(fetchHomePage()),
  clearRegData: () => dispatch(clearRegisterData()), 
  getCategoryAutoCompleteData: data => dispatch(fetchCategoriesAutoCompleteResult(data)),
  getZipcodeData: data => dispatch(fetchZipCode(data)),
  getCartData: data => dispatch(fetchCartItemsByCustomer(data)),
  getAllAddressData: data => dispatch(fetchAllAddressData(data)),
  receiveHideLoginModalData: () => dispatch(receiveHideLoginModalData()),
  getGuestConvertCartList: (data,data1) => dispatch(getGuestConvertCartList(data,data1)),
  getCart: data => dispatch(fetchGetCartData(data)),
  fetchShippingAddress: data => dispatch(getShippingAddress(data)),
  fetchBillingAddress: data => dispatch(getBillingAddress(data)),
  getStateListData: () => dispatch(fetchStateListData()),
  getForgotPassword: data => dispatch(fetchForgotPassword(data)),
  setZipcodeData: data => dispatch(setZipcodeData(data)),
});

const mapStateToProps = (state) => {
  const {
    loginReducer, bkmReducer, registerReducer, cartReducer , allAddressReducer
  } = state;

  const {
    registerStatus,
    registerMessage,
    registerData,
    stateListData,
    isFetching: isLoading,
    error: registerError,
  } = registerReducer || [];

  const {  
    showLoginModal,
    hideLoginModal,
    homePageData,
    apiToken,
    localData,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    tokenType,
    loginMessage,
    loginStatus,
    zipcode,
    zipcodeInit,
    loginResponseData,
    defaultBilling,
    isFetching,
    isHomeLoading,
    forgotPasswordStatus,
    forgotPasswordData,
  } = loginReducer || [];

  const {
    cartId,
    cartData,
    firstCartData,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    newCartData,
    cartDatNew,
    cartStatus,
  } = cartReducer || [];

  const {
    allAddressData,
    shippingAddressData,
    billingAddressData,
} = allAddressReducer || [];

  const { autoCompleteData } = bkmReducer || [];

  const error = !_isEmpty(registerError) ;

  return {
    isFetching,
    tokenType,
    homePageData,
    autoCompleteData,
    apiToken,
    localData,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    registerData,
    registerStatus,
    registerMessage,
    loginMessage,
    loginStatus,
    cartId,
    cartData,
    firstCartData,
    zipcode,
    zipcodeInit,
    loginResponseData,
    defaultBilling,
    allAddressData,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,    
    showLoginModal,
    hideLoginModal,
    shippingAddressData,
    billingAddressData,
    stateListData,
    newCartData,
    cartDatNew,
    isHomeLoading,
    cartStatus,
    forgotPasswordStatus,
    forgotPasswordData,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HeaderLayout));

// export default HeaderLayout;
