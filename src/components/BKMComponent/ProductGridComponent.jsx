import React, { Fragment } from 'react';
import _get from 'lodash/get';
import Datetime from 'react-datetime';
import Image from 'react-image-resizer';
import '../../assets/stylesheets/DatePickerReact.css';

export default function ProductGridComponent(props) {
    const renderDay = (inputProps, currentDate, selectedDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (props.dateObjectArray && Object.keys(props.dateObjectArray[props.index]).length && props.dateObjectArray[props.index][formattedDate]) {
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
                <div className="delivery-opinion">
                        <b className='delivery-by-grid'>Delivery By{' '}</b>
                        <span className='del-date'>
                        {_get(props.deliveryData, 'delivery_date_form')}
                        </span>
                        <span className="grid-calendar" onClick={openCalendar}>
                        {/* // commented temporarily */}
                            {/* <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} /> */}
                        </span>
                </div>
            </div>
        );
    };

    return (
            <div className='col-md-4'>
                   <center>
                         <div style={{height:'390px',width:'350px',margin:'15px'}}>
                              <div style={{height:'285px',width:'300px',border:'1px solid #eaeaea'}}>
                                <a style={{cursor:'pointer'}}>
                                    <Image width={232}
                                    height={280}
                                    alt={props.thisData.name} src={props.thisData.image} resizeMode='contain'/>
                                </a>  
                                </div>    
                            <br/>
                            <div className="row" style={{width:'300px',marginTop:'5px'}}>                                  
                                             <div className="col-md-10"><p><a style={{color:'black',fontFamily: 'Quintessential',fontSize:'16px',marginLeft:'-19px',cursor:'pointer'}}>{props.thisData.name}</a></p></div>
                                               <div className="col-md-2"><p><a style={{color:'black',fontFamily: 'Quintessential',fontSize:'16px',marginLeft:'-19px',cursor:'pointer'}}>${props.thisData.price}</a></p></div>
                                               
                                         </div>
                             
                            
                              
                       
                        </div>
                    </center>
                        
                </div>
            
    );
}
