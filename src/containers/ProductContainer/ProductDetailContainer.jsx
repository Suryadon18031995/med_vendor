/* eslint-disable quotes */
/* eslint-disable quote-props */
import React from 'react';
import Redirect from 'react-router/Redirect';
//import SweetAlert from 'react-bootstrap-sweetalert';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import _endsWith from 'lodash/endsWith';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'react-image-resizer';
import moment from 'moment';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import HrCommon from '../../components/Common/HrCommon.jsx';
import ProductDetailComponent from '../../components/ProductComponent/ProductDetailComponent.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import {
  fetchProductDetails,
  fetchRelatedProducts,
  fetchUpsellingProducts,
  postReviews,
  fetchProductDates,
  fetchReviewData,
} from '../../actions/products';
import { mapAddToCartApiData } from '../../utils/commonMapper';
import { postProductAddToCartData, clearCartData, flushCartViewData , fetchQuoteId , updateCartValue, postAddToCartData ,fetchCartItemsByCustomer, postGuestAddToCartData , getGuestCartList, fetchGetCartData } from '../../actions/cart';
// import { receiveShowLoginModalData } from '../../actions/login';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
// import { download } from '../../actions/download';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId,setZipcodeData } from '../../actions/login';
// import jsPDF from 'jspdf';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import updateRecentViewsData from '../../actions/recentViews';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ReviewComponent from '../../components/ProductComponent/reviewComponent.jsx';
import CustomerReviewComponent from '../../components/ProductComponent/CustomerReviewComponent.jsx';
import { fetchProductVendorReviews } from '../../actions/vendorReviews';
import { KeyboardArrowLeft } from 'material-ui-icons';
import lazyLoader from '../../assets/img/loader.gif';

class ProductDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.custrev = React.createRef();
    this.toggleImgModalFn = this.toggleImgModalFn.bind(this);
    this.state = {
      handleProductDetailClick: false,
      listData: {},
      productDetails: [],
      moreData: [], 
      productId: this.props.match.params && this.props.match.params.id && this.props.match.params.id.split('-').pop().split('.').shift(), // this.props.location.hash && this.props.location.hash.substring(1),
      showMoreDetails: false,
      submitReviewAlert: false,
      submitTagAlert: false,
      selectedDate: undefined,
      dispalyMoreAvails: false,
      totalPriceToPay: '',
      disableCartBtn: 'disableBtn',
      showAlertDiv: false,
      rating: 0,
      alertData: false,
      fields: {},
      // blinkText: {},
      isAuthenticated: false,
      errors: {},
      showChangeStoreModal: false,
      storeName: this.props.storeName,
      showImageModal: false,
      showReviewModal: false,
      productImageUrl: undefined,
      currentIndex: 0,
      itemsInSlide: 1,
      currentIndex1: 0,
      itemsInSlide1: 1,
      breadCrumbsList: [
        {
          link: '/',
          name: 'HOME',
        },
        {
          link: undefined,
          name: 'BUY ARTIFACTS',
        },
      ],
      currentUrl: undefined,
      freshdeal: false,
      responsive: { 480: { items: 2 }, 760: { items: 2 }, 900: { items: 3 } },
      productReviewData: [],
      testData: [],
      blinkText: '',
      redirectToVendorRevPage: false,
      vendorId: '',
      vendorName: '',
      children: undefined,
      upsellChildrens: undefined,
      quantity: undefined,
      redirectNotFound: false,
      showCustReview: false,
      showData:3,
      valueData: 1,
      reviewShow: true,
      dataToShow: undefined,
      imageSrc:'',
      cartShow: false,
      cartData: [],
      showCartValue: false,
      showGuestCartValue: false,
      startDate: undefined,
      dateObjectArray: [],
      vendorDetails: [],
      reviewPostLoader: false,
      listReviewLoader: false,
      showProdDetailLoader: true,
      minDateShow:'',
      maxDateShow:'',
      showChangeAddress: false,
      createChildren2: undefined,
      addressData: [],  
      cartLoader: false,
      vendorData: undefined,
      vendorStartDate: undefined,
      pageLoader: true,
      proLink: false,
      proData: undefined,
    };
  }

  handleDateValueChange = date => {
    this.setState({
      startDate: date
    });
    console.log(date);
    ///let dateData=date.getFullYear() +"-0"+parseInt(date.getMonth()+1) + "-"+date.getDate() ;
    
    //console.log(dateData);
    //Object.entries(this.state.vendorDetails).map(([key, val]) => {
     
      //console.log(key);
      //console.log(dateData);
      //if(key === dateData)
     // {
       // console.log(val);
     // }
    //});
    
  };
  dateChanged = d =>{
    console.log(d);
    //console.log();
    this.setState({
      startDate: d
   });
    const NewDate = moment(d).format('YYYY-MM-DD');
    console.log(NewDate);
    this.setState({
      vendorStartDate: NewDate
    });
   
    console.log(this.state);
    console.log(this.state.vendorDetails);
    Object.entries(this.state.vendorDetails).map(([key, val]) => {
     
      console.log(key);
      console.log(NewDate);
      if(key === NewDate)
      {
        console.log(val);
        this.setState({
          vendorData: val
        });
      }
     });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    console.log(fields);
    console.log(this.state.rating);
    if (!fields.review_title) {
      formIsValid = false;
      errors.review_title = "This is a required field.";
    }
    if (!fields.review_details) {
      formIsValid = false;
      errors.review_details = "This is a required field.";
    }
    if (this.state.rating == 0) {
      formIsValid = false;
      errors.rating = "This is a required field.";
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleChange = (event) => {
    console.log(event.target.value);
    const { fields } = this.state;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
    console.log(this.state.fields);
  }

  IncrementItem = () => {
    console.log('surya');
    this.setState({ valueData: this.state.valueData + 1 });
    console.log(this.state.valueData);
  }
  DecreaseItem = () => {
    console.log();
    this.setState({ valueData: this.state.valueData - 1 });
    console.log(this.state.valueData);
  }

  addProductToCart = () => {
    console.log(this.state.vendorStartDate);
    console.log(this.state.vendorData);
    console.log(this.state.vendorDetails);
    console.log(this.state.startDate);
    const data = [];
    this.setState({
      cartLoader: true
    })
    if(this.props.apiToken !== '')
    {
     
    
    const reqBody1 = ({
      vendor: this.state.vendorData.vendor,
      vendor_farm: this.state.vendorData.vendor_farm,
      delivery_date: this.state.vendorStartDate,
      pickup_date: this.state.vendorData.pickup_date,
      shipping_method: this.state.vendorData.shipping_front_name,
      time_slot_from: '2:00',
      time_slot_to:'5:00',
    });
    const reqBody = ({
      sku: this.state.productDetails.sku,
      qty: this.state.valueData,
      custom_attributes: reqBody1,
    });
    console.log(reqBody);
    this.props.addCartData({ cartItem: reqBody } , this.props.apiToken);

    this.setState({
      valueData: 1,
      showCartValue: true,
    });
  } 
  else 
  {
     
    console.log(this.props.mask_id); 
    const reqBody1 = ({
      vendor: this.state.vendorData.vendor,
      vendor_farm: this.state.vendorData.vendor_farm,
      delivery_date: this.state.vendorStartDate,
      pickup_date: this.state.vendorData.pickup_date,
      shipping_method: this.state.vendorData.shipping_front_name,
      time_slot_from: '2:00',
      time_slot_to:'5:00',
    });
    const reqBody = ({
      mask_id: this.props.maskId === undefined ? '' : this.props.maskId,
      sku: this.state.productDetails.sku,
      qty: this.state.valueData,
      custom_attributes: reqBody1,
    });
    console.log(reqBody);
    this.props.guestAddToCart({ cartItem: reqBody });

    this.setState({
      valueData: 1,
      showGuestCartValue: true,
    });
  } 
  }

  submitReviews = () => {
    console.log(this.state.fields);
    console.log(this.handleValidation());
    if (_isEmpty(this.props.apiToken)) {
      //this.props.showLoginModal({ show: true });
    } else if (this.handleValidation()) {
      console.log('test')
      const reqBody = ({
        title: this.state.fields.review_title,
        detail: this.state.fields.review_details,
        nickname: this.props.userFirstName,
        customer_id: this.props.custId,
        stores:[4],
      ratings: [
      {
        rating_name: "Value",
        value: _get(this.state, 'rating'),
      }
    ],
    review_entity: "product",
    review_status: 2,
    entity_pk_value: this.state.productDetails.id
      });
      console.log(reqBody);
      this.setState({
         rating: 0,
         reviewPostLoader: true,
       });
      this.props.submitReviewsData({ review : reqBody}, this.props.apiToken);
    }
    
    

  }

 

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  }

 // showReviewModal = () => this.setState(prevState => 
 // ({
   // showReview: !prevState.showReview,
 // }));

 showReviewModal = () => {
   console.log('test');
  this.setState({
    showData: !this.state.showData,
  });
}


  showLoginPopup = () => {
    this.props.showLoginModal({ show: true });
  }

  toggleMoreDetail = () => {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails,
      dispalyMoreAvails: false,
    });
  }

  toggleMoreAvail = () => {
    this.setState({
      dispalyMoreAvails: !this.state.dispalyMoreAvails,
      showMoreDetails: false,
    });
  }

  resetMoreDetails = (event) => {
    const dataTempAvail = _filter(this.state.productDetails.delivery, ['delivery_date', event])[0];
    this.setState({
      dataToShow: { ...this.state.dataToShow, ...dataTempAvail, newKey: event },
    });
  }

  ProductSwatch = (event) => {
    const datesArr = {};
    const dataTempAvail = _get(this.state.productDetails, `more_avail.${[event]}`);
    dataTempAvail.forEach((o) => {
      datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
    });
    this.setState({
      dataToShow: { ...this.state.productDetails.info[event], ...dataTempAvail[0], newKey: event },
      datesArr,
    });
  }

  toggleImgModalFn = (url, length, ind) => {
    this.setState({
      showImageModal: !(this.state.showImageModal),
      productImageUrl: { url, length, ind },
    });
  }


  toggleReviewModalFn = () => {
    console.log('test ee');
    this.setState({
      showReviewModal: !(this.state.showReviewModal),
    });
  }

  handleAddToWishlist = () => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId: this.state.productId,
    });
  }

  handleAddToFavorites = () => {
    this.props.addToFavorites({
      apiToken: this.props.apiToken,
      productId: this.state.productId,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  }

  focusReview = (d) => {
    this.setState({ showData : d });
    this.setState({ reviewShow : false });
    
  }

  vendorRatingsHover = (vendorId) => {
    this.props.getProductReviews({ vendorId });
  }

  componentDidMount() {
    //var dateString = 'Wed Mar 19 00:30:00 IST 1997';
    //var date1 = new Date(dateString.replace('IST', ''));

    //console.log((new Date(dateString), "dd/MM/yyyy"));

    //let day = date1.getDate();
    //let month = date1.getMonth()+1;
    //let year = date1.getFullYear();

    //console.log(year+"/"+month+"/"+day);
    //toast.success("You have downloaded   GB file Successfully!");
    //const date = new Date();
    //localStorage.removeItem("cart"); 
     // add a day
     //console.log( new Date());
     //moment(from, "DD-MM-YYYY").toDate()
    //date.setDate(date.getDate(),4);
    //console.log(date);
    //let dateData=date.getFullYear() +"-"+parseInt(date.getMonth()+1) + "-"+date.getDate() ;
    
    //console.log(dateData);
    //const newDate = moment(date, 'dd/MM/yyyy');
    //console.log(newDate);  
    //console.log(newDate) 
   // this.setState({
     //  startDate: new Date(),
   // });
    console.log(this.state.productId);
    //console.log(this.state.startDate);
  
    this.props.getProductDetails(this.state.productId);
   
      this.props.getRelatedProducts(this.state.productId);

      this.props.getUpsellProducts(this.state.productId);
      this.props.getDates(this.state.productId,'08003');
      if(this.props.apiToken !== '')
      {
        this.props.getCart(this.props.apiToken);
      } 
      // this.props.getReview({
      //  apiToken: '7069a92e71dfe2b0b4733b290c02c66f',
       // productId: this.state.productId,
      //})
      

      
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
    let data2 = [];

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
         addressData: this.createChildren2({ data }),
     });
 }
    if (!_isEmpty(nextProps.postPRSuccess) && this.state.reviewPostLoader) {
      console.log(nextProps.postPRSuccess);
      toast.success("Your review has been accepted for moderation.");
       this.setState({
           reviewPostLoader: false,
           showReviewModal: false,
       });
     }
     if (!_isEmpty(nextProps.productDetailsData) && this.state.showProdDetailLoader) {
       console.log(nextProps.productDetailsData);
       const data= nextProps.productDetailsData.items[0];
       const data1= nextProps.productDetailsData.items[0].images[0];
        this.setState({
          productDetails: data,
          imageSrc: data1,
          listReviewLoader: true,
          showProdDetailLoader: false,
          pageLoader: false,
        });
       this.props.getReview(nextProps.productDetailsData.items[0].id);
      }

      if (!_isEmpty(nextProps.reviewData) && this.state.listReviewLoader) {
         console.log(nextProps.reviewData);
         this.setState({
           listReviewLoader: false,
           productReviewData: nextProps.reviewData
         });
       }

      if (!_isEmpty(nextProps.productDates)) {
       if(nextProps.productDates[0].response.status === true)
       {
         for(var i=0;i<nextProps.productDates[0].response.delivery_dates.length;i++)
         {
            this.setState({
              startDate: moment(nextProps.productDates[0].response.delivery_dates[0])
            });
            data2.push(moment(nextProps.productDates[0].response.delivery_dates[i]));
         }
         //console.log(nextProps.productDates[0].response.delivery_dates[0]);
         if(nextProps.productDates[0].response.delivery_details.length !== 0)
         {
            Object.entries(nextProps.productDates[0].response.delivery_details).map(([key, val]) => {
        
              console.log(key);
              console.log(nextProps.productDates[0].response.delivery_dates[0]);
              if(key === nextProps.productDates[0].response.delivery_dates[0])
              {
                console.log(val);
                this.setState({
                  vendorData: val
                });
              }
            });
        }

         this.setState({
           vendorStartDate: nextProps.productDates[0].response.delivery_dates[0],
           minDateShow: nextProps.productDates[0].response.delivery_dates[0],
           maxDateShow:  nextProps.productDates[0].response.delivery_dates[nextProps.productDates[0].response.delivery_dates.length - 1],
           dateObjectArray: data2,
           vendorDetails: nextProps.productDates[0].response.delivery_details
         })
       }
       }


      if (!_isEmpty(nextProps.addCartResponseDetails) && this.state.showCartValue) {
        console.log(nextProps.addCartResponseDetails);
        this.props.getCart(this.props.apiToken);
        toast.success("Product Added to cart");
         this.setState({
           showCartValue: false,
           cartLoader: false,
         });
       }
       if (!_isEmpty(nextProps.guestAddCartResponse) && this.state.showGuestCartValue) {
        console.log(nextProps.guestAddCartResponse);
       //this.props.getData(this.props.apiToken);
       console.log(this.props.maskId);
        this.props.getGuestList(nextProps.guestAddCartResponse[0].mask_id);
        console.log(nextProps.guestAddCartResponse[0].mask_id);
        toast.success("Product Added to cart");
         this.setState({
          showGuestCartValue: false,
          cartLoader: false
         });
       }

       
     
    
    if (!_isEmpty(nextProps.relatedProductsData)) {
      const relatedProducts = nextProps.relatedProductsData;
      console.log(relatedProducts);
      if(relatedProducts !== undefined)
      {
      this.setState({
        children: this.createChildren({ relatedProducts }),
      });
       }
    }

    if (!_isEmpty(nextProps.upsellProductsData)) {
      const upsellProducts = nextProps.upsellProductsData;
      if (upsellProducts !== undefined) {
        this.setState({
          upsellChildrens: this.createUpsellChildrens({ upsellProducts }),
        });
      }
    }


    

  }

  createChildren2 = ({ data }) => Object.keys(data).map(i =>
      
    <div onClick={() => this.addShow(data[i])}>
      <center>
               <div style={{border:'1px solid #8AB77D',height:'175',width:'200px'}}>
                                        
                                        <div style={{fontSize: '14px',fontWeight: '700',border:'1px solid #8AB77D',backgroundColor: 'rgb(245, 245, 245)',textTransform: 'none',padding:'10px'}}>
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
  

  handleRedirectClick = () => {
    this.setState({
      handleProductDetailClick: true,
      showData: true,
    });
  }

  handleShowChangeStore = () => {
    this.setState({
      showChangeStoreModal: true,
    });
  }
  handleCloseModal = () => {
    this.setState({
      showChangeStoreModal: false,
    });
  };
  // carousel settings
  UNSAFE_componentWillMount() {
    this.setState({
      children: [],

      // activeItemIndex: 0,
    });

    // setTimeout(() => {
    //   this.setState({
    //     children: this.createChildren(20),
    //   });
    // }, 100);
    if (this.state.productId && this.props.match && !isNaN(this.state.productId)) {
      const pdtUrl = this.props.match.params && this.props.match.params.id;
      if (pdtUrl && _endsWith(pdtUrl, '.html')) {
        this.props.getRelatedProducts({
          "product_id": this.state.productId,
        });
        this.props.getUpsellProducts({
          "productId": this.state.productId,
          "apiToken": _get(this.props, 'apiToken'),
        });
      } else {
        this.setState({
          redirectNotFound: true,
        });
      }
    }
  }

  reloadProductsData = (data) => {
    this.setState({
      productId: data,
    }, () => {
      this.props.getProductDetails({
        "currencyCode": _get(this.props, 'currencyCode'),
        "apiToken": _get(this.props, 'apiToken'),
        "storeId": _get(this.props, 'storeId'),
        "pageNo": 1,
        "productId": this.state.productId,
      });
      this.props.getRelatedProducts({
        "productId": this.state.productId,
      });
      this.props.getUpsellProducts({
        "productId": this.state.productId,
        "apiToken": _get(this.props, 'apiToken'),
      });
    });
  }

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide;
    this.setState({ currentIndex })
  }
 
  slideNextPage = () => {
    const {
      itemsInSlide,
      children: { length },
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length
 
    this.setState({ currentIndex })
  }

  slidePrevPage1 = () => {
    const currentIndex1 = this.state.currentIndex1 - this.state.itemsInSlide;
    this.setState({ currentIndex1 })
  }
 
  slideNextPage1 = () => {
    const {
      itemsInSlide,
      upsellChildrens: { length },
    } = this.state
    let currentIndex1 = this.state.currentIndex1 + itemsInSlide
    if (currentIndex1 > length) currentIndex1 = length
 
    this.setState({ currentIndex1 })
  }


  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }
  
  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }

  // createChildren = n => _range(n).map(i => <div key={i} style={{
  //   height: 200, background: '#309087', width: 200, borderRadius: '50%', textAlign: 'center', verticalAlign: 'middle',
  // }}>{i}</div>);
  createChildren = ({ relatedProducts }) => Object.keys(relatedProducts).map(i =>
      
           <center>
                    <div style={{height:'400px',width:'300px',wmargin:'15px'}}>
                        <div style={{height:'285px',width:'300px',border:'1px solid #eaeaea'}}>  
                            <a href={`/product/${_get(relatedProducts[i], 'sku')}`}>
                                    <Image width={232}
                                        height={280}
                                        alt={_get(relatedProducts[i], 'image')} src={_get(relatedProducts[i], 'image')} resizeMode='contain'/>
                                
                            </a> 
                         </div>      
                            <br/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <center>
                                        <a href={`/product/${_get(relatedProducts[i], 'sku')}`} style={{textTransform:'uppercase',color:'black'}}>{_get(relatedProducts[i], 'name')}</a>
                                    </center>
                                 </div> 
                            </div>
                            <div className="row">
                                <center>
                                 <div className="col-sm-12">
                                         <a style={{textTransform:'uppercase',color:'black'}}>${_get(relatedProducts[i], 'price')}</a>
                                 </div>   
                                 </center>
                            </div> 
                            
                              
                       
                        </div>
                    </center>
    );

  createUpsellChildrens = ({ upsellProducts }) => Object.keys(upsellProducts).map(i =>
    
    <center>
             <div style={{height:'400px',width:'300px',wmargin:'15px'}}>
                     <div style={{height:'285px',width:'300px',border:'1px solid #eaeaea'}}>  
                            <a href={`/product/${_get(upsellProducts[i], 'sku')}`}>
                                    <Image width={232}
                                        height={280}
                                        alt={_get(upsellProducts[i], 'image')} src={_get(upsellProducts[i], 'image')} resizeMode='contain'/>
                                
                            </a> 
                         </div> 
                     <br/>
                     <div className="row">
                         <div className="col-sm-12">
                             <center>
                                 <a href={`/product/${_get(upsellProducts[i], 'sku')}`} style={{textTransform:'uppercase',color:'black'}}>{_get(upsellProducts[i], 'name')}</a>
                             </center>
                          </div> 
                     </div>
                     <div className="row">
                         <center>
                          <div className="col-sm-12">
                                  <a style={{textTransform:'uppercase',color:'black'}}>${_get(upsellProducts[i], 'price')}</a>
                          </div>   
                          </center>
                     </div> 
                     
                       
                
                 </div>
             </center>



    );

  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      const x = _find(_get(this.props.loginData, '0.result.store_list', []), { 'store_id': event.target.value });
      const selectedStoreName = _get(x, 'store_name');
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.setStoreId({
        storeId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      this.props.getProductDetails({
        "currencyCode": _get(this.props, 'currencyCode'),
        "apiToken": _get(this.props, 'apiToken'),
        "storeId": this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        "pageNo": 1,
        "productId": this.state.productId,
      });
    }
  };
  // input validation

  handleInuputChange = (event, deliData) => {

    let totalTemp = 0;
    let totalPriceToPay, inputQty, blinkText;

    inputQty = event.target.value;

    // const { blinkText, totalAmount, inputValid } = this.state;

    let disableCartBtn = 'disableBtn';
    const flag = inputQty >= _get(deliData, 'floorallowed');
    if (!flag) {
      totalTemp = (inputQty) * _get(deliData, 'total_price');
      const reminder = inputQty % _get(deliData, 'qty_per_box');

      totalPriceToPay = (inputQty > 0 && reminder === 0) ? `Total amount payable $${totalTemp.toFixed(2)}` : '';
      disableCartBtn = (inputQty > 0 && reminder === 0) ? '' : 'disableBtn';
      blinkText = (inputQty > 0 && reminder === 0) ? '' : ' blink';
    }
    // if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
    //   blinkText[_get(this.props, 'productId')] = 'blink';
    // } else {
    //   blinkText[_get(this.props, 'productId')] = '';
    // }

    // totalAmount[_get(this.props, 'productId')] = totalTemp;
    this.setState({
      unitQty: inputQty,
      totalAmount: totalTemp,
      // totalAmount,
      showMaxQtyAlert: flag,
      totalPriceToPay,
      disableCartBtn,
      blinkText,
      quantity: inputQty,
    });
  }
  // end of input validation

  
  // handle tags related fn
  handleTagInputChange = (event) => {
    this.setState({
      tagsInput: event.target.value,
    });
  }

  handleDataDate = (event) => {
    console.log(event.target.value);
    this.setState({
      startDate: event.target.value,
    });
  }

  

  addTags = () => {
    const reqBody = ({
      productId: this.state.productId,
      apiToken: _get(this.props, 'apiToken'),
      tags: this.state.tagsInput,
    });
    this.props.addTagsData(reqBody);
    this.setState({
      submitTagAlert: true,
    });
  }

  handleVendorReviewClick = (vendorId, vendorName) => {
    this.setState({
      redirectToVendorRevPage: true,
      vendorId,
      vendorName,
    });
  }

  handleProdReviewClick = () => {
    window.scrollTo(0, 1300);
  }

  handleChangeData = () => {
    console.log('test');
  }


  handleMouseEnter = (data) => {
    console.log('Image', data);
    this.setState({
       imageSrc: data
       });
 }

 handleMouseMove = e => {
  const { left, top, width, height } = e.target.getBoundingClientRect()
  const x = (e.pageX - left) / width * 100
  const y = (e.pageY - top) / height * 100
  this.setState({ backgroundPosition: `${x}% ${y}%` })
}

showAddressModal = () => this.setState(prevState => ({
  showChangeAddress: !prevState.showChangeAddress,
}));


handleInputChange1 = (event) => {
  this.setState({
    [event.target.id]: event.target.value,
  });
};


changeZipCodeData =() =>
  {
  console.log(this.state.postalCode);
   this.props.setZipcodeData(this.state.postalCode);
   this.setState({
    showChangeAddress: false,
  })
  }

   
  handleAddAddress = () => {
    this.setState({
      showChangeAddress: false,
    })
   // setTimeout(() => {
      this.props.history.push('/customer/account/address/new');
 // }, 2000);
    
};
isWeekday = date => {
  console.log(date);
   const day = getDay(date);
  return day !== 0 && day !== 6;
};

getStoreData = (data) => {
  console.log(data);
  this.setState({
         proData: data,
         proLink: true,
  });
}  


  render() {
    if (this.state.pageLoader) {
      return (
        <div id="cover-spin">
          <center>
            <img src={ lazyLoader } style={{height:'126px',marginTop:'300px'}} alt="lazy-loader"/>
            </center>  
        </div>
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
    console.log(this.state);
    return (
      <div>
          <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
            <section>
              <div className="text-center" style={{marginTop: '110px'}}>
              </div>
            </section>
     {<ErrorBoundary>
          <ProductDetailComponent
            slidePrevPage={this.slidePrevPage}
            slideNextPage={this.slideNextPage}
            slidePrevPage1={this.slidePrevPage1}
            slideNextPage1={this.slideNextPage1}
            currentIndex={this.state.currentIndex}
            currentIndex1={this.state.currentIndex1}
            productDetails={this.state.productDetails}
            children={this.state.children}
            responsive={this.state.responsive}
            upsellChildrens={this.state.upsellChildrens}
            moreData={this.state.moreData}
            toggleReviewModalFn={this.toggleReviewModalFn}
            showReviewModal={this.state.showReviewModal}
            handleMouseEnter={this.handleMouseEnter}
            imageSrc={this.state.imageSrc}
            onMouseMove={this.onMouseMove}
            rating={this.state.rating}
            errors={this.state.errors}
            valueData={this.state.valueData}
            IncreaseItem={this.IncrementItem}
            DecreaseItem={this.DecreaseItem}
            addProductToCart={this.addProductToCart}
            onSlideChange={this.onSlideChange}
            onSlideChanged={this.onSlideChanged}
            changeRating={this.changeRating}
            rating={this.state.rating}
            submitReviews={this.submitReviews}
            handleDateValueChange={this.handleDateValueChange}
            startDate={this.state.startDate}
            userFirstName={this.props.userFirstName}
            zipCode={this.props.zipcode}
            handleChangeData={this.handleChangeData}
            dateObjectArray={this.state.dateObjectArray}
            vendorDetails={this.state.vendorDetails}
            handleChange={this.handleChange}
            reviewPostLoader={this.state.reviewPostLoader}
            productReviewData={this.state.productReviewData}
            showData={this.state.showData}
            focusReview={this.focusReview}
            reviewShow={this.state.reviewShow}
            handleDataDate={this.handleDataDate}
            minDateShow={this.state.minDateShow}
            maxDateShow={this.state.maxDateShow}
            showChangeAddress={this.state.showChangeAddress}
            apiToken={this.props.apiToken}
            handleInputChange1={this.handleInputChange1}
            changeZipCodeData={this.changeZipCodeData}
            addressData={this.state.addressData}
            handleAddAddress={this.handleAddAddress}
            addressData={this.state.addressData}
            responsive={this.state.responsive}
            showAddressModal={this.showAddressModal}
            disableWeekends={this.disableWeekends}
            cartLoader={this.state.cartLoader}
            isWeekday={this.isWeekday}
            dateChanged={this.dateChanged}
          />         
        </ErrorBoundary>}
        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProductDetails: data => dispatch(fetchProductDetails(data)), 
  getRelatedProducts: data => dispatch(fetchRelatedProducts(data)),
  getUpsellProducts: data => dispatch(fetchUpsellingProducts(data)),
  getQuoteId: data => dispatch(fetchQuoteId(data)),
  getCartData: data => dispatch(updateCartValue(data)),
  addCartData: (data,data1) => dispatch(postAddToCartData(data,data1)),
  getData: data => dispatch(fetchCartItemsByCustomer(data)),
  submitReviewsData: (data,data1) => dispatch(postReviews(data,data1)),
  guestAddToCart: data => dispatch(postGuestAddToCartData(data)),
  getGuestList: data => dispatch(getGuestCartList(data)),
  getCart: data => dispatch(fetchGetCartData(data)),
  getDates: data => dispatch(fetchProductDates(data)),
  getReview: data => dispatch(fetchReviewData(data)),
  setZipcodeData: data => dispatch(setZipcodeData(data)),  
});

const mapStateToProps = (state) => {
  const {
      productDetailReducer,loginReducer,cartReducer,allAddressReducer,
  } = state;
 
  const {
    productDetailsData,
    relatedProductsData,
    upsellProductsData,
    productDates,
    postPRSuccess,
    reviewData,
    error: PDTerror,
  } = productDetailReducer || [];

  const {
    apiToken,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    zipcode,
  } = loginReducer || [];

  const {
    cartId,
    cartData,
    addCartResponseDetails,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
  } = cartReducer || [];

  
  const {
    allAddressData,
    shippingAddressData,
    billingAddressData,
} = allAddressReducer || [];

  const error = !_isEmpty(PDTerror) || undefined;

  return {    
    productDetailsData,
    relatedProductsData,
    upsellProductsData,
    error,
    apiToken,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    cartId,
    cartData,
    addCartResponseDetails,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    productDates,
    zipcode,
    postPRSuccess,
    reviewData,
    allAddressData,
    shippingAddressData,
    billingAddressData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ProductDetailContainer));
