import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import moment from 'moment';
// import ReactGA from 'react-ga';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
import _minBy from 'lodash/minBy';
import _maxBy from 'lodash/maxBy';
import Redirect from 'react-router/Redirect';
import Resizer from 'react-image-file-resizer';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListingComponent from '../../components/BKMComponent/ListingComponent.jsx';
import FilterComponent from '../../components/BKMComponent/FilterComponent.jsx';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import HrCommon from '../../components/Common/HrCommon.jsx';
import listingBanner from '../../assets/img/dw.jpg';
import {
  fetchProductListing,
  fetchBKMListingData,
  fetchFilterCategoryData,
} from '../../actions/bkm_listing';
import { postAddToCartData, setCartTypeData, flushCartViewData, clearCartData , fetchFilterData} from '../../actions/cart';
import {
  mapAddToCartApiData,
  mapProductSearchData,
} from '../../utils/commonMapper';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import { compareAndSortDates } from '../../helpers/commonUtil';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import lazyLoader from '../../assets/images/lazy-loader.gif';
import profilePic from '../../assets/images/7.png';
import funkarImage from '../../assets/images/8.png';
import { fetchProductReviews } from '../../actions/products';
import { fetchProductVendorReviews } from '../../actions/vendorReviews';
import { sortDeliveryDates } from '../../utils/dateUtil';
import fullLoader from '../../assets/img/loader.gif';

class ShopByFlowersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitQty: {},
      totalAmount: {},
      inputValid: {},
      showMaxQtyAlert: false,
      productId: undefined,
      url: undefined,
      listData: [],
      productDetails: [],
      prodTemp:[],
      shippingMethodsArrData: [],
      deliveryDetails: [],
      displayData: [],
      availId: undefined,
      pageNo: 1,
      totalProductCount: undefined,
      showAscendSort: true,
      filtersEnabled: false,
      enableClearAll: false,
      searchStartDate: undefined,
      searchEndDate: undefined,
      showChangeStoreModal: false,
      showMoreDetail: {},
      dateObjectArray: [],
      viewType: 'grid',
      filters: {},
      loginFlag: !_isEmpty(this.props.apiToken),
      sortValue: 'index',
      selectedStoreId: undefined,
      selectedStoreName: undefined,
      categoryFilterData: [],
      categoryFilterDataTemp: [],
      colorsFilterData: [],
      colorsFilterDataTemp: [],
      farmsFilterData: [],
      farmsFilterDataTemp: [],
      stateCityFilterData: [],
      stateCityFilterDataTemp: [],
      boxTypeFilterData: [],
      boxTypeFilterDataTemp: [],
      varietyFilterData: [],
      varietyFilterDataTemp: [],
      uomFilterData: [],
      uomFilterDataTemp: [],
      lengthFilterData: [],
      lengthFilterDataTemp: [],
      gradeFilterData: [],
      gradeFilterDataTemp: [],
      priceFilterData: [],
      priceFilterDataTemp: [],
      blinkText: {},
      applyFilter: false,
      category: [],
      color: [],
      farm: [],
      location: [],
      boxType: [],
      variety: [],
      uom: [],
      length: [],
      grade: [],
      methodUpdated: false,
      method: '?',
      showMoreAvail: {},
      moreAvail: {},
      tabKey: 'info',
      farmInfo: undefined,
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
      // cartType: _get(this.props, 'cartType.cartType') ? _get(this.props, 'cartType.cartType') : undefined,
      prevBkmData: {},      
      categoryId: this.props.match.params && this.props.match.params.id && this.props.match.params.id.split('-').pop().split('.').shift(), // this.props.location.hash && this.props.location.hash.substring(1),
      totalFilterValues: undefined,
      occasionFilterDataTemp: [],
      occasionFilterData: [],
      flowerFilterDataTemp: [] ,
      flowerFilterData: [],
      selectColor: '',
      selectFlower: '',
      selectOccasion: '',
      selectPrice: '',
      pageLoader: true,
      proLink: false,
      proData: undefined,
      resultSet:[{
        field:'category_id',
        value: 64,
        conditionType: 'eq'
      },
      {
        field:'color',
        value: 64,
        conditionType: 'eq'
      },
      {
        field:'flower_type',
        value: 64,
        conditionType: 'eq'
      },
      {
        field:'occassion',
        value: 64,
        conditionType: 'eq'
      },
    ]
    };
  }

  UNSAFE_componentWillMount() {
  }

  vendorRatingsHover = (vendorId) => {
    this.setState({ productVendorReviews: [] });
    this.props.getProductReviews({ vendorId });
  }

  componentDidMount() {
   // var data={ searchCriteria[pageSize]: 10 }
   var data=[];
   
   for(var i=0;i<this.state.resultSet.length;i++)
   {
    // if()
     var obj={
      
          
     }

   
     data.push(obj);
   }
   console.log(data);
   this.props.fetchFilterData(this.state.categoryId);
   this.setState({ pageNo: 1 });
   console.log(this.state.categoryId);

   this.props.getProductListing(
     {
        'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
        'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
        'searchCriteria[filterGroups][0][filters][0][conditionType]' : 'in',
     });
    
  
  }

  componentDidUpdate(prevProps) {
    
  }

  UNSAFE_componentWillReceiveProps(nextProps)
   {

    console.log(nextProps);
    console.log(this.state.productDetails);
    if (!_isEmpty(nextProps.filterData))
    { 
         const fillData = nextProps.filterData[0];
     
         console.log(fillData);
         //const colorsFilterData = _values(_get(nextProps.filtersData, 'Color'))
         console.log(_values(_get(fillData ,'Color')));
         const colorsFilterData = _values(_get(fillData, 'Color'));
         const flowerFilterData = _values(_get(fillData, 'Flower Type'));
         const occasionFilterData = _values(_get(fillData, 'Occasion'));
         const priceFilterData = _values(_get(fillData, 'Price'))

        console.log(colorsFilterData);
        console.log(occasionFilterData);
        console.log(flowerFilterData);
        console.log(priceFilterData);
        this.setState({
          totalFilterValues: nextProps.filterData,
          colorsFilterDataTemp: colorsFilterData,
          occasionFilterDataTemp: occasionFilterData,
          flowerFilterDataTemp: flowerFilterData,
          priceFilterDataTemp: priceFilterData,
        });
    }
    if (!_isEmpty(nextProps.productList))
     {
      console.log(nextProps.productList);
      
      const prodTemp = [];
      for(var i=0;i<nextProps.productList.items.length;i++)
      {
        if(nextProps.productList.items[i].qty !== 0)
        {
        prodTemp.push(nextProps.productList.items[i]);
        }
      }
    
     

    
      console.log(prodTemp);
      this.setState({
        ...this.state,
        totalProductCount: nextProps.productList.total_count,
        productDetails: prodTemp,
        pageLoader: false,
        
      });
     }

     console.log(this.state.productDetails);



  };

  
  handleScrollInc = () => {
    console.log("Page No"+ this.state.pageNo)
    const pNo = this.state.pageNo;
 this.setState(
   {
     pageNo: pNo + 1,
   },
   () => {
     if (this.state.productDetails.length < this.state.totalProductCount)
      {
       
        console.log('test3');
        this.props.getProductListing(
          {
             'searchCriteria[pageSize]' : 10,
             'searchCriteria[currentPage]' : this.state.pageNo,
             'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
             'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
             'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'in'
          });
       
     }
   },
 );
}

handleColorChange = (event) => {
  console.log(event.target.name);
  if (event.target.name === 'color') {
    this.setState({
      selectColor: event.target.value,
    });
   

    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
         'searchCriteria[filterGroups][1][filters][0][value]' : event.target.value,
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : 'eq',
        'searchCriteria[filterGroups][2][filters][0][field]' : 'price',
        'searchCriteria[filterGroups][2][filters][0][value]' : this.state.selectPrice === '' ? '' : this.state.selectPrice,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : this.state.selectPrice === '' ? 'neq' : 'eq',
        'searchCriteria[filterGroups][3][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][3][filters][0][value]' : this.state.selectOccasion === '' ? '' : this.state.selectOccasion,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : this.state.selectOccasion === '' ? 'neq' : 'eq',  
        'searchCriteria[filterGroups][4][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][4][filters][0][value]' : this.state.selectFlower === '' ? '' : this.state.selectFlower,
        'searchCriteria[filterGroups][4][filters][0][conditionType]' : this.state.selectFlower === '' ? 'neq' : 'eq',
      });
  }
  if (event.target.name === 'occassion') {
    console.log(event.target.value);
    this.setState({
      selectOccasion: event.target.value,
    });
    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : this.state.selectColor === '' ? '' : this.state.selectColor,
         'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor === '' ? 'neq' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : 'eq',
        'searchCriteria[filterGroups][2][filters][0][field]' : 'price',
        'searchCriteria[filterGroups][2][filters][0][value]' : this.state.selectPrice === '' ? '' : this.state.selectPrice,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : this.state.selectPrice === '' ? 'neq' : 'eq',
        'searchCriteria[filterGroups][3][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][3][filters][0][value]' : event.target.value,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : 'eq',  
        'searchCriteria[filterGroups][4][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][4][filters][0][value]' : this.state.selectFlower === '' ? '' : this.state.selectFlower,
        'searchCriteria[filterGroups][4][filters][0][conditionType]' : this.state.selectFlower === '' ? 'neq' : 'eq',
      });
  }
  if (event.target.name === 'flowerType') {
    this.setState({
      selectFlower: event.target.value,
    });
    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
         'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor === '' ? '' : this.state.selectColor,
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : this.state.selectColor === '' ? 'neq' : 'eq',
        'searchCriteria[filterGroups][2][filters][0][field]' : 'price',
        'searchCriteria[filterGroups][2][filters][0][value]' : this.state.selectPrice === '' ? '' : this.state.selectPrice,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : this.state.selectPrice === '' ? 'neq' : 'eq',
        'searchCriteria[filterGroups][3][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][3][filters][0][value]' : this.state.selectOccasion === '' ? '' : this.state.selectOccasion,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : this.state.selectOccasion === '' ? 'neq' : 'eq',  
        'searchCriteria[filterGroups][4][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][4][filters][0][value]' : event.target.value,
        'searchCriteria[filterGroups][4][filters][0][conditionType]' : 'eq',
      });
  }
  if (event.target.name === 'price') {
    this.setState({
      selectPrice: event.target.value,
    });
    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
         'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor === '' ? '' : this.state.selectColor,
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : this.state.selectColor === '' ? 'neq' : 'eq', 
        'searchCriteria[filterGroups][2][filters][0][field]' : 'price',
        'searchCriteria[filterGroups][2][filters][0][value]' : event.target.value,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : 'eq',
        'searchCriteria[filterGroups][3][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][3][filters][0][value]' : this.state.selectOccasion === '' ? '' : this.state.selectOccasion,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : this.state.selectOccasion === '' ? 'neq' : 'eq',  
        'searchCriteria[filterGroups][4][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][4][filters][0][value]' : this.state.selectFlower === '' ? '' : this.state.selectFlower,
        'searchCriteria[filterGroups][4][filters][0][conditionType]' : this.state.selectFlower === '' ? 'neq' : 'eq',
      });
  }

 

  
}


handleCustomFilter = () => {
  console.log(this.state.selectColor);
  console.log(this.state.selectOccasion);
  console.log(this.state.selectFlower);
  console.log(this.state.selectPrice);
  this.props.getProductListing(
    {
       'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
       'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
       'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
       'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
       'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor,
       'searchCriteria[filterGroups][1][filters][0][condition_type]' : 'eq',
       'searchCriteria[filterGroups][2][filters][0][field]' : 'price',
       'searchCriteria[filterGroups][2][filters][0][value]' : this.state.selectPrice,
       'searchCriteria[filterGroups][2][filters][0][condition_type]' : 'eq'
    });
};

  


  handleMethodChange = (event) => {
    if (event.target.name === 'store') {
      const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { 'store_id': event.target.value }), 'store_name');
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        selectedStoreName,
        listData: [],
        totalProductCount: 0,
        productDetails: [],
        deliveryDetails: [],
        displayData: [],
        filtersEnabled: false,
        dateObjectArray: [],
        moreAvail: {},
        showMoreAvail: {},
        farmInfo: undefined,
        pageNo: 1,
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
      });
      this.props.setStoreId({
        storeId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
        sort: this.state.sortValue,
        pageNo: 1,
      });
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
      });
    } else {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        sort: this.state.sortValue,
        pageNo: 1,
        method: event.target.value === '?' ? '' : event.target.value,
        category: this.state.category ? this.state.category.join('_') : 0,
        color: this.state.color ? this.state.color.join('_') : 0,
        farm: this.state.farm ? this.state.farm.join('_') : 0,
        location: this.state.location ? this.state.location.join('_') : 0,
        boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
        variety: this.state.variety ? this.state.variety.join('_') : 0,
        uom: this.state.uom ? this.state.uom.join('_') : 0,
        length: this.state.length ? this.state.length.join('_') : 0,
        grade: this.state.grade ? this.state.grade.join('_') : 0,
      });
      // @ todo move to common mapper
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        method: event.target.value === '?' ? '' : event.target.value,
        category: this.state.category ? this.state.category.join('_') : 0,
        color: this.state.color ? this.state.color.join('_') : 0,
        farm: this.state.farm ? this.state.farm.join('_') : 0,
        location: this.state.location ? this.state.location.join('_') : 0,
        boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
        variety: this.state.variety ? this.state.variety.join('_') : 0,
        uom: this.state.uom ? this.state.uom.join('_') : 0,
        length: this.state.length ? this.state.length.join('_') : 0,
        grade: this.state.grade ? this.state.grade.join('_') : 0,
      });
      this.setState({
        listData: [],
        totalProductCount: 0,
        productDetails: [],
        deliveryDetails: [],
        displayData: [],
        dateObjectArray: [],
        methodUpdated: true,
        enableClearAll: true,
        pageNo: 1,
        method: event.target.value,
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
      });
    }
  };

  handleInuputChange = (event, prodData, deliData) => {
    let totalTemp = 0;
    let flag = false;
    const { blinkText, totalAmount, inputValid } = this.state;
    inputValid[prodData.pid] = true;
    if (!isNaN(event.target.value) && event.target.value >= _get(deliData, 'qty_per_box') &&
      event.target.value <= _get(deliData, 'floorallowed') && event.target.value % _get(deliData, 'qty_per_box') === 0) {
      inputValid[prodData.pid] = false;
    }
    if (event.target.value >= _get(deliData, 'qty_per_box')) {
      totalTemp = event.target.value * _get(deliData, 'total_price_currency');
    }
    if (event.target.value >= _get(deliData, 'floorallowed')) {
      flag = true;
      totalTemp = 0;
    }
    if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
      blinkText[prodData.pid] = 'blink';
    } else {
      blinkText[prodData.pid] = '';
    }
    totalAmount[prodData.pid] = totalTemp;
    this.setState({
      unitQty: { ...this.state.unitQty, [prodData.pid]: Number(event.target.value) ? Number(event.target.value) : '' },
      totalAmount,
      showMaxQtyAlert: flag,
      productId: prodData.pid,
      blinkText,
      inputValid,
    });
  };

  handleAddCartClick = (prodData, deliData) => {
    if (this.props.apiToken && ((_get(this.props, 'cartType') === 'normal') || (!_get(this.props, 'cartType')))) {
      const reqBody = mapAddToCartApiData({
        ...this.state,
        ...prodData,
        ...deliData,
        totalAmount: this.state.totalAmount[prodData.pid],
        unitQty: this.state.unitQty[prodData.pid],
        user: this.props.user,
        apiToken: this.props.apiToken,
        customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      });
      this.props.addToCart(reqBody);
      this.setState({
        unitQty: { ...this.state.unitQty, [prodData.pid]: 0 },
        totalAmount: { ...this.state.totalAmount, [prodData.pid]: 0 },
      });
    } else if (_get(this.props, 'cartType') === 'subscription') {
      alert('Subscription orders cannot be purchased in combination with single orders at this time. Please clear your cart before adding this product to your cart');
    } else if (_get(this.props, 'cartType') === 'pre-book') {
      alert("Hello! Your Mother's Day PreBook products must be purchased separately from everyday product on the marketplace. Please complete your everyday purchases and continue shopping for your other favorite products!");
    } else if (_get(this.props, 'cartType') === 'prime') {
      alert("Normal orders cannot be purchased in combination with premium orders at this time. Please clear your cart before adding premium to your cart!");
    } else if (_isEmpty(this.props.apiToken)) {
      this.props.showLoginModal({ show: true });
    }
  };

  sortingOrderClick = () => {
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      sort: this.state.sortValue,
      pageNo: 1,
      sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
    });
    this.setState({
      showAscendSort: !this.state.showAscendSort,
      pageNo: 1,
      totalProductCount: 0,
      productDetails: [],
      prevBkmData: {},
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortValue: event.target.value,
      totalProductCount: 0,
      productDetails: [],
      pageNo: 1,
      prevBkmData: {},
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      sort: event.target.value,
      pageNo: 1,
    });
  };

  handleFilterCheckBoxChange = (event) => {
    const arr = _get(this.state, event.target.name, []);
    if (event.target.checked) {
      arr.push(event.target.value);
    } else {
      _pull(arr, event.target.value);
    }
    this.setState({
      applyFilter: true,
      [event.target.name]: [...arr],
    });
  };

  handleCategorySearch = (event) => {
    const searchValue = event.target.value;
    const searchType = event.target.name;
    if (!_isEmpty(event.target.value)) {
      switch (searchType) {
        case 'category': {
          const categoryFilterData = this.state.categoryFilterDataTemp.filter(obj =>
            obj.label.toLowerCase().match(searchValue.toLowerCase()));
          this.setState({
            categoryFilterData,
          });
          break;
        }
        case 'color':
          {
            const colorsFilterData = this.state.colorsFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              colorsFilterData,
            });
            break;
          }
        case 'farm':
          {
            const farmsFilterData = this.state.farmsFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              farmsFilterData,
            });
            break;
          }
        case 'location':
          {
            const stateCityFilterData = this.state.stateCityFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              stateCityFilterData,
            });
            break;
          }
        case 'boxType':
          {
            const boxTypeFilterData = this.state.boxTypeFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              boxTypeFilterData,
            });
            break;
          }
        case 'variety':
          {
            const varietyFilterData = this.state.varietyFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              varietyFilterData,
            });
            break;
          }
        case 'uom':
          {
            const uomFilterData = this.state.uomFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              uomFilterData,
            });
            break;
          }
        case 'length':
          {
            const lengthFilterData = this.state.lengthFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              lengthFilterData,
            });
            break;
          }
        case 'grade':
          {
            const gradeFilterData = this.state.gradeFilterDataTemp.filter(obj =>
              obj.label.toLowerCase().match(searchValue.toLowerCase()));
            this.setState({
              gradeFilterData,
            });
            break;
          }
        default:
      }
    }
  }


  handleClearAll = () => {
    this.setState({
      filtersEnabled: false,
      enableClearAll: false,
      applyFilter: false,
      category: [],
      color: [],
      farm: [],
      location: [],
      boxType: [],
      variety: [],
      uom: [],
      length: [],
      grade: [],
      searchStartDate: undefined,
      searchEndDate: undefined,
      pageNo: 1,
      method: '?',
      methodUpdated: false,
      totalProductCount: 0,
      productDetails: [],
      listData: [],
      deliveryDetails: [],
      displayData: [],
      dateObjectArray: [],
      shippingMethodsArrData: [],
      filters: {},
      categoryFilterData: [],
      categoryFilterDataTemp: [],
      colorsFilterData: [],
      colorsFilterDataTemp: [],
      farmsFilterData: [],
      farmsFilterDataTemp: [],
      stateCityFilterData: [],
      stateCityFilterDataTemp: [],
      boxTypeFilterData: [],
      boxTypeFilterDataTemp: [],
      varietyFilterData: [],
      varietyFilterDataTemp: [],
      uomFilterData: [],
      uomFilterDataTemp: [],
      lengthFilterData: [],
      lengthFilterDataTemp: [],
      gradeFilterData: [],
      gradeFilterDataTemp: [],
      prevBkmData: {},
    }, () => {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        sort: this.state.sortValue,
        pageNo: 1,
      });
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      });
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: moment(date).format('MM/DD/YYYY'),
    });
  };

  handleSearchClick = () => {
    this.setState({
      enableClearAll: true,
      listData: [],
      totalProductCount: 0,
      productDetails: [],
      deliveryDetails: [],
      displayData: [],
      dateObjectArray: [],
      pageNo: 1,
      prevBkmData: {},
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      sort: this.state.sortValue,
      pageNo: 1,
      searchStartDate: this.state.searchStartDate,
      searchEndDate: this.state.searchEndDate,
      method: this.state.method === '?' ? '' : this.state.method,
      category: this.state.category ? this.state.category.join('_') : 0,
      color: this.state.color ? this.state.color.join('_') : 0,
      farm: this.state.farm ? this.state.farm.join('_') : 0,
      location: this.state.location ? this.state.location.join('_') : 0,
      boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
      variety: this.state.variety ? this.state.variety.join('_') : 0,
      uom: this.state.uom ? this.state.uom.join('_') : 0,
      length: this.state.length ? this.state.length.join('_') : 0,
      grade: this.state.grade ? this.state.grade.join('_') : 0,
    });
    this.props.getFiltersData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
      method: this.state.method === '?' ? '' : this.state.method,
      category: this.state.category ? this.state.category.join('_') : 0,
      color: this.state.color ? this.state.color.join('_') : 0,
      farm: this.state.farm ? this.state.farm.join('_') : 0,
      location: this.state.location ? this.state.location.join('_') : 0,
      boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
      variety: this.state.variety ? this.state.variety.join('_') : 0,
      uom: this.state.uom ? this.state.uom.join('_') : 0,
      length: this.state.length ? this.state.length.join('_') : 0,
      grade: this.state.grade ? this.state.grade.join('_') : 0,
    });
  };

  handleShowChangeStore = () => {
    this.setState({
      showChangeStoreModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showChangeStoreModal: false,
    });
  };

  handleMoreDetailClick = (productId) => {
    this.setState({
      showMoreDetail: {
        ...this.state.showMoreDetail,
        [productId]: !_get(this.state.showMoreDetail, productId, false),
      },
    });
  };

  handleMoreAvailClick = (productId) => {
    this.setState({
      showMoreAvail: {
        ...this.state.showMoreAvail,
        [productId]: !_get(this.state.showMoreAvail, productId, false),
      },
    });
  }

  ProductSwitch = (event, index, pId) => {
    const datesArr = {};
    const dataTempAvail = _get(this.state.moreAvail, [pId, event]);
    dataTempAvail.forEach((o) => {
      datesArr[_get(o, 'delivery_date')] = _get(o, 'total_price_format');
    });
    const dateObjectArray = [...this.state.dateObjectArray];
    const displayData = [...this.state.displayData];
    dateObjectArray[index] = datesArr;
    // eslint-disable-next-line prefer-destructuring
    displayData[index] = dataTempAvail[0];
    this.setState({
      //   dataToShow: { ...this.state.productDetails.info[event], ...dataTempAvail[0], newKey: event },
      //   datesArr,
      displayData,
      dateObjectArray,
    });
  }

  resetMoreDetails = (date, index, pid) => {
    const dataTempAvail = _filter(this.state.deliveryDetails[index], [
      'delivery_date',
      date,
    ])[0];
    this.setState({
      displayData: { ...this.state.displayData, [index]: dataTempAvail },
      unitQty: { ...this.state.unitQty, [pid]: '' },
      totalAmount: { ...this.state.totalAmount, [pid]: 0 },
    });
  };

  handleViewClick = (viewType) => {
    this.setState({
      viewType,
    });
  };

  handleAddToWishlist = (productId) => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId,
    });
  }

  handleAddToFavorites = (productId) => {
    this.props.addToFavorites({
      apiToken: this.props.apiToken,
      productId,
      storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
    });
  }

  setTabKey = key => this.setState({ tabKey: key });

  getStoreData = (data) => {
    console.log(data);
    this.setState({
          proData: data,
         proLink: true,
    });
  }  
  

  render() {
      console.log(this.state.flowerFilterDataTemp);
      console.log(this.state.occasionFilterDataTemp);
      console.log(this.state.colorsFilterDataTemp);

     
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

      if (this.state.pageLoader) {
        return (
          <div id="cover-spin">
            <center>
              <img src={ fullLoader } style={{height:'126px',marginTop:'300px'}} alt="lazy-loader"/>
              </center>  
          </div>
        );
    }
    return (
      <div>
       
        {this.props.location.state.catImage === false ?
              <div className="row listing_product">
                <div className="col-sm-6" style={{marginTop:'130px'}}>
                      {this.props.location.state.catDesc !== null ?
                          <p style={{color:'black'}}><center>{this.props.location.state.catDesc}</center></p>
                      : <p style={{color:'black'}}><center>Products For Category {this.props.location.state.catName}</center></p>
                      }
               </div>
                    <div className="col-sm-6">
                    </div>
              </div>: 
               <div className="row listing_product1 " style={{backgroundImage: `url(${this.props.location.state.catImage})`}}>
               <div className="col-sm-6" style={{marginTop:'130px'}}>
                 {this.props.location.state.catDesc !== null ?
                    <p style={{color:'black'}}><center>{this.props.location.state.catDesc}</center></p>
                 : <p style={{color:'black'}}><center>Products For Category {this.props.location.state.catName}</center></p>
                 }
               </div>
               <div className="col-sm-6">
               </div>
              </div> 
        }
       
            <br/><br/>
            <div class="container">   
               <div class="row"> 
            
                  <div className="col-sm-3">
                    <center>
                      <select style={{width:'200px',borderRadius: '20px',backgroundColor: '#8AB77D'}} value={this.state.selectColor} onChange={this.handleColorChange}  className="form-control" id="color" name="color" title="Color">
                          <option value="">Select Color</option>
                          {
                            this.state.colorsFilterDataTemp &&
                            Object.entries(this.state.colorsFilterDataTemp).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.value} id={thisState.value} alt={thisState.value}>{thisState.display}</option>)
                          }
                        </select>
                      </center>
                    </div>
                  <div className="col-sm-3">
                     <center>
                      <select style={{width:'200px',borderRadius: '20px',backgroundColor: '#8AB77D'}} value={this.state.selectOccasion} onChange={this.handleColorChange}  className="form-control" id="occassion" name="occassion" title="Occassion">
                          <option value="">Select Occasion</option>
                          {
                            this.state.occasionFilterDataTemp &&
                            Object.entries(this.state.occasionFilterDataTemp).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.value} id={thisState.value} alt={thisState.value}>{thisState.display}</option>)
                          }
                        </select>
                        </center>
                    </div>
                 
                  <div className="col-sm-3">
                    <center>
                      <select style={{width:'200px',borderRadius: '20px',backgroundColor: '#8AB77D'}} value={this.state.selectFlower} onChange={this.handleColorChange}  className="form-control" id="flowerType" name="flowerType" title="Flower Type">
                          <option value="">Select Flower Type</option>
                          {
                            this.state.flowerFilterDataTemp &&
                            Object.entries(this.state.flowerFilterDataTemp).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.value} id={thisState.value} alt={thisState.value}>{thisState.display}</option>)
                          }
                        </select>
                     </center>
                    </div>
                    
                    <div className="col-sm-3">
                    <center>
                      <select style={{width:'200px',borderRadius: '20px',backgroundColor: '#8AB77D'}} value={this.state.selectPrice} onChange={this.handleColorChange}  className="form-control" id="price" name="price" title="Prices">
                          <option value="">Select Price</option>
                          {
                            this.state.priceFilterDataTemp &&
                            Object.entries(this.state.priceFilterDataTemp).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.value} id={thisState.value} alt={thisState.value}>{thisState.display}</option>)
                          }
                        </select>
                     </center>
                    </div>
                   
              </div>
          </div>
            <br/>
            <br/>

     

        <div className="container" style={{overflow:'none'}}>
              <ErrorBoundary>
               
                  <ListingComponent
                    {...this.state}
                    getStoreData={this.getStoreData}
                    metaDesc={_get(this.props.bkmSearchData, 'products.meta_description')}
                    isLoading={this.props.isLoading}
                  />
              </ErrorBoundary>
              {/*<div className="display-item-count">
                Items{' '}
                <span id="up">
                  {this.state.productDetails && this.state.productDetails.length}
                </span>{' '}
                of <span id="pcount">{this.state.totalProductCount ? this.state.totalProductCount : 0}</span> total
                  </div>*/}
          </div>
         




      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProductListing: data => dispatch(fetchProductListing(data)),
  fetchFilterData: data => dispatch(fetchFilterData(data)),  

});

const mapStateToProps = (state) => {
  const {
    bkmReducer, cartReducer
  } = state;

  const {
    filterData,
  } = cartReducer || [];

  const {
    productList,
    isFetching: isLoading,
    error: bkmError,
  } = bkmReducer || [];

  const error = !_isEmpty(bkmError);
  
  return {
    isLoading,
    productList,
    filterData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler(ShopByFlowersContainer));
