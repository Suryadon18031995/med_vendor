import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import { FormComponent, FormContainer } from "react-authorize-net";
import moment from 'moment';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MaModal from '../Common/MaterialUIModal.jsx';
// import { Slider, InputNumber } from 'antd';
import calendarImage from '../../assets/images/select-date.png';
import lazyLoader from '../../assets/img/25.gif';
import circle from '../../assets/img/circle.svg';
import Image from 'react-image-resizer';
import { defaultMergeProps } from 'react-redux/lib/connect/mergeProps';


export default function MyCartComponent(props) {
    console.log(props);
    let result = [];
    if (props.totalCartItems.length !== 0) {
       // result = _get(props.cartResult.items);
       /// console.log(props.cartResult.items);
        
       // const subTotal = _get(props.cartResult, [0, 'subtotal']);
        return (
            <div>
                  <div className="container">
                     <div style={{border:'2px solid #eaeaea'}}>
                       <div className='row'>
                         <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                         </div> 
                         <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                         </div> 
                         <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                             <div className="row" style={{marginTop:'15px'}}>
                                 <div className="col-md-4"><p style={{color:'black'}}>Qty</p></div>
                                 <div className="col-md-4"><p style={{color:'black'}}>Price</p></div>
                                 <div className="col-md-4"><p style={{color:'black'}}>Total</p></div>
                             </div>
                            
                         </div> 
                      </div>
                    { props.totalCartItems.map((thisCart, index) => {
                        return (
                        <div key={index} className='row' style={{minHeight:'165px'}} key={index}>
                            <div className='col-lg-5 col-md-5 col-xs-5 col-sm-5'>
                         <React.Fragment>
                               <div>
                                <div className="row">
                                    <div className='col-lg-5 col-md-5 col-xs-5 col-sm-5'>
                                       <div className="row" style={{marginLeft:'0px'}}>
                                                <div className="col-md-2" style={{marginLeft:'0px',marginTop:'56px'}}>
                                                        <a style={{cursor:'pointer'}} onClick={() => props.removeProduct(thisCart.item_id)}>
                                                        <img src={circle} style={{height:'20px',width:'20px'}}/>
                                                        </a>
                                                </div>
                                                <div className="col-md-10">
                                                <div style={{width:'140px',height:'140px',border:'1px solid #eaeaea'}}>
                                                  <img src={thisCart.image} style={{width:'130px',height:'130px'}}/>
                                                </div>
                                               </div>
                                        </div> 
                                    </div>
                                    <div className='col-lg-7 col-md-7 col-xs-7 col-sm-7' style={{marginTop:'30px'}}>
                                     
                                                <p style={{color:'black'}}>{thisCart.name}</p>
                                                   {/*<center>
                                                      <a style={{color:'#8AB77D',cursor:'pointer'}} onClick={() => props.removeProduct(thisCart.item_id)}>(Remove)</a>
                                                   </center>*/}
                                                          <p style={{color:'black'}}>Date of Delivery : {thisCart.custom_attributes.delivery_date}</p>
                                                        
                                                          
                                                        {/* <p className="cart-deli-date">Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p> */}
                                                        {/* <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p> 
                                                        <div style={{ cursor: 'pointer' }} onClick={() => props.removeProduct(thisCart.item_id)} title='Remove Item'>Delete</div>*/}
                                    </div>
                                   
                             </div>  
                            


                             </div> 
                          </React.Fragment>
                                                    
                           </div>


                                <div className='col-lg-3 col-md-3 col-xs-3 col-sm-3'>
                                   <div className="row">
                                      <div className="col-md-12" style={{marginTop:'25px',marginLeft:'-20px'}}>
                                        
                                        <textarea style={{padding:'15px'}}
                                          placeholder='Message'
                                          rows={2}
                                          cols={25}
                                          value={props.cartGift[index].gift_message}
                                          onChange={props.handleChange4} 
                                          onChange={e => props.handleChange4(e.target.value,props.cartGift[index])}
                                            />
                                            <br/>
                                            {props.showGF === true && 
                                             <center>
                                               <input onClick={() => props.handleSaveGift(props.cartGift[index])} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'60px',height:'26px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add"/>
                                            </center>
                                           }
                                           {
                                               props.giffyLoader === true &&
                                               <center>
                                                <img src={ lazyLoader } style={{height:'50px',marginTop:'50px'}} alt="lazy-loader"/>
                                               </center>
                                           }
                                    </div>
                                  </div>

                                </div>
                                <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                                   <div className="row" style={{marginTop:'25px'}}>
                                                    <div className="col-md-4"><p style={{color:'black'}}> <div className="cart-info quantity">
                                                                <div className="btn-increment-decrement" onClick={() => props.updateCart(thisCart,'sub',thisCart.qty)}>-</div>
                                                                <input className="input-quantity" id="input-quantity-wristWear03" value={thisCart.qty}/>
                                                            <div className="btn-increment-increment" onClick={() => props.updateCart(thisCart,'add',thisCart.qty)}>+</div>
                                                          </div></p></div>
                                        <div className="col-md-4"><p style={{color:'black'}}>{thisCart.price}</p></div>
                                                    <div className="col-md-4"><p style={{color:'black'}}>{thisCart.row_total}</p></div>
                                   </div>

                               </div>
                        </div>
                        )})}
                    <div>
                        <div className="row">
                            <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                             <label style={{marginLeft:'30px'}}>Apply Promo Code</label>
                               <input style={{marginLeft:'30px',padding: '10px',width:'240px'}} placeholder="Enter Promo Code" id="coupon_code" title="coupon_code" name="coupon_code" value={props.discountCouponValue} onChange={props.handleInputChange} />
                               <span>{props.errors.discountCouponValue}</span>
                                                                <a className=" mt-3" title="Apply Coupon" onClick={props.applyDiscountCoupon} value="Apply Coupon"><span><span className="apply-coupoun-btn" style={{color:'f96495'}}>&nbsp;&nbsp;&nbsp;&nbsp;(Apply)</span></span></a>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                            </div> 
                            <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                                <div className="row">
                                    <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>Sub Total</p></div>
                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>{props.cartDataShow.totals.subtotal}</p></div>
                               </div>
                               <div className="row">
                                    <div className="col-md-4"><p style={{color:'black'}}>Discount</p></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"><p style={{color:'black'}}>{props.cartDataShow.totals.discount}</p></div>
                               </div>
                               <div className="row">
                                    <div className="col-md-4"><p style={{color:'black'}}>Shipping Fees</p></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"><p style={{color:'black'}}>{props.shipTotalAmount}</p></div>
                               </div>
                               <div className="row">
                                    <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>Grand Total</p></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>{props.grandTotalAmount}</p></div>
                               </div>
                            </div> 
                         </div>

                    </div>

                   </div> 

                <br/>


                <div style={{border:'2px solid #eaeaea',padding:'15px'}}>
                        <div className="row">
                          <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                            <div style={{border:'1px solid #eaeaea',padding:'20px',height:'548px'}}>
                                <br/>
                                <center><p style={{color:'black'}} >Shipping Address</p></center>
                                <br/>
                            <ul className="form-list">
                                <li className="fields row">
                                    <div style={{ display: 'none' }} className="input-field">                               
                                        <input name="addressId" id="addressId" title="Address ID" className="field-input" type="text" value={props.fields.addressId}/> 
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <input name="firstName" id="firstName"  autocomplete="new-password" title="First Name" placeholder="First Name" className={props.errors.firstName ? 'form-control redData': 'form-control'} type="text" onChange={props.handleChange} value={props.fields.firstName}/>
                                        
                                    </div>
                                    <div className="input-field col-sm-6">
                                        <input name="lastName" id="lastName"  autocomplete="new-password" title="Last Name" placeholder="Last Name" className={props.errors.lastName ? 'form-control redData': 'form-control'} type="text" onChange={props.handleChange} value={props.fields.lastName} />
                                      
                                    </div>
                                </li>
                                <li className="fields row">
                                    <div className="form-group col-sm-6">
                                        <input name="telephone" id="telephone"  autocomplete="new-password" title="Telephone" className={props.errors.telephone ? 'form-control redData': 'form-control'} type="text" placeholder="Phone No" onChange={props.handleChange} value={props.fields.telephone} />
                                        
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <input name="company" id="company" autocomplete="new-password" title="Company" className="form-control" type="text" placeholder="Company" onChange={props.handleChange} value={props.fields.company}/>
                                       
                                    </div>
                                  </li>
                                  <li className="fields row">
                                    <div className="form-group col-sm-12">
                                    <input name="streetAddress1" id="streetAddress1"  autocomplete="new-password" title="Street Address1" className={props.errors.streetAddress1 ? 'form-control redData': 'form-control'} type="text" placeholder="Street Address1" onChange={props.handleChange} value={props.fields.streetAddress1} />
                                        
                                    </div>
                                  </li>
                                  <li className="fields row">
                                    <div className="form-group col-sm-12">
                                    <input name="streetAddress2" id="streetAddress2" autocomplete="new-password" title="Street Address2" className="form-control" type="text" placeholder="Street Address2" onChange={props.handleChange} value={props.fields.streetAddress2} />
                                        
                                    </div>
                                  </li>
                                  <li className="fields row">
                                        <div className="form-group col-sm-6">
                                            <input name="city" id="city" required title="City" autocomplete="new-password" className={props.errors.city ? 'form-control redData': 'form-control'} type="text" placeholder="City" onChange={props.handleChange} value={props.fields.city} />
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <select className={props.errors.selectStateValueShipping ? 'form-control redData': 'form-control'} required id="billing_region_id_1" name="region_id" title="State/Province" value={props.selectStateValueShipping} onChange={props.handleStateChange} >
                                               <option value="">Select region</option>
                                               {
                                                  props.stateListRes &&
                                                  Object.entries(props.stateListRes.available_regions).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.id} id={thisState.id} alt={thisState.id}>{thisState.name}</option>)
                                               }
                                            </select>
                                        </div>
                                  </li>  
                                  <li className="fields row">
                                    <div className="form-group col-sm-12">
                                    <input name="postalCode" required id="postalCode" disabled autocomplete="new-password" title="Postal Code" className="form-control" type="text" placeholder="Postal Code" onChange={props.handleChange} value={props.zipCode}/>
                                        
                                    </div>
                                  </li>
                                 
                              </ul>  
                              {props.showShippingLoader !== true ? 
                                <div className="row" style={{marginBottom:'35px',marginTop:'65px'}}>
                              
                                  <div className="col-md-6">
                                      {props.shipAddress === undefined ?
                                        <center>
                                            <input onClick={() => props.handleSaveAddress()} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'100px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add"/>
                                        </center>
                                        : <center>
                                        <input onClick={() => props.handleSaveAddress()} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'100px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Update"/>
                                    </center>}
                                    </div>
                                    <div className="col-md-6">
                                         <center>
                                            <input onClick={() => props.showAddressModal('shipping')} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'140px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Change Address"/>
                                        </center>
                                    </div>
                                 

                                </div>
                                 : 
                                 <div className="row" style={{marginBottom:'35px',marginTop:'65px'}}>
                                     <div className="col-md-12">
                                      <center>
                                              <img src={ lazyLoader } style={{height:'60px',width:'60px'}}  alt="lazy-loader"/>
                                           </center>
                                    </div>
                                </div>
                            }


                            </div>  
                        </div>

                        <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                                
                             <div style={{border:'1px solid #eaeaea',padding:'20px',height:'548px'}}>
                                <br/>
                                <center><p style={{color:'black'}} >Billing Address</p></center>
                                <br/>
                                <ul className="form-list">
                                <li className="fields row">
                                    <div style={{ display: 'none' }} className="input-field">                               
                                        <input name="addressId" id="addressId" title="Address ID" className="field-input" type="text" value={props.fields1.addressId}/> 
                                    </div>
                                    <div class="form-group col-sm-6">
                                        <input name="firstName" id="firstName" disabled={props.defBillAdd} autocomplete="new-password" title="First Name" placeholder="First Name" className={props.errors1.firstName ? 'form-control redData': 'form-control'} type="text" onChange={props.handleChange1} value={props.fields1.firstName}/>
                                        
                                    </div>
                                    <div className="input-field col-sm-6">
                                        <input name="lastName" id="lastName" disabled={props.defBillAdd} autocomplete="new-password" title="Last Name" placeholder="Last Name" className={props.errors1.lastName ? 'form-control redData': 'form-control'} type="text" onChange={props.handleChange1} value={props.fields1.lastName} />
                                      
                                    </div>
                                </li>
                                <li className="fields row">
                                    <div className="form-group col-sm-6">
                                        <input name="telephone" id="telephone" disabled={props.defBillAdd} autocomplete="new-password" title="Telephone" className={props.errors1.telephone ? 'form-control redData': 'form-control'} type="text" placeholder="Phone No" onChange={props.handleChange1} value={props.fields1.telephone} />
                                        
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <input name="company" id="company" autocomplete="new-password" disabled={props.defBillAdd} title="Company" className="form-control" type="text" placeholder="Company" onChange={props.handleChange1} value={props.fields1.company}/>
                                       
                                    </div>
                                  </li>
                                  <li className="fields row">
                                    <div className="form-group col-sm-12">
                                    <input name="streetAddress1" id="streetAddress1" disabled={props.defBillAdd} autocomplete="new-password" title="Street Address1" className={props.errors1.streetAddress1 ? 'form-control redData': 'form-control'} type="text" placeholder="Street Address1" onChange={props.handleChange1} value={props.fields1.streetAddress1} />
                                        
                                    </div>
                                  </li>
                                  <li className="fields row">
                                    <div className="form-group col-sm-12">
                                    <input name="streetAddress2" id="streetAddress2" disabled={props.defBillAdd} autocomplete="new-password" title="Street Address2" className="form-control" type="text" placeholder="Street Address2" onChange={props.handleChange1} value={props.fields1.streetAddress2} />
                                        
                                    </div>
                                  </li>
                                  <li className="fields row">
                                        <div className="form-group col-sm-6">
                                            <input name="city" id="city" title="City" disabled={props.defBillAdd} required autocomplete="new-password" className={props.errors1.city ? 'form-control redData': 'form-control'} type="text" placeholder="City" onChange={props.handleChange1} value={props.fields1.city} />
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <select className={props.errors1.selectStateValueBilling ? 'form-control redData': 'form-control'} id="billing_region_id_1" name="region_id" title="State/Province" value={props.selectStateValueBilling} onChange={props.handleStateChange1} >
                                               <option value="">Select region</option>
                                               {
                                                  props.stateListRes &&
                                                  Object.entries(props.stateListRes.available_regions).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.id} id={thisState.id} alt={thisState.id}>{thisState.name}</option>)
                                               }
                                            </select>
                                        </div>
                                  </li>  
                                  <li className="fields row">
                                    <div className="form-group col-sm-12">
                                    <input name="postalCode" id="postalCode" disabled={props.defBillAdd} required autocomplete="new-password" title="Postal Code" className={props.errors1.postalCode ? 'form-control redData': 'form-control'} type="text" placeholder="Postal Code" onChange={props.handleChange1} value={props.fields1.postalCode}/>
                                        
                                    </div>
                                  </li>
                                  {props.shipAddress !== undefined ?
                                  <li className="fields row">
                                  <div className="input-checkbox form-group col-sm-12">
                                    <React.Fragment>
                                       <input type="checkbox" name="defBillAdd" id="defBillAdd" title="Use as My Default Billing Address" onChange={props.handleChangeBill} value={props.defBillAdd} />
                                            <label> &nbsp;Use shipping as billing address</label>
                                            
                                     </React.Fragment>
                                     </div>
                                    </li> 
                                :
                                <li className="fields row">
                                  <div className="input-checkbox form-group col-sm-12">
                                    <React.Fragment>
                                       <input type="checkbox" disabled name="defBillAdd" id="defBillAdd" title="Use as My Default Billing Address" onChange={props.handleChangeBill} value={props.defBillAdd} />
                                            <label> &nbsp;Use shipping as billing address</label>
                                            
                                     </React.Fragment>
                                     </div>
                                    </li> 
                                } 
                              </ul>    
                              <br/>

                              {props.showBillingLoader !== true ?
                              <div>
                              {props.defBillAdd === true ? 
                              
                              <div className="row" style={{marginBottom:'36px'}}>
                                 
                                    <div className="col-md-12">
                                         <center>
                                            <input onClick={() => props.showAddressModal('billing')} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'140px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Change Address"/>
                                        </center>
                                    </div>
                                </div>
                              :
                              <div className="row">
                                  <div className="col-md-6">
                                      {props.billAddress === undefined?
                                        <center>
                                            <input onClick={() => props.handleSaveBillingAddress()} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'100px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add"/>
                                        </center>
                                        : <center>
                                        <input onClick={() => props.handleSaveBillingAddress()} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'100px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Update"/>
                                    </center>}
                                    </div>
                                    <div className="col-md-6">
                                         <center>
                                            <input onClick={() => props.showAddressModal('billing')} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'140px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Change Address"/>
                                        </center>
                                    </div>
                                </div>
                             }
                             </div>
                             : 
                             <div className="row">
                               <div className="col-md-12">
                                   <center>
                                      <img src={ lazyLoader } style={{height:'60px',width:'60px'}}  alt="lazy-loader"/>
                                   </center>
                               </div>
                             </div>
                             
                             }




                            </div>   
                        </div>


                <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                    <div style={{border:'1px solid #eaeaea',padding:'20px',height:'548px'}}>
                                <br/>
                          <div className="fields row" style={{marginTop: '10px'}}>
                                <div className="col-sm-12">
                                   <p style={{color:'black'}}>Payment Method</p>
                                </div>
                           </div>
                        
                           <div className="fields row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                <p>Card Number</p>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="text" className={props.errors2.cardNumber ? 'redData': ''} onChange={props.handleChange2} value={props.fields2.cardNumber} name="cardNumber" id="cardNumber" placeholder="Card Number" style={{height: '40px',width: '200px', paddingLeft: '12px'}}/>
                                </div>
                           </div>
                           <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                <p>Expiration Date</p>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="text" onChange={props.handleChange2} value={props.fields2.expirationDate} className={props.errors2.expirationDate ? 'redData': ''} placeholder="MM/YY" name="expirationDate" id="expirationDate" style={{height: '40px',width: '100px', paddingLeft: '12px'}}/>
                                </div>
                           </div>
                           <div className="fields row" style={{marginTop: '10px'}}>
                                <div className="col-sm-4">
                                <p>CVV</p>
                                </div>
                                <div className="col-sm-8" style={{marginLeft:'-1px'}}>
                                <input type="password" onChange={props.handleChange2}  value={props.fields2.cardCode} className={props.errors2.cardCode ? 'redData': ''} name="cardCode" id="cardCode" placeholder="CVV"  style={{height: '40px',width: '100px', paddingLeft: '12px'}}/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                {props.placeSuccess !== true ?
                                 <center>
                                    <input onClick={() => props.placeShoppingOrder()} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Place Order"/>
                                </center>
                                : 
                                <center>
                                   <img src={ lazyLoader } style={{height:'60px',width:'60px'}}  alt="lazy-loader"/>
                                </center>
                                }
                            </div>


                           </div>
                        </div>

                        <br/>
                    </div>
                    </div>
                    <br/>
                    <br/>
            </div>

              
         {
            props.showAdModal &&
              <MaModal open={props.showAdModal} handleCloseModal={() => props.showAddressModal()}>
                  <div style={{backgroundColor:'#8AB77D',marginTop:'-20px',height:'64px'}}>
                      <center><h3 style={{color:'white',paddingTop:'20px'}}>All Address</h3></center>
                  </div> 
                  <br/><br/>
                  { props.addData !== undefined ?
                   <div>
                          <AliceCarousel
                                              items={props.addData}
                                              responsive={props.responsive}
                                              mouseTrackingEnabled={true}
                                              onSlideChange={props.onSlideChange}
                                              onSlideChanged={props.onSlideChanged}
                                            />
                        
                     <br/>   
                     {props.addTerm !== undefined && props.addTerm === 'shipping'  ?
                     <div className="row">
                         {props.shipAddress !== undefined ? 
                          <div className="col-sm-8" style={{paddingLeft:'30px'}}>
                                    {props.shipAddress.firstName}&nbsp;{props.shipAddress.lastName}&nbsp;,
                                    {props.shipAddress.company}&nbsp;,{props.shipAddress.telephone}&nbsp;,
                                    {props.shipAddress.streetAddress1}&nbsp;,{props.shipAddress.streetAddress2}&nbsp;,
                                    {props.shipAddress.city}&nbsp;,{props.shipAddress.state}&nbsp;,
                                    {props.shipAddress.postalCode}&nbsp;
                          </div>:  <div className="col-sm-8" style={{paddingLeft:'30px'}}>No Billing Address</div>}
                          <div className="col-sm-4">
                                 <center>
                                    <input onClick={() => props.changeShippingAddress(props.shipAddress)} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Update Shipping Address"/>
                                </center>
                          </div> 
                     </div>
                     :
                     <div className="row">
                           {props.shipAddress !== undefined ? 
                           <div className="col-sm-8" style={{paddingLeft:'30px'}}>
                                {props.billAddress.firstName}&nbsp;{props.billAddress.lastName}&nbsp;,
                                {props.billAddress.company}&nbsp;,{props.billAddress.telephone}&nbsp;,
                                {props.billAddress.streetAddress1}&nbsp;,{props.billAddress.streetAddress2}&nbsp;,
                                {props.billAddress.city}&nbsp;,{props.billAddress.state}&nbsp;,
                                {props.billAddress.postalCode}&nbsp;
                        </div>
                          :  <div className="col-sm-8" style={{paddingLeft:'30px'}}>No Shipping Address</div>} 
                        
                         <div className="col-sm-4">
                                 <center>
                                    <input onClick={() => props.changeBillingAddress(props.billAddress)} type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Update Billing Address"/>
                                </center>
                          </div> 
                     </div>
                      } 
                      </div> : 
                      <div>
                           <center>
                             <h1>No Address Found</h1> 
                               <br/>
                                    <input onClick={() => props.handleAddAddress()}  type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'200px',height:'45px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Add New Address"/>
                                </center>
                       </div>
                     }
                  
             </MaModal>
          }



         </div>
        );
    }
    return (

        <div className="cart-empty col-sm-12">
           {props.guestCartData.length !== 0 && props.apiToken === ''?
           
           <div className="container">
           <div style={{border:'2px solid #eaeaea'}}>
             <div className='row'>
               <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
               </div> 
               <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
               </div> 
               <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                   <div className="row" style={{marginTop:'15px'}}>
                       <div className="col-md-4"><p style={{color:'black'}}>Qty</p></div>
                       <div className="col-md-4"><p style={{color:'black'}}>Price</p></div>
                       <div className="col-md-4"><p style={{color:'black'}}>Total</p></div>
                   </div>
                  
               </div> 
            </div>


            { props.guestCartData.map((thisCart, index) => {
                        return (
                        <div key={index} className='row' style={{minHeight:'165px'}} key={index}>
                            <div className='col-lg-5 col-md-5 col-xs-5 col-sm-5'>
                         <React.Fragment>
                               <div>
                                <div className="row">
                                    <div className='col-lg-5 col-md-5 col-xs-5 col-sm-5'>
                                       <div className="row" style={{marginLeft:'0px'}}>
                                                <div className="col-md-2" style={{marginLeft:'0px',marginTop:'56px'}}>
                                                        <a style={{cursor:'pointer'}} onClick={() => props.removeGuestProduct(thisCart.item_id)}>
                                                        <img src={circle} style={{height:'20px',width:'20px'}}/>
                                                        </a>
                                                </div>
                                                <div className="col-md-10">
                                                <div style={{width:'140px',height:'140px',border:'1px solid #eaeaea'}}>
                                                  <img src={thisCart.image} style={{width:'130px',height:'130px'}}/>
                                                </div>
                                               </div>
                                        </div> 
                                    </div>
                                    <div className='col-lg-7 col-md-7 col-xs-7 col-sm-7' style={{marginTop:'30px'}}>
                                     
                                                <p style={{color:'black'}}>{thisCart.name}</p>
                                                   {/*<center>
                                                      <a style={{color:'#8AB77D',cursor:'pointer'}} onClick={() => props.removeProduct(thisCart.item_id)}>(Remove)</a>
                                                   </center>*/}
                                                          <p style={{color:'black'}}>Date of Delivery : {thisCart.custom_attributes.delivery_date}</p>
                                                        
                                                          
                                                        {/* <p className="cart-deli-date">Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p> */}
                                                        {/* <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p> 
                                                        <div style={{ cursor: 'pointer' }} onClick={() => props.removeProduct(thisCart.item_id)} title='Remove Item'>Delete</div>*/}
                                    </div>
                                   
                             </div>  
                            


                             </div> 
                          </React.Fragment>
                                                    
                           </div>


                                <div className='col-lg-3 col-md-3 col-xs-3 col-sm-3'>
                                   <div className="row">
                                      <div className="col-md-12" style={{marginTop:'25px',marginLeft:'-20px'}}>
                                        
                                        <textarea style={{padding:'15px'}}
                                          placeholder='Message'
                                          rows={2}
                                          cols={25}
                                            />
                                            <br/>
                                    </div>
                                  </div>

                                </div>
                                <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                                   <div className="row" style={{marginTop:'25px'}}>
                                                    <div className="col-md-4"><p style={{color:'black'}}> <div className="cart-info quantity">
                                                                <div className="btn-increment-decrement" onClick={() => props.updateGuestCart(thisCart,'sub',thisCart.qty)}>-</div>
                                                                <input className="input-quantity" id="input-quantity-wristWear03" value={thisCart.qty}/>
                                                            <div className="btn-increment-increment" onClick={() => props.updateGuestCart(thisCart,'add',thisCart.qty)}>+</div>
                                                          </div></p></div>
                                        <div className="col-md-4"><p style={{color:'black'}}>{thisCart.price}</p></div>
                                                    <div className="col-md-4"><p style={{color:'black'}}>{thisCart.row_total}</p></div>
                                   </div>

                               </div>
                        </div>
                        )})}
          <div>
              <div className="row">
                  <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                     
                  </div>
                  <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                  </div> 
                  <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                      <div className="row">
                          <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>Sub Total</p></div>
                          <div className="col-md-4"></div>
                                          <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>{props.guestList[0].totals.subtotal}</p></div>
                     </div>
                     <div className="row">
                          <div className="col-md-4"><p style={{color:'black'}}>Discount</p></div>
                          <div className="col-md-4"></div>
                          <div className="col-md-4"><p style={{color:'black'}}>{props.guestList[0].totals.discount}</p></div>
                     </div>
                     <div className="row">
                          <div className="col-md-4"><p style={{color:'black'}}>Shipping Fees</p></div>
                          <div className="col-md-4"></div>
                          <div className="col-md-4"><p style={{color:'black'}}>{props.guestList[0].totals.shipping_amount}</p></div>
                     </div>
                     <div className="row">
                          <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>Grand Total</p></div>
                          <div className="col-md-4"></div>
                          <div className="col-md-4"><p style={{color:'black',fontWeight:'600'}}>{props.guestList[0].totals.grand_total}</p></div>
                     </div>
                  </div> 
                 </div>

             </div>
            <br/><br/>

         </div> 

         <br/>
         <div>
             <div className="row">
                <div className="col-md-12">
                    <center>

                    <button type="button" style={{height:'60px',width:'250px',backgroundColor:'#8AB77D',border:'1px solid',borderRadius:'35px',color:'white'}} className="" onClick={props.showWithoutLogin}>Please login to place your Order</button>
                    </center>

                </div>


             </div>   

         </div>

       
        </div>
     

           : 
           <div>
           <div className="page-title">
               <h1>Shopping Cart is Empty</h1>
           </div>
           <div className="no-cart-empty">
               <p>You have no items in your shopping cart.</p>
               <p>Click <a href="/">here</a> to continue shopping.</p>
           </div>
           </div>
     
           }
               <br/><br/>  
        </div>
    );
}
