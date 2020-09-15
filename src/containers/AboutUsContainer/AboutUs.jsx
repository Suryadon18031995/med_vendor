import React from 'react';
import ReactDOM from 'react-dom';
import _get from 'lodash/get';
import MetaTags from 'react-meta-tags';
import ExploreImage from '../../assets/images/Explore.png';
import GrowerImage from '../../assets/images/Grower.png';
import DeliveryImage from '../../assets/images/Delivery.png';
import DeliveredImage from '../../assets/images/Delivered.png';
import SustainabilityImage from '../../assets/images/sustainability-seal.png';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import Web from '../../assets/img/d.jpg';
import Mobile from '../../assets/img/aboutusmobile.jpg';
import aboutus from '../../assets/img/aboutus1.jpg';
import data from '../../assets/img/d.jpg';

class AboutUsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: undefined,
          name: '',
        },
      ],
    };
  }
  componentDidMount() {
    document.title = 'About Us';
    // document.title = 'About Us';
    // const meta = document.createElement('meta');
    // // meta.httpEquiv = 'X-UA-Compatible';
    // meta.content = 'width=device-width, initial-scale=1';
    // meta.name = 'about';
    // meta.description = 'about';
    // meta.title = 'bhavitha';
    // document.getElementsByTagName('head')[0].appendChild(meta);
    //this.scrollToDiv();
  }
  componentDidUpdate(prevProps) {
    
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        
          <section id="banner_parallax" className="slide_banner1" style={{marginTop: '93px'}}>
	             	<img src={data} style={{height:'500px',width:'100%',marginTop: '20px'}} />
              </section>
              <section>
            <div className="text-center">
            <h1 style={{fontFamily:'Beautiful People Personal Use',fontSize:'45px'}}>About Us</h1>
            </div>
          </section>
          <section className="layout_padding cross_layout1">
              <div className="">
                  <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
              <p className="p_data" style={{fontWeight:'600 !important'}}>
                  Arabella Bouquets represents the most consistent flower buying experience, our goal is to exceed our customers’ expectationswith each delivery. Customer loyalty is what we strive for, our bouquets contain the highest quality flowers and our team has created a seamless platform to help ensure the best experience possible for our customers.
              <br/>


                  </p>
              </div>
                <div className="col-md-1"></div>
                  </div>
              </div>
      </section>
	  
	   <section style={{paddingBottom: '100px'}}>
         <div className="">
            <div className="row">
			        	<div className="col-md-1"></div>
			        	<div className="col-md-10">
			          	<div className="row">
                    <div className="col-md-6">
                   <img src={aboutus} alt="#" style={{width:'100%'}} />
                   </div>
                    <div className="col-md-6">
                      <p className="p_data" style={{fontWeight:'600 !important',marginTop: '10px'}}>
                        Farm direct flowers is our core principle, something we will never compromise on. In order to provide the best bouquets possible, all of our bouquets are shipped directly from our farm to ensure your gift is as fresh as possible for an extended vase life. All of our bouquets are shipped using two-day priority shipping, the majority of your gifts journey is temperature controlled to ensure that your bouquet arrives in peak condition!
                        <br/><br/>
                        We are very particular about providing bouquets that are remarkably similar to the pictures you see when your gift is purchased. We want to not only ensure that you will receive the highest quality bouquet, but also a bouquet that you can just sit back and enjoy the flowers bloom right in front of your eyes! At Arabella Bouquets, you will always receive a great value bouquet that exceeds expectations and brings a smile to whoever may receive the bouquet, guaranteed. 
                        
                     </p>
                     <br/>
                     
                    </div>	
		       		</div>
			      <div className="col-md-1"></div>
            </div>
         </div>
         </div>
      </section>
      
      <section>
        <center><p style={{color:'black'}}>
                       One can reach us at -:
                        Arabella Bouquets
                        9450 W Bryn Mawr Ave Suite 700
                        Rosemont, IL 60018
                        Phone No : 856-361-6829</p></center>
      </section>
      </div>
    );
  }
}
export default AboutUsContainer;
