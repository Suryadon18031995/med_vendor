import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

var addressBook = (props) => {
    console.log(props);
    return (
         <div>
            <div className="my-account">
            {Array.isArray(props.allLocations) &&
                                props.allLocations.map((loc, index) => (
                    <div key={index} className="col-md-12 col-sm-12 col-xs-12"  style={{backgroundColor: '#eaeaea',height:'200px',marginTop:'15px'}}>
                             <div style={{color:'white',fontSize: '14px',fontWeight: '700',backgroundColor: 'rgb(137, 141, 144)',textTransform: 'none',width:'104%',padding:'10px',marginLeft:'-16px'}}>
                             Location {index+1}
                              </div>
                                    
                                    <div className='row'>
                                         <div className="col-sm-8">
                                             <br/>
                                                  <p><span style={{fontWeight:'500'}}>Location Name:</span> {loc.loc_name}</p><br/>
                                              <p className="marginTopData"><span style={{fontWeight:'500'}}>Location Display Name:</span> {loc.loc_cust_disp_name}</p><br/>
                                             <p className="marginTopData"><span style={{fontWeight:'500'}}>Phone No:</span> {loc.loc_phone}</p> <br/>
                                              <p className="marginTopData"><span style={{fontWeight:'500'}}>Email:</span> {loc.loc_email}</p> <br/>
                                              <p className="marginTopData"><span style={{fontWeight:'500'}}>Address:</span> {loc.address.street[0]},{loc.address.loc_city},
                                              {loc.address.loc_state.name},{loc.address.loc_country.name},
                                              {loc.address.loc_postcode}</p>
                                              <br/>
                                         </div>
                                        <div className="col-sm-4">
                                           <center>
                                                <a type="submit" style={{cursor:'pointer'}} className="locButton" onClick={() => props.handleEditLocation(loc)}><b>Edit Location</b></a>
                                                   
                                               </center>
                                               <br/>
                                            <center>
                                            <a type="submit" style={{cursor:'pointer'}} className="locButton"><b>View Logistics</b></a>
                                               
                                            </center>
                                        </div>
                                  
                                    </div>
                                    <br/>
                    </div>  
                   
                     ))}   
               
            </div>
        </div>  
    );
}

export default addressBook;
