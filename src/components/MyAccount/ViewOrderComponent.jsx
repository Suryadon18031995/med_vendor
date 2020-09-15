import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import { Link } from 'react-router-dom';
// import Modal from 'react-bootstrap/lib/Modal';
// import OneColumLeft from './OneColumnLeftMyAccount.jsx';
// import MapComponent from '../../components/BKMComponent/MapComponent.jsx';
// import greenMarker from '../../assets/images/green_marker.png';
// import redMarker from '../../assets/images/red_marker.png';
// import blueMarker from '../../assets/images/blue_marker.svg';
// import dottedLine from '../../assets/images/dotted-line.svg';
// import redLine from '../../assets/images/red_line.png';

export default function ViewOrderComponent(props) {
    console.log(props.state);
    return (
        <div>
            {/* {_get(props.state, 'showLeftTabAndMoreDetails') &&
                <div className="col-md-3">
                    <OneColumLeft
                        salesRepUser={props.salesRepUser}
                    />
                </div>
            } */}
            <div className="" style={{marginTop:'70px'}}>
                <div className="col-md-12 info-top clearfix" style={{ marginTop: '5%', marginBottom: '3%' }}>
                    <div className="col-md-4 col-sm-4 col-lg-2">
                        <div className="back">
                            
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-2" style={{ marginTop: '3px' }}>
                        <div className="page-title title-buttons">
                            <h3 style={{ color: '#000', fontSize: '20px' }}>
                               <center>Order #{props.state.orderNumber}</center>
                            </h3>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-2">
                        <div className="back">
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-12" style={{ marginBottom: '3%' }}>
                <div className="col-md-4">
                    <span className="view-order-sub" style={{color:'black'}}>Shipping Address</span><br/><br/>
                    <span>{props.state.billingAddress.firstname}&nbsp;{props.state.billingAddress.lastname}</span><br/>
                    <span>{props.state.billingAddress.street}</span><br/>
                    <span>{props.state.billingAddress.postcode}</span><br/>
                    <span>{props.state.billingAddress.city}</span><br/>
                    <span>T: {props.state.billingAddress.telephone}</span><br/>
                </div>
                <div className="col-md-4" >
                    <span className="view-order-sub" style={{color:'black'}}>Billing Address</span><br/><br/>
                    <span>{props.state.billingAddress.firstname}&nbsp;{props.state.billingAddress.lastname}</span><br/>
                    <span>{props.state.billingAddress.street}</span><br/>
                    <span>{props.state.billingAddress.postcode}</span><br/>
                    <span>{props.state.billingAddress.city}</span><br/>
                    <span>T: {props.state.billingAddress.telephone}</span><br/>
                </div>
                <div className="col-md-4">
                    <span className="view-order-sub" style={{color:'black'}}>Payment Method</span><br/><br/>
                    <span>Card Number: &nbsp; &nbsp;{_get(props.state, 'paymentMethod.card_number')}</span><br/>
                    <span>Card Type:&nbsp; &nbsp; {_get(props.state, 'paymentMethod.card_type')}</span><br/>
                    <span>Payment Method : &nbsp; &nbsp;{_get(props.state, 'paymentMethod.payment_method')}</span><br/>
                </div>
                </div>
                
                {
                    // _get(props.state, 'showMap') ?
                    // <div className="map-component">
                    //     <legend id="legend" className="map-info">
                    //     <div className="col-md-12 col-sm-12">
                    //     <div className="col-md-1 col-sm-2">
                    //         <img src={greenMarker}/>:Origin
                    //     </div>
                    //     <div className="col-md-2 col-sm-2">
                    //         <img src={redMarker}/>:Present Location
                    //     </div>
                    //     <div className="col-md-2 col-sm-2">
                    //         <img src={blueMarker}/>:Destination
                    //     </div>
                    //     <div className="col-md-2 col-sm-2">
                    //         <img src={redLine} style={{ width: '27px' }}/>:Delivered
                    //     </div>
                    //     <div className="col-md-3 col-sm-2">
                    //         <img src={dottedLine} style={{ width: '27px' }}/>:Yet to be Delivered
                    //     </div>
                    //     <div className="col-md-2 col-sm-2">
                    //         <input className="reset-btn" type="button" name="reset" value="Reset Map" id="reset"/>
                    //     </div>
                    //         </div>
                    //     </legend>
                        // {/* <MapComponent
                        //     state={props.state}
                        //     markers={props.state.mapDetails}
                        //     onToggleOpen={props.onToggleOpen}
                        //     bounds={props.bounds}
                        // /> */}

                //         <div className="table-component">
                //             {Object.keys(_get(props.state, 'orderDetails')).map((key) => {
                //                 return (<div>
                //                     <h4>{key}</h4>
                //                     <div>
                //                         <table className="table-bordered view-order-table">
                //                             <thead>
                //                                 <th>Image</th>
                //                                 <th>Product Name</th>
                //                                 <th>Box Count</th>
                //                                 <th>Price</th>
                //                                 <th>Total Price</th>
                //                                 <th>Delivery Date</th>
                //                                 <th>Invoice Date</th>
                //                                 <th>Invoice No</th>
                //                                 <th>Invoice Amount</th>
                //                                 <th>Write Review</th>
                //                                 <th>Track Details</th>
                //                             </thead>
                //                             <tbody>
                //                                 {Object.entries(_get(props.state, ['orderDetails', key])).map((product, pKey) => {
                //                                     return <tr key={pKey}>
                //                                         <td>
                //                                             <img className="thumimg" src={product[1].image} /></td>
                //                                         <td>{product[1].product_name}
                //                                             <span>
                //                                                 <Button className="view-order-btn" onClick={() => props.handleMoreProductDetail(product[1].product_more_details)}>view </Button>
                //                                             </span>
                //                                         </td>
                //                                         <td>{product[1].box_count}</td>
                //                                         <td>{product[1].price}</td>
                //                                         <td>{product[1].total_price}</td>
                //                                         <td>{product[1].delivery_date}</td>
                //                                         <td>{product[1].invoice_date}</td>
                //                                         <td>{product[1].invoice_number}</td>
                //                                         <td>{product[1].total_price}</td>
                //                                         <td><Button className="view-order-btn" onClick={() => props.handleWriteReview(product[1].product_id, product[1].url_key)}>Click</Button></td>
                //                                         <td><Button className="view-order-btn" onClick={() => props.handleTrackDetails(product[1].track_details)} >View</Button></td>
                //                                     </tr>;
                //                                 })
                //                                 }
                //                             </tbody>
                //                         </table>
                //                     </div>
                //                 </div>
                //                 );
                //             })
                //             }
                //         </div>
                //         {/* track Details Modal */}
                //         <Modal show={props.state.show} onHide={props.handleClose}>
                //             <Modal.Header closeButton />
                //             <div className="vieworder-tablegrid">
                //                 <table id="beh_popup" className="vieworder-tablepopup" >
                //                     <thead style={{ background: '#F1F1F1' }}>
                //                         <tr class="table-active">
                //                             <th>Sl No</th>
                //                             <th>Product Name</th>
                //                             <th>Delivery Method</th>
                //                             <th>Tracking Number</th>
                //                             <th>Box Id</th>
                //                             <th>Box Status</th>
                //                         </tr>
                //                     </thead>
                //                     <tbody>
                //                         {_get(props.state, 'trackDetails') && Object.entries(_get(props.state, 'trackDetails')).map((track, key) => {
                //                             return <tr>
                //                                 <td>{key + 1}</td>
                //                                 <td>{track[1].product_name}</td>
                //                                 <td>{track[1].delivery_method}</td>
                //                                 <td>{track[1].tracking_number ? track[1].tracking_number : track[1].box_id}</td>
                //                                 <td>{track[1].box_id}</td>
                //                                 <td>{track[1].box_status}</td>
                //                             </tr>;
                //                         })
                //                         }
                //                     </tbody>
                //                 </table>
                //             </div>
                //         </Modal>
                // {/* product more detail modal */}
                //         <Modal show={props.state.showMoreData} onHide={props.handleMoreProductClose}>
                //             <Modal.Header closeButton />
                //             <div className="vieworder-moredetailview">More Detail</div>
                //             <hr />
                //             <div className="prodname-view">
                //                 <span>Color:{_get(props.state, 'productMoreData.color')}</span><br />
                //                 <span>Variety:{_get(props.state, 'productMoreData.variety')}</span><br />
                //                 <span>Farm:{_get(props.state, 'productMoreData.farm')}</span><br />
                //                 <span>Country:{_get(props.state, 'productMoreData.country')}</span><br />
                //                 <span>Qty Ordered:{_get(props.state, 'productMoreData.qty_ordered')}</span><br />
                //                 <span>Order Date:{_get(props.state, 'productMoreData.ordered_date')}</span>
                //             </div>
                //         </Modal>
                //     </div> :
                    <div>
                        <div>
                            <div>
                                <h3><strong>Items Ordered</strong></h3>
                                <table className="table table-bordered vieworder-table" id="box_id_null_det">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Qty</th>
                                            <th>Unit Cost</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_get(props.state, 'orderDetails') && Object.values(_get(props.state, 'orderDetails')).map((product, key) =>
                                            // console.log(product);
                                            { let sum = 0;
                                            const abc = product.items.map((each, i) => {
                                                sum += each.row_total;
                                                return <tr key={`${key} ${i}`}>
                                                <td style={{ textAlign: 'center' }}>{each.name}</td>
                                                <td style={{ textAlign: 'center' }}>{each.qty_ordered}</td>
                                                <td style={{ textAlign: 'right' }}>${each.price}</td>
                                                <td style={{ textAlign: 'right' }}>${each.row_total}</td>
                                            </tr>;
                                            });
                                            sum > 0 && abc.push(<tr key={sum}>
                                                <td style={{ border: 'none' }}></td>
                                                <td style={{ border: 'none' }}></td>
                                                <td style={{ border: 'none' }}></td>
                                                <td style={{ textAlign: 'right', fontWeight: '600' }}>{sum > 0 ? `$ ${sum}` : ''}</td>
                                                
                                                </tr>);
                                            return abc;
                                        }
                                        )}
                                        {/* <tr>
                                        </tr> */}
                                        {/* <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>SubTotal</th>
                                        <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>{props.state.subTotal}</td>
                                        <tr>
                                        </tr>
                                        <th colSpan="6" style={{ textAlign: 'right', border: '1px solid #ddd' }}>Shipping and Handling</th>
                                        <td colSpan="7" style={{ textAlign: 'center', border: '1px solid #ddd' }}>{props.state.shippingAndHandling}</td>
                                        <tr>
                                        </tr>
                                        <th colSpan="6" style={{ textAlign: 'right' }}>GrandTotal</th>
                                        <td colSpan="7" style={{ textAlign: 'center' }}>{props.state.grandTotal}</td> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {_get(props.state, 'showLeftTabAndMoreDetails') &&
                <div className="col-md-3 extra">
                    <div>
                        <h4>More Details</h4>
                    </div>
                    <div>
                        <h5>Shipping Address</h5>
                        <div>
                            <span>{_get(props.state.shippingAddress, 'name')}</span><br />
                            <span>{_get(props.state.shippingAddress, 'street1')}</span><br />
                            <span>{_get(props.state.shippingAddress, 'street2')}</span><br />
                            <span>{_get(props.state.shippingAddress, 'city_region_postcode')}</span><br />
                            <span>{_get(props.state.shippingAddress, 'country')}</span><br />
                            <span>{_get(props.state.shippingAddress, 'telephone')}</span><br />
                        </div>
                    </div>
                    <div>
                        <h5>Billing Address</h5>
                        <div>
                            <span>{_get(props.state.billingAddress, 'name')}</span><br />
                            <span>{_get(props.state.billingAddress, 'street1')}</span><br />
                            <span>{_get(props.state.billingAddress, 'street2')}</span><br />
                            <span>{_get(props.state.billingAddress, 'city_region_postcode')}</span><br />
                            <span>{_get(props.state.billingAddress, 'country')}</span><br />
                            <span>{_get(props.state.billingAddress, 'telephone')}</span><br />
                        </div>
                    </div>
                    <div>
                        <h5>Payment Method</h5>
                        <div>
                            <span>{_get(props.state, 'paymentMethod.payment_method')}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
