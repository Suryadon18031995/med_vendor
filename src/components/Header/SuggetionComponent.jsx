import React from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
// import { Link } from 'react-router-dom';

const Suggetion = (props) => {
    
    //console.log('test:', _get(props.searchedData, 'productIdlist'));
   //// console.log('tested:', Object.values(_get(props.searchedData, 'productIdlist')));
   
    // console.log('sortedProducts', sortedProducts);
    if (props.searchedData.length === 0) {
        return null;
        // eslint-disable-next-line no-else-return
    } else {
        return (
            <div style={{position:'absolute',zIndex:'9999',backgroundColor:'#ffffff',width:'545px',color:'1px solid #f96495'}}>
                <ul className="options">
                    {Array.isArray(props.searchedData) && props.searchedData.map((item, index) => {
                        return (
                            <a
                                key={index} href={`/product/${_get(item, 'sku')}`}                         
                             >
                                 <div className="row" style={{border:'1px solid #eaeaea',marginRight:'0px',marginLeft:'0px',padding:'6px'}}>
                                     <div className="col-md-3"> 
                                     <img
                                            className="img-responsive"
                                            src={item.image}
                                            style={{ width: 60, height: 60 }}
                                        />
                                    </div>
                                    <div className="col-md-7" style={{paddingTop:'10px'}}>
                                    <a
                                         href={`/product/${_get(item, 'sku')}`}
                                        title={item.name}
                                        className="name highlight"
                                    >{item.name}</a>
                                    </div>
                                    <div className="col-md-2" style={{paddingTop:'20px'}}>
                                    <a
                                         href={`/product/${_get(item, 'sku')}`}
                                        title={item.name}
                                        className="name highlight"
                                        >{item.price}</a>
                                    </div>

                                </div>                  


                            </a>
                        );
                    })}
                </ul>
                {/*<div className="all">
                    <span
                        className="cursor-click all-result text-right"
                        onClick={props.handleAllResultRedirection}
                    >All search results →</span>
                </div>*/}
            </div>
        );
    }
};
export default Suggetion;
