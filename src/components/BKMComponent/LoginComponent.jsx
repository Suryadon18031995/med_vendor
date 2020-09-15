import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';


export default function LoginComponent(props) {
  return (
    <div>
      <div className="container">
          <div className="row">
              <div class=" col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
                <div id="CustomerLoginForm" style={{marginTop:'30px'}}>
                <div className="row">
										<div className="col-sm-12 field1" style={{ border: '1px solid black !important' }}>
											<input type="text" name="email" value={props.state.email}
                    onChange={props.handleInputChange} id="email" placeholder="Email Address" required="" />
                     <span>{_get(props.state, 'errors.email')}</span>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 field1" style={{ border: '1px solid black !important' }}>
											<input type="password" id="password" name="password" value={props.state.password}
                  onChange={props.handleInputChange}
                  onKeyUp={props.loginData.bind(this)} placeholder="Password" required=""/>
                  <span>{props.state.errors.password}</span>
										</div>
									</div>
                  <div className="field">
                                      <center>
                                        <input onClick={props.loginDataclick.bind(this)} type="submit" style={{backgroundColor: '#f96495',color: 'white',width:'170px',borderRadius: '25px'}} className="field_bt" value="SUBMIT"/>
                                      </center>
                                    </div>
                </div>
                
              </div>
          </div>
      </div>
      <br/>
      <br/>
    </div>
  );
}
