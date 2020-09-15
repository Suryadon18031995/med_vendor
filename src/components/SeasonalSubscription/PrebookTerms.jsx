import React from 'react';
import imglogo from '../../assets/images/bloom_logo_small.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

const breadCrumbsList = [
    {
        link: '/',
        name: 'HOME PAGE',
    },
    {
        link: '/prebook-flower-subscription.html',
        name: 'SUBSCRIPTION',
    },
    {
        link: undefined,
        name: 'SUBSCRIPTION TERMS',
    },
];

function SubscriptionTerms() {
    window.scrollTo(0, 0);
    return (
        <React.Fragment>
            <BreadCrumbs
                list={breadCrumbsList} />
            <div className='container'>
                <div className='col-lg-12 col-sm-12 col-md-12 col-xs-12'>
                    <div className='annual-heading prebook-heading'>
                        <h3>CHRISTMAS GREENS PRE-BOOK PROGRAM</h3>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-md-6 col-xs-12'>
                        <div className='prebook-terms-block-mobile'>
                            <div className='inner-div'>
                                <span className='inner-div-terms'>Holiday Pre-Book</span>
                                <span className='inner-div-terms-sub'>starts now and ends October 4th, 2019</span>
                                <img src={imglogo} alt='logo' />
                                <span className='inner-div-terms-week'>Select your delivery day to arrive</span>
                                <span className='inner-div-terms-week'>between Dec. 2nd-Dec.5th</span>
                            </div>
                        </div>
                        <div className='faq-block-annual'>
                            <div className='faq-annual-desc'>
                                By electronically agreeing, I hereby subscribe to the items indicated on this order.  You may charge my credit or debit card for the one-time charge approximately one week ahead of my first shipment.  I further agree:
                    </div>
                            <ol>
                               
                                <li>
                                    Any damages to all partied are limited to the amount paid or agreed to be paid.
                                </li>
                             
                                <li>
                                    Credit Cards will be charged 7 days before delivery date.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <div className='prebook-terms-block'>
                            <div className='inner-div'>
                                <span className='inner-div-terms'>Holiday Pre-Book</span>
                                <span className='inner-div-terms-sub'>starts now and ends October 4th, 2019</span>
                                <img src={imglogo} alt='logo' />
                                <span className='inner-div-terms-week'>Select your delivery day to arrive</span>
                                <span className='inner-div-terms-week'>between Dec. 2nd-Dec.5th</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SubscriptionTerms;
