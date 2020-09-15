import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import StarRatings from 'react-star-ratings';
import ReactImageZoom from 'react-image-zoom';
import Image from 'react-image-resizer';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Datetime from 'react-datetime';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import MetaTags from 'react-meta-tags';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../assets/stylesheets/DatePickerReact.css';
import MaModal from '../Common/MaterialUIModal.jsx';
import MaModalOne from '../Common/MaterialUIModalOne.jsx';
import ReviewComponent from '../ProductComponent/reviewComponent.jsx';
import lazyLoader from '../../assets/img/25.gif';
import logo from '../../assets/img/logo.png';
import { configConsumerProps } from 'antd/lib/config-provider';

export default function ProductDetailComponent(props) {
    console.log(props);
    
    const renderDay = (inputProps, currentDate, selectedDate) => {
      console.log(props.dateObjectArray);
      inputProps.className = `${inputProps.className} customTdCls`;
      const formattedDate = currentDate.format('DD-MM-YYYY');
      if (props.dateObjectArray.length !== 0 && Object.keys(props.dateObjectArray[props.index]).length && props.dateObjectArray[props.index][formattedDate]) {
          inputProps.className = `${inputProps.className} hasDatePrice`;
          return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate, props.index)}>
              {currentDate.date()}
              <div>{props.dateObjectArray[props.index][formattedDate]}</div>
          </td>;
      }
      inputProps.className = `${inputProps.className} rdtDisabled`;
      return <td {...inputProps}>{currentDate.date()}</td>;
  };
  const renderInput = (inputProps, openCalendar, closeCalendar) => {
      function clear() {
          inputProps.onChange({ target: { value: '' } });
      }


      return (
          <div>

              <div className="delivery-opinion myfav-details col-md-3 col-lg-3 col-sm-3 ">
                  <b>Delivery Date</b><br />
                  <span className="delivery-date-myfav">
                      {_get(props.deliveryData, 'delivery_date_form')}
                      <span className="calendar" onClick={openCalendar}>
                          <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} />
                      </span>
                  </span>
              </div>
          </div>
      );
  };
    if (props.productDetails) {
        //const { info } = props.productDetails;

        console.log(props.productDetails.extension_attributes);
        console.log(props.dateObjectArray);
        return (
            <div>
                 <MetaTags>
                  <meta name="description" content={props.productDetails.name} />
                </MetaTags>
               
              
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12" style={{height:'500px',marginTop:'30px'}}>
                      
                       <div className="row">
                          <div className="col-md-1"></div>
                          <div className="col-md-2">
                          <ul className="clearfix">
                            {props.productDetails.length !== 0 && props.productDetails.images.map((contact) => (
                                    <li style={{marginBottom:'15px'}}>
                                    <img src={contact} onMouseEnter={() => props.handleMouseEnter(contact)}  style={{height:'60px',width:'60px',border:'1px solid #cdcdcd'}}/>
                                    &nbsp;&nbsp; </li>

                                ))}
                            </ul>

                          </div>
                          <div className="col-md-8">
                          <div> 
                            {props.productDetails.image && 
                                <Image width={400}
                                height={380} src={props.imageSrc} resizeMode='contain'/>
                               }
                                 </div>

                          </div>
                          <div className="col-md-1"></div>

                       </div>
                    </div>
                   
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
                        <div className="product-view-detail">
                            <div style={{marginTop:'30px'}}>
                                <div className="row">
                                    <div className="col-md-6"> <h4 style={{color:'#000000',fontSize:'20px',fontWeight:'600',textTransform:'none'}}>{props.productDetails.name}</h4></div>
                                    <div className="col-md-6" style={{marginTop:'9px'}}> 
                                    
                                       {/* 
                                       <span class="fa fa-star checked"></span>
                                       <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'blue'}}>76 Ratings</span>
                                      */}
                                     </div>

                                    </div>

                                    <br/>
                                     <p style={{color:'#000000',fontSize:'17px'}}>Price : ${props.productDetails.price}</p>
 
                                   {props.productDetails.length !== 0 &&
                                    <div className="row">
                                      <div className="col-sm-10">
                                        <ul style={{listStyle:'disc'}}>
                                        <li className="f14">
                                        {props.productDetails.custom_fields[3].value}
                                        </li>
                                        <li className="f14">
                                        {props.productDetails.custom_fields[4].value}
                                        </li>
                                        <li className="f14">
                                        {props.productDetails.custom_fields[5].value}
                                        </li>
                                        <li className="f14">
                                        {props.productDetails.custom_fields[6].value}
                                        </li>
                                        <li className="f14">
                                        {props.productDetails.custom_fields[7].value}
                                        </li>
                                        </ul>
                                          </div>
                                       <div className="col-sm-2">
                                     </div>   
                                    </div>        
                                    }    
                                   
                                    <br/>
                                     <br/>

                               
                                
                            
                        </div >
                    </div >
                    <br/>
                                   <div className="row" style={{marginTop:'10px'}}>
                                                <div className="col-sm-4"> 
                                                  <center>                                   
                                                  {/*<input name="lastName" id="lastName" autocomplete="new-password" title="Last Name" className="form-control" type="text" onChnage={props.handleChangeData} value={props.zipCode} />*/}
                                                  <center><input type="button" onClick={props.showAddressModal} value={props.zipCode} style={{backgroundColor:'white',border:'1px solid #eaeaea',height:'40px',width:'170px'}}/></center>
                                                  </center>  
                                                </div>
                                                <div className="col-sm-4" style={{marginLeft:'-16px'}}>
                                                    <center>  
                                                      <div className="cart-info quantity">
                                                              <div className="btn-increment-decrement" onClick={props.DecreaseItem}>-</div>
                                                              <input className="input-quantity" id="input-quantity-wristWear03" value={props.valueData}/>
                                                          <div className="btn-increment-increment" onClick={props.IncreaseItem}>+</div>
                                                      </div>
                                                    </center>
                                                  </div>
                                          
            
                                                  <div className="col-sm-4">
                                                    <center>
                                                         <DatePicker
                                                          selected={props.startDate}
                                                          onChange={props.dateChanged}
                                                          calendarIcon
                                                          format="yyyy-MM-dd"
                                                          includeDates={props.dateObjectArray}
                                                          isClearable
                                                          //filterDate={props.isWeekday}
                                                         // filterDate={props.dateObjectArray}
                                                          //renderDay={props.dateObjectArray}
                                                         // disabledDays={props.dateObjectArray}
                                                          //minDate={props.dateObjectArray[0]}
                                                          //maxDate={props.dateObjectArray[props.dateObjectArray.length -1]}
                                                         />
                                                         {/*<input type="date" value={props.startDate} shouldDisableDate={props.disableWeekends} min={props.minDateShow} max={props.maxDateShow} onChange={props.handleDataDate}/>*/}
                                                      </center>    
                                                  </div>
                                </div>
                                   <br/>
                                <div className="row" style={{marginTop:'10px'}}>
                                    <center>
                                      {(props.productDetails.length !== 0 && props.productDetails.qty !== 0) || props.dateObjectArray.length !== 0 ? 
                                       <button type="button" style={{height:'50px',width:'200px',backgroundColor:'#8AB77D',border:'1px solid',borderRadius:'35px',color:'white'}} className="" onClick={props.addProductToCart}>Add to Cart</button>
                                      :
                                      <button type="button" style={{height:'50px',width:'200px',backgroundColor:'#eaeaea',border:'1px solid',borderRadius:'35px',color:'white'}} className="" disabled onClick={props.addProductToCart}>Add to Cart</button>  
                                      }
                                      &nbsp;&nbsp;&nbsp;
                                      {props.cartLoader === true &&
                                         <img src={lazyLoader} alt="#" style={{height:'60px',width:'60px'}} />
                                       }
                                       </center>
                                </div>
                  </div >

                           

                </div>
              
               <br/>
               <br/>
               <br/>
               {props.children && !_isEmpty(props.children) &&
               <div>
                  <div className="container">
                    <hr style={{border:'3px solid #eaeaea'}}/>
                  </div>
                  <br/>
                  <section>
              <div className="container">
              <h1 style={{fontFamily:'Quintessential',fontSize:'35px'}}>You may also like it</h1>
              </div>
            </section>
                  <br/>
                  <div className="container">
                        <AliceCarousel
                            items={props.children}
                            responsive={props.responsive}
                            slideToIndex={props.currentIndex}
                            mouseTrackingEnabled={true}
                            onSlideChange={props.onSlideChange}
                            onSlideChanged={props.onSlideChanged}
                        />
                    </div>
                    <br/><br/>
                </div>
             }
             {props.upsellChildrens && !_isEmpty(props.upsellChildrens) &&
                                <div>
                                <div className="container">
                  
                                                  <hr style={{border:'3px solid #eaeaea'}}/>
                                </div>
                                <br/>
                                <section>
                            <div className="container">
                            <h1 style={{fontFamily:'Quintessential',fontSize:'35px'}}>Upsell Product</h1>
                            </div>
                            </section>
                                <br/><div className="container">
                                    <AliceCarousel
                                        items={props.upsellChildrens}
                                        responsive={props.responsive}
                                        slideToIndex={props.currentIndex1}
                                        mouseTrackingEnabled={true}
                                        onSlideChange={props.onSlideChange}
                                        onSlideChanged={props.onSlideChanged}
                                    />
                                </div>
                                      <br/><br/>      
                        </div>
                    }
                    <br/>
                    <div className="container">
                        <hr style={{border:'3px solid #eaeaea'}}/>
                     </div>
                     <br/>
                    {props.productReviewData && props.productReviewData.items && props.productReviewData.items.length > 0 &&
                 <div className="container">
                   <div className="row cust-reviews-div">
                        <div className='col-xs-12' id="review-list">
                        <center><p style={{fontSize:'20px'}}>{props.productReviewData.items.length} customer reviews</p></center>
                        <br/>
                        {props.productReviewData && props.productReviewData.items &&
                                        props.productReviewData.items.map((eachReview, index) => {
                                            if (index < props.showData) {
                                            return (
                                        <div key={index} style={{marginLeft:'150px',marginRight:'150px',marginTop: '10px'}}>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   <img src={logo} style={{height:'40px',width:'40px',borderRadius: '50%'}}/>
                                                </div>
                                                <div className="col-sm-11" style={{marginTop: '10px'}}>
                                                  <b>{eachReview.nickname}</b>
                                                </div> 
                                            </div>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   
                                                </div>
                                                <div className="col-sm-11" style={{marginTop: '10px'}}>
                                                        <div class="row">
                                                               <div className="col-sm-3">
                                                                 <StarRatings
                                                                        rating={eachReview.ratings.length === 0 ? 0 : eachReview.ratings[0].value}
                                                                        starDimension="20px"
                                                                        starSpacing="1px"
                                                                        starEmptyColor="#434343"
                                                                        starRatedColor="#fdb927"
                                                                    />
                                                                </div>
                                                                <div className="col-sm-9">
                                                                     <b>{eachReview.title}</b>
                                                                </div> 
                                                        </div>
                                                </div> 
                                            </div>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   
                                                </div>
                                                <div className="col-sm-11">
                                                   {eachReview.created_at}
                                                </div>
                                                </div>
                                            <div class="row">
                                               <div className="col-sm-1">
                                                   
                                                </div>
                                                <div className="col-sm-11">
                                                   {eachReview.detail}
                                                </div>
                                                </div>
                                         
                                       </div> 
                           );
                            }
                        })
                    }                     
                        </div>
                    </div>
                 </div>
                }
                <br/>
              <div className="container">
                <div className="row">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">

                  {_get(props.productReviewData, 'total_count') > 3 && props.reviewShow === true &&
                                             <a style={{cursor:'pointer'}} onClick={() => props.focusReview(_get(props.productReviewData, 'total_count'))}>
                                            <span className="more-reviews"><b>See {Number(_get(props.productReviewData, 'total_count')) - 3} more reviews >></b></span>
                                         </a>
                                        }
                    </div>
                  </div>
                </div>





                     <br/>

                    
                  <div style={{marginTop: '10px'}}>
                            <div className="row">
                             <div className="col-md-12">
                                 <center>
                                    <input onClick={() => props.toggleReviewModalFn()} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Write Review"/>
                                </center>
                              </div>
                            </div>
                   </div>
                   <br/><br/><br/>

                   {
                     props.showReviewModal &&
                    <MaModal open={props.showReviewModal} handleCloseModal={() => props.toggleReviewModalFn()}>
                   
                    <div className="row" style={{backgroundColor:'#8AB77D',marginTop:'-20px',height:'64px',marginLeft:'0px',marginRight:'0px'}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6"> <center><h3 style={{color:'white',paddingTop:'9px'}}>Rate and  Review</h3>
                      
                      </center></div>
                      <div className="col-md-3"><a style={{padding:'20px',cursor:'pointer',float:'right'}} onClick={() => props.toggleReviewModalFn()}>X</a></div>
                    </div> 
                     <br/>
                   
                      <div>
                         <center>   <p>Your Review Will Be Publically Posted On The Web.</p>
                          <br/> 
                               <StarRatings
                                rating={props.rating}
                                starRatedColor="blue"
                                starDimension="25px"
                                starSpacing="1px"
                                changeRating={props.changeRating}
                                numberOfStars={5}
                                name='rating'
                                className="field-input"
                            />
                             <br /><span style={{ color: 'red' }}>{props.errors.rating}</span>
                            <br/>
                            {props.loginData === '' ?
                       <div></div>
                       
                     :  <h3 style={{textTransform:'none'}}>{props.userFirstName} </h3>}
                       <div>
                         <input style={{width:'400px',borderTopStyle: 'hidden',borderRightStyle: 'hidden',borderLeftStyle: 'hidden',borderBottomStyle: 'groove'}} type="text" className="no-outline" placeholder="Enter Title" onChange={props.handleChange} name="review_title"/>
                         <br /><span style={{ color: 'red' }}>{props.errors.review_title}</span>
                       </div>
                       <br/>
                       <br/>
                       <div>
                          <textarea rows={4} style={{width:'400px',borderTopStyle: 'hidden',borderRightStyle: 'hidden',borderLeftStyle: 'hidden',borderBottomStyle: 'groove'}} type="text" className="no-outline" placeholder="Share Details Of Your own Experience At This Place" onChange={props.handleChange} name="review_details"></textarea>
                            <br/><span style={{ color: 'red' }}>{props.errors.review_details}</span>
                       </div>
                         <br/>
                       {props.reviewPostLoader  ?
                          <img src={ lazyLoader } style={{height:'60px',width:'60px'}}  alt="lazy-loader"/>
                        : <button type="button" style={{height:'50px',width:'200px',backgroundColor:'#8AB77D',border:'1px solid',borderRadius:'35px',color:'white'}} className="" onClick={() => props.submitReviews()}>Post</button>}
                        </center>
                     </div>
                  </MaModal>
                }

<MaModalOne open={props.showChangeAddress} handleCloseModal={props.showAddressModal}>
                  <div className="row" style={{backgroundColor:'#8AB77D',marginTop:'-20px',height:'64px',marginLeft:'0px',marginRight:'0px'}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6"> <center><h3 style={{color:'white',paddingTop:'9px'}}>Change Your Location</h3>
                      
                      </center></div>
                      <div className="col-md-3"><a style={{padding:'20px',cursor:'pointer',float:'right'}} onClick={props.showAddressModal}>X</a></div>
                  </div>
                    <div>
                      {props.apiToken === '' ?
                      <div>
                          <div className="row"  style={{position: 'relative',marginTop:'100px'}}>
                                <div className="col-md-3">
                              </div>
                              <div className="col-md-6 field1">
                                <input type="text" name="postalCode" 
                                    onChange={props.handleInputChange1} id="postalCode" placeholder="Zip Code" required="" />
                              </div>
                              <div className="col-md-3">
                              </div>
                          </div>
                          <br/><br/>
                          <center>               
                          <input type="submit" onClick={props.changeZipCodeData} style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Apply"/>
                          </center>

                      </div>                      
                      :
                      <div>
                        <br/>

                    {
                      props.addressData.length !== 0 ?
                      <div>
                        <div className="row"  style={{position: 'relative',marginTop:'2px'}}>
                              <div className="col-md-2 ">
                                </div>
                              <div className="col-md-6 field1">
                                <input type="text" name="postalCode" 
                                    onChange={props.handleInputChange1} id="postalCode" placeholder="Zip Code" required="" />
                              </div>
                              <div className="col-md-4" style={{marginTop:'17px'}}>
                              <center>               
                                   <input type="submit" onClick={props.changeZipCodeData} style={{backgroundColor: '#8AB77D',color: 'white',width:'160px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Apply"/>
                               </center>
                              </div>
                          </div>
                          
                          <center>
                          <hr style={{border:'1px solid #eaeaea',width:'500px'}}/>
                          </center>
                          <br/>
                      <AliceCarousel
                           items={props.addressData}
                           responsive={props.responsive}
                           mouseTrackingEnabled={true}
                           onSlideChange={props.onSlideChange}
                           onSlideChanged={props.onSlideChanged}
                         />
                         
                                    <center>
                                        <input onClick={() => props.handleAddAddress()}  type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add New Address"/>
                                    </center> 

                     </div>
                    :  
                    <div style={{marginTop:'50px'}}>
                         <div className="row"  style={{position: 'relative'}}>
                             <div className="col-md-2">
                              </div>
                              <div className="col-md-6 field1">
                                <input type="text" name="postalCode" 
                                    onChange={props.handleInputChange1} id="postalCode" placeholder="Zip Code" required="" />
                              </div>
                              <div className="col-md-4" style={{marginTop:'17px'}}>
                              <center>               
                                   <input type="submit" onClick={props.changeZipCodeData} style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="field_bt" value="Apply"/>
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
                                        <input onClick={() => props.handleAddAddress()}  type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add New Address"/>
                                    </center>   
                       </div>
                    }

                      </div> 
                      }
                    </div>
                   
        </MaModalOne>

               </div>
        );
        
    }
    return (<div> '' </div>);
}
