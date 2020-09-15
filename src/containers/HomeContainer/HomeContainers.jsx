import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _isError from 'lodash/isError';
import { Link } from 'react-router-dom';
import Redirect from 'react-router/Redirect';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import swal from 'sweetalert';
import MetaTags from 'react-meta-tags';
import Image from 'react-image-resizer';
import '../../assets/stylesheets/style.css';
import MaModalOne from '../../components/Common/MaterialUIModalOne.jsx';
import HomeComponent from '../../components/BKMComponent/HomeComponent.jsx';
import HomeFooterContentComponent from '../../components/BKMComponent/HomeFooterContentComponent.jsx';
import HomeWholeSaleComponent from '../../components/BKMComponent/HomeWholeSaleComponent.jsx';
import HomeContentComponent from '../../components/BKMComponent/HomeContentComponent.jsx';
import { fetchHomePage, setZipcodeData } from '../../actions/login';
import { vendorLoginData } from '../../actions/vendorArtist';
import { fetchHomePageNewArrivalsProducts, fetchHomePageNewArrivalsSPProducts, fetchHomePageFreshDealsProducts, fetchHomePageFreshDealsSPProducts, fetchHomePageBestSellerProducts, fetchHomePageBestSellerSPProducts } from '../../actions/bkm_listing';

import { customLoader as CustomLoader } from '../../components/Loader/Loader.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import artistBanner from '../../assets/images/artist_banner.png';
import logoIcon from '../../assets/images/LOGO.png';
import navBarIcon from '../../assets/images/navbar-icon-three.png';
import arrowIcon from '../../assets/images/aRROW.png';
import joinHandsIcon from '../../assets/images/Banner-9.png';
import banner11 from '../../assets/images/Banner-11.png';
import banner12 from '../../assets/images/Banner-12.png';
import banner13 from '../../assets/images/Banner-13.png';
import banner14 from '../../assets/images/Banner-14.png';
import roses from '../../assets/img/roses.png';
import three from '../../assets/img/3.png';
import threea from '../../assets/img/3a.png';
import four from '../../assets/img/4.png';
import foura from '../../assets/img/4a.png';
import five from '../../assets/img/5.png';
import fivea from '../../assets/img/5a.png';
import six from '../../assets/img/6.png';
import sixa from '../../assets/img/6a.png';
import seven from '../../assets/img/7.png';
import sevena from '../../assets/img/7a.png';
import eight from '../../assets/img/8.png';
import eighta from '../../assets/img/8a.png';
import nine from '../../assets/img/9.png';
import ninea from '../../assets/img/9a.png';
import ten from '../../assets/img/10.png';
import tena from '../../assets/img/10a.png';
import eleven from '../../assets/img/11.png';
import twelve from '../../assets/img/12.png';
import last from '../../assets/img/27.png';
import lasta from '../../assets/img/28.png';
import testimonial from '../../assets/img/testimonial.jpg';
import testi from '../../assets/img/testi.jpg';
import test3 from '../../assets/img/test3.jpg';
import test4 from '../../assets/img/test4.jpg';
import lazyLoader from '../../assets/img/loader.gif';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: 'index',
      childrenNA: [],
      childrenBS: [],
      childrenFD: [],
      activeItemIndexNA: 0,
      activeItemIndexBS: 0,
      activeItemIndexFD: 0,
      responsive: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 3 } },
      responsive1: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      responsive2: { 480: { items: 1 }, 760: { items: 1 }, 900: { items: 1 } },
      redirectToRegistration: false,
      redirectToListing: false,
      categoryData: [],
      homePageData: [],
      header: [],
      banner: {},
      infographics: [],
      testimonials: {},
      categoryBlocks: [],
      featuredProducts: undefined,
      featProd: undefined,
      testMonial: undefined,
      bannerDetails: undefined,
      mobileBanner: undefined,
      mobileInfoShow: undefined,
      infoCatName: undefined,
      popCatName: undefined,
      clientCatName: undefined,
      shopCatName: undefined,
      summerFlowersCatName: undefined,
      summerFlowersCatData: undefined,
      showChangeAddress: false,      
      showAddress: false,
      allAddresses: undefined,
      billingAddressId: undefined,
      shippingAddressId: undefined,
      billingAddress: undefined,
      shippingAddress: undefined,
      otherAddress: [],
      responsive3: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      createChildrenData: [],
      addressData: [],    
      postalCode:'',
      shipAddressPopupData: undefined, 
      link: false,
      viewAll: undefined,
      pageLoader: true,
      proData: undefined,
      proLink: false,
      loginLoaderData: false,
      loginEmail: undefined,
      loginPassword: undefined,
      errors: {},
    };
  }

  loginclickFun = () => {
    if (this.handleValidation()) {
      this.setState({
       // popupCall: true,
       // callLogin: true,
        //loginLoaderData: true,
        //loginError: undefined,
      });
      this.props.getLogin({
        user_name: this.state.loginEmail,
        password: this.state.loginPassword,
      });
    }
  };

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


  
  
  

  componentDidMount() {
    document.title = 'Arabella Bouquets';
    console.log(this.props);
    window.addEventListener('resize', this.handleWindowSizeChange);
    //this.props.getHomePage();
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };
    if (this.props.apiToken && this.props.lastUpdatedToken && lessThanOneDayAgo(this.props.lastUpdatedToken)) {
      this.props.getLogoutData();
    }

   
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
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


  populateArray = (nextProps, type, childrenProducts) => {
    const products = [...childrenProducts];

    if (!_isEmpty(_get(nextProps, type))) {
      const bkmSearchData = _get(nextProps, type);

      if (_get(bkmSearchData, 'products.status')) {
        const bkmSearchResult = _get(bkmSearchData, 'products.result');

        // eslint-disable-next-line no-restricted-syntax
        for (let productKey in bkmSearchResult) {
          if (bkmSearchResult.hasOwnProperty(productKey)) {
            products.push({
              name: bkmSearchResult[productKey]['info']['name'],
              image: bkmSearchResult[productKey]['info']['image'],
              url_key: bkmSearchResult[productKey]['info']['url_key'],
              productId: bkmSearchResult[productKey]['info']['pid'],
            });
          }
        }
      }
    }

    return products;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
  
  console.log(nextProps);
  if (!_isEmpty(_get(nextProps, 'vendorLogin')))
  {
     if(nextProps.vendorLogin[0].status === true) 
     {
        console.log(nextProps.vendorLogin[0]);
     }else{
        swal("", nextProps.vendorLogin[0].message, "error");
     }
  }
  let data = [];
  let monials = [];
  let featData = [];
  let bannerData = [];  
  let mobileData = [];   
  let mobileInfo = [];  
   let featOriginalData = [];
   console.log(featData);
   if (!_isEmpty(_get(nextProps, 'homePageData'))) {
    //console.log(_get(nextProps, 'homePageData[0].status'));
   // console.log(_get(nextProps, 'homePageData[0].response.categoryList'));
     if(_get(nextProps, 'homePageData[0].status') === 200)
     {
        
       
       // data = _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[4].home_product_block.37.products');
        monials = _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[4].home_category_block.36.sub_category');
        featData= _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[1].home_product_block.31.products');
        console.log(featData);
        for(var i=0; i<featData.length; i++)
        {
          console.log(i);
          if(i < 4)
          {
            featOriginalData.push(featData[i]);
          }
        }
        console.log(featOriginalData);
        // bannerData = _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[0].home_slider_block.gallery_images'); 
       // mobileData = _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[0].home_slider_block.mobile_gallery_images'); 
       // mobileInfo = _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[1].home_category_block.34.sub_category');
       // console.log('test sdsh', _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[4].home_product_block.37.products'));
        //console.log(data);
        
         console.log(monials);
        this.setState({
          header: _get(nextProps, 'homePageData[0].response.categoryList.header.top_menu'),
          viewAll: _get(nextProps, 'homePageData[0].response.categoryList.header.top_menu[0].child_data[0]'),
          homePageData: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block'),
          categoryData: _get(nextProps, 'homePageData[0].response.categoryList'),
          featuredProducts: featOriginalData,
          shopCatName: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[1].home_product_block.31.category_name'),
          summerFlowersCatName: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[2].home_category_block.34.category_name'),
          summerFlowersCatData: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[2].home_category_block.34.sub_category'),
          banner: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[0].home_slider_block.image_url'),
          bannerMobile: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[0].home_slider_block.image_url'),
          categoryBlocks: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[3].home_category_block.35.sub_category'),
          popCatName: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[3].home_category_block.35.category_name'),
          
          testimonials: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[4].home_category_block.36.sub_category'),
          clientCatName: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[4].home_category_block.36.category_name'),


          infographics: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[5].home_category_block.37.sub_category'),
          infoCatName: _get(nextProps, 'homePageData[0].response.categoryList.home_page_block[5].home_category_block.37.category_name'),
         // featProd: this.createChildren1({ data }),
          testMonial: this.createChildren2({ monials }),
          pageLoader: false,
        });
      }
    // console.log(mobileInfo);
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
       addressData: this.createChildrenData({ data }),
   });
}

  }

  handleAddAddress = () => {
    this.setState({
      showChangeAddress: false,
    })
   // setTimeout(() => {
      this.props.history.push('/customer/account/address/new');
 // }, 2000);
    
};

handleMoveToCategory = () => {
    this.props.history.push('/catalog/category/view/s/Roses/id/68');
};



  createChildrenData = ({ data }) => Object.keys(data).map(i =>
      
    <div onClick={() => this.addShow(data[i])}>
      <center>
               <div style={{border:'1px solid #8AB77D',height:'165',width:'200px'}}>
                                        
                                        <div style={{fontSize: '14px',fontWeight: '700',border:'1px solid #8AB77D',backgroundColor: 'rgb(245, 245, 245)',textTransform: 'none',padding:'10px'}}>
                                    Address
                                      </div>
                                            <address>
                                                <br />{_get(data[i], 'firstname')}&nbsp;{_get(data[i], 'lastname')}
                                                <br />{_get(data[i], 'company')}<br />{_get(data[i], 'street[0]')}
                                                <br />{_get(data[i], 'city')}, {_get(data[i], 'region.region')}, {_get(data[i], 'postcode')}
                                                <br />{_get(data[i], 'country_id')}<br />
                                            </address>
                                            
                </div>
         </center>
    </div>
  );

  
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

  createChildren = ({ bannerData }) => Object.keys(bannerData).map(i =>
      
    <div>
    <img src={bannerData[i]} alt="#" style={{width:'100%',height:'500px'}} />
    </div>
  );

  createChildren3 = ({ mobileData }) => Object.keys(mobileData).map(i =>
      
    <div>
    <img src={mobileData[i]} alt="#" style={{width:'100%',height:'auto'}} />
    </div>
  );

  createChildren4 = ({ mobileInfo }) => Object.keys(mobileInfo).map(i =>
      
    <div className="pad">
   
            <div className="information_blogs flip-card">
                     
                     <div className="flip-card-inner">
                       <div className="flip-card-front">
                         <div className="imf_icon"><img style={{height:'125px',width:'125px'}} src={mobileInfo[i].gallery_images[0]} alt="#" /></div>
                         <div className="imf_head">
                           <h3>{mobileInfo[i].name}</h3>
                         </div>
                         <div className="imf_cont">
                         <p>{mobileInfo[i].short_description}</p>
                         </div>
                       </div>
                       <div className="flip-card-back">
                         <div className="imf_icon"><img style={{height:'125px',width:'125px'}} src={mobileInfo[i].gallery_images[0]} alt="#" /></div>
                         <div className="imf_cont">
                           <span style={{color:'#000000',fontSize:'18px !important'}}>{mobileInfo[i].name}</span>
                         <p style={{color:'#000000',fontSize:'14px !important'}}></p>
                         </div>
                       </div>
                     </div>
                 </div>
              </div>

    
  );



createChildren1 = ({ data }) => Object.keys(data).map(i =>
      
  <center>
    <div>    

               <div>
                    <a style={{cursor:'pointer'}} href={`/product/${_get(data[i], 'sku')}`}>
                      <Image width={300}
                            height={300}
                          alt={_get(data[i], 'name')} src={_get(data[i], 'image[0]')} resizeMode='contain'/>
                     </a>
                      <br/><br/>
                    <div className="row">
                        
                      <div className="col-md-12"><center><p><a href={`/product/${_get(data[i], 'sku')}`} style={{color:'black'}}>{_get(data[i], 'name')}</a></p></center></div>
                      
                       </div>
                      <div className="row">
                      <div className="col-md-12"><center><p><a href={`/product/${_get(data[i], 'sku')}`} style={{marginLeft:'29px',color:'black'}}>{_get(data[i], 'price')}</a></p></center></div>
                     </div> 
                    </div>
      
           
    </div>
 </center>

);

createMarkup = content => ({ __html: content });

createChildren2 = ({ monials }) => Object.keys(monials).map(i =>
           
  <div className="information_blogs_white_left">
  <div className="imf_icon">
    <img src={_get(monials[i], 'image_url')} style={{borderRadius:'50%',height:'125px',width:'125px'}} alt="#" />
    </div>
  <div className="imf_head">
    <h3  style={{fontFamily:'Quintessential'}}>{_get(monials[i], 'name')}</h3>
  </div>
  <div className="imf_cont">
    <p style={{padding:'20px',color:'black'}}  dangerouslySetInnerHTML={this.createMarkup(monials[i].description)}></p>
  </div>
</div>
 

);     

onSlideChange(e) {
  console.debug('Item`s position during a change: ', e.item)
  console.debug('Slide`s position during a change: ', e.slide)
}

onSlideChanged(e) {
  console.debug('Item`s position after changes: ', e.item)
  console.debug('Slide`s position after changes: ', e.slide)
}

handleSignUp = () => this.setState({ redirectToRegistration: true });

handleListingRedirect = () => this.setState({ redirectToListing: true });

showAddressModal = () => this.setState(prevState => ({
  showChangeAddress: !prevState.showChangeAddress,
}));

changeZipCodeData =() =>
  {
  console.log(this.state.postalCode);
   this.props.setZipcodeData(this.state.postalCode);
   this.setState({
    showChangeAddress: false,
  })
  }
  
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


  getData = (data) => {
    console.log(data);
    this.setState({
           catData: data,
           link: true,
    });
  } 
  
  
  getStoreData = (data) => {
    console.log(data);
    this.setState({
           proData: data,
           proLink: true,
    });
  }  
  




  render() {

    console.log(this.state);
   const { width } = this.state;
     const isMobile = width <= 500;
     //console.log(isMobile);
     if (isMobile) {

       //console.log('mobile');
     }else{
       //console.log('web');
     }
    //const { steps } = this.state.infographics;

    if (this.state.redirectToRegistration) {
        return (
          <Redirect to='/vendor-registration'/>
        );
    }

    if (this.state.redirectToListing) {
      return (
        <Redirect to='/listing-products'/>
      );
  }

  
if (this.state.proLink) {
   this.setState({
    proLink: false,
  });
  return (
    <Redirect push to={{
      pathname: '/product/'+this.state.proData.sku
  }} />
   );


}

  if (this.state.link) {
    this.setState({
      link: false,
    });
    return (
      <Redirect push to={{
        pathname: '/catalog/category/view/s/'+this.state.catData.name+'/id/'+this.state.catData.id ,
        state: {  catName: this.state.catData.name, catDesc: this.state.catData.short_description, catImage: false },
    }} />
     );

  
  }

    return (
      <div className="container">
        <div className='row' style={{marginTop:'130px'}}>
          <div className="col-md-3 col-sm-4 col-xs-12">
          <center>
                   <div style={{backgroundColor:'#eaeaea',height:'400px',width:'250px'}}>
                              <br/><br/>
                          
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer',color:'rgb(138, 183, 125)'}} onClick={() => this.getMyAccount()}>LOGIN</a></p><br/>
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} href="/vendor/Location">VENDOR LOCATION</a></p><br/>
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>EARNINGS</a></p><br/>
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>PROFILE UPDATE</a></p><br/>
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>MY AVAILABILITY</a></p><br/>
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>LABEL</a></p><br/>
                              <p style={{color:'#000000'}}><a style={{ cursor:'pointer'}} onClick={() => this.getOrderData()}>MY INVENTORY</a></p><br/>
                          </div>
                       </center>
          </div>
           <div className="col-md-9 col-sm-8 col-xs-12">
            <p style={{color:'black'}}>New Customers</p>
            <br/>
            <p>By creating an account with our store you will able to update your inventory.</p>
            <br/>
            <p style={{color:'black'}}>Registered Customers</p>
            <br/>
            <p>If you an account with us, please login in.</p>
            <br/>

            <div class="form-group">
                    <div className="row">
                    <div class="col-xs-5">
                      <div class="input-group">
                          <span class="input-group-addon transparent"><span class="glyphicon glyphicon-user"></span></span>
                          <input class="form-control left-border-none" placeholder="UserName" type="text"  name="loginEmail" 
                                  onChange={this.handleInputChange} id="loginEmail"/>
                      </div>
                    </div>
                            <div className="col-md-3">
                              <span className={`${ this.state.errors.loginEmail }`? 'blink' : ''}>{this.state.errors.loginEmail}</span>
                              </div>
                    </div>
              <br/>
                  <div className="row"> 
                    <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon transparent"><span class="glyphicon glyphicon-lock"></span></span>
                        <input class="form-control left-border-none" placeholder="Password" type="password" id="loginPassword" name="loginPassword" onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="col-md-3" style={{marginTop:'20px'}}>
                      <span className={`${ this.state.errors.loginPassword }`? 'blink' : ''}>{this.state.errors.loginPassword}</span>
                  </div>
                  </div>


            </div>

            <div className="field">
                                {this.state.loginLoaderData === false ? 
                                        <input onClick={this.loginclickFun} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px'}} className="field_bt" value="Login"/>
                                     
                                 :
                                    <img src={logLoader} alt="#" style={{height:'80px',width:'80px'}} />
                               
                                 }
                                    </div>

            </div>
           


              
       </div>
       <br/>
       <br/>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getHomePage: () => dispatch(fetchHomePage()),
  setZipcodeData: data => dispatch(setZipcodeData(data)),
  getLogin: data => dispatch(vendorLoginData(data)),
});

const mapStateToProps = (state) => {
  const {
    loginReducer, 
    allAddressReducer, 
    vendorArtistsReducer,
  } = state;

  const {   
    vendorLogin,
    vendor,
    vendor_types,
    shipping_methods,
    cost_channels,
    loginMessage,
    loginStatus,
    vendorId,
} = vendorArtistsReducer || [];

  const {
    homePageData,
    homePage,
    categoryData,
    banner,
    infographics,
    categoryBlocks,
    testimonials,
    featuredProducts,
    zipcode,
    apiToken,
  } = loginReducer || [];

  const {
    allAddressData,
    shippingAddressData,
    billingAddressData,
} = allAddressReducer || [];

  return {
    homePageData,
    homePage,
    categoryData,
    banner,
    infographics,
    categoryBlocks,
    testimonials,
    featuredProducts,
    zipcode,
    apiToken,
    allAddressData,
    shippingAddressData,
    billingAddressData,
    vendorLogin,
    vendor,
    vendor_types,
    shipping_methods,
    cost_channels,
    loginMessage,
    loginStatus,
    vendorId,
  }

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(HomeContainer));
