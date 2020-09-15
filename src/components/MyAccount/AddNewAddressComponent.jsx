import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function AddNewAddressComponent(props) {
     //console.log(props);
    return (
            <div className="my-account">
                 <div className="recurring-profiles">
                    <h4><b>Location Information</b></h4>

                    <ul className="form-list">
                        <li className="fields row">
                            <div style={{ display: 'none' }} className="input-field">                               
                                <input name="locationId" id="locationId" title="Location Id" className="field-input" type="text" value={props.fields.location_id} /> 
                            </div>
                            <div class="form-group col-sm-6">
                                <label className="required"><em>*</em>Location Name</label>
                                <input name="loc_name" id="loc_name" autocomplete="new-password" title="Location Name" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_name} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_name}</span>
                            </div>
                            <div className="input-field col-sm-6">
                                <label className="required"><em>*</em>Location Customer Display Name</label>
                                <input name="loc_cust_disp_name" id="loc_cust_disp_name" autocomplete="new-password" title="Last Name" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_cust_disp_name} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_cust_disp_name}</span>
                            </div>
                        </li>
                        <li className="fields row">
                            <div className="form-group col-sm-6">
                                <label className="required"><em>*</em>Phone No</label>
                                <input name="loc_phone" id="loc_phone" autocomplete="new-password" title="Telephone" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_phone} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_phone}</span>
                            </div>
                            <div className="form-group col-sm-6">
                                <label className="required"><em>*</em>Location Email</label>
                                <input name="loc_email" id="loc_email" autocomplete="new-password" title="Location Email" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_email} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_email}</span>
                            </div>
                        </li>
                        <li className="fields row">
                        <div className="form-group col-sm-6">
                                <label className="required"><em>*</em>Street Address1</label>
                                <input name="street1" id="street1" autocomplete="new-password" title="Street Address" className="form-control" type="text" onChange={props.handleChange} value={props.fields.street1} />
                                <br/><span style={{ color: 'red' }}>{props.errors.street1}</span>
                            </div>
                            <div className="form-group col-sm-6">
                                  <label>Street Address2</label>
                                <input name="street2" id="street2" autocomplete="new-password" title="Street Address" className="form-control" type="text" onChange={props.handleChange} value={props.fields.street2} />
                              
                            </div>
                        </li>

                        <li className="fields row">
                             <div className="form-group col-sm-6">
                                <label className="required"><em>*</em>City</label>
                                <input name="loc_city" id="loc_city" title="loc_city" autocomplete="new-password" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_city} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_city}</span>
                            </div>
                            <div className="form-group col-sm-6">
                                <label className="required"><em>*</em>State</label>
                                <select className="form-control" id="billing_region_id_1" name="region_id" value={props.selectStateValue} onChange={props.handleStateChange} title="State/Province">
                          <option value="">Please select region, state or province</option>
                          {
                            props.stateListRes &&
                            Object.entries(props.stateListRes).map(([value, thisState]) => <option key={value} /* value={`${thisState.code},${thisState.region_id}`} */ value={thisState.id} id={thisState.id} alt={thisState.id}>{thisState.name}</option>)
                          }
                        </select>
                                <br/><span style={{ color: 'red' }}>{props.errors.state}</span>
                            </div>
                         </li>
                        

                         <li className="fields row">
                         <div className="form-group col-sm-6">
                                <label className="required"><em>*</em>Pincode</label>
                                <input name="loc_postcode" id="loc_postcode" autocomplete="new-password" title="Postal Code" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_postcode} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_postcode}</span>
                            </div>
                            <div className="form-group col-sm-6">
                            <label className="required"><em>*</em>Fax</label>
                                <input name="loc_fax" id="loc_fax" autocomplete="new-password" title="Fax No" className="form-control" type="text" onChange={props.handleChange} value={props.fields.loc_fax} />
                                <br/><span style={{ color: 'red' }}>{props.errors.loc_fax}</span>
                            </div>
                           
                        </li>
                        
                        
                        <br/>
                        <li>
                            <center>
                            <button type="submit" style={{backgroundColor: '#8AB77D',color: 'white',width:'170px',borderRadius: '25px',height:'37px',border:'1px solid'}} className="get-update" onClick={props.handleSaveAddress.bind(props)}>Update Location</button>
                            </center>
                        </li>
                    </ul>
                    

                </div>
                <br/>
                <br/>
            </div>


    );
}
