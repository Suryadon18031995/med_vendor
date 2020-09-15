import React from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';

class TermsContainer extends React.Component {
  constructor(props) {
    super(props);
   //this.myFunction = this.myFunction.bind(this);
    this.state = {
      test: 'demo12',
      breadCrumbsList: [
        {
          link: '/',
          name: 'home',
        },
        {
          link: undefined,
          name: 'TERM & CONDITIONS',
        },
      ],
    };
  }
  componentDidMount() {
    document.title = 'Terms & Conditions';
  }

  myFunction = (id) => {
    console.log(id);
    this.setState({
       test: id,
    });
    console.log(this.state.test);
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    console.log(this.state.test);
    return (
      <div>
           <section style={{marginTop: '85px'}}>
	            <div className="container">
                  <br/>
                  <center><h5 style={{fontFamily:'Quintessential',fontSize:'20px'}}>ARABELLA BOUQUETS, LLC – DBA: ARABELLA BOUQUETS– TERMS OF SERVICE
                        <br/><br/>
                        </h5>
                  </center>
                

			          	<div className="w3-container">

			
                  <button onClick={() => this.myFunction('demo1')} className={this.state.test === 'demo1' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>1.Using our Website</button>
                   {this.state.test === 'demo1' &&
                   <div id="Demo1" className="w3-container">
                    <br/>
                          <p>To use, view, or access this website, you must be at least eighteen (18) years old.
                      When you access, view, or use this website, you agree to the terms of this Agreement.
                      With the exception of Google, Yahoo!, Bing, AOL, and Ask, you agree that you will not use any spider, crawler, robot, or other computer program to copy or index this website or any content contained therein in any way.
                      We may change, suspend, or discontinue any aspect of this website at any time, including the availability of any website feature. We may also impose limits on certain features and services or restrict your access to parts or all this website without notice or liability.
                      This website may contain links and pointers to other related World Wide Web Internet sites, resources, and our affiliates. These links and pointers to third party sites, maintained by third parties, do not constitute an endorsement by us or any of our subsidiaries or affiliates of any third-party resources, or their contents. Note that such third-party sites may have privacy policies different from ours. Accordingly, you access and use such third-party content at your own risk.
                      We do not represent or endorse the accuracy or reliability of any advice, opinion, statement, or other information displayed or distributed through this website. You acknowledge that any reliance upon any such opinion, advice, statement, memorandum, or information shall be at your sole risk. We reserve the right, in our sole discretion, to correct any errors or omissions in any portion of this website.
                      </p>
                  </div>
                  }
                  <br/>

                  <button onClick={() => this.myFunction('demo2')} className={this.state.test === 'demo2' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>2.Legally Binding Contract</button>
                   {this.state.test === 'demo2' &&
                   <div id="Demo3" className="w3-container">
                    <br/>
                    <p>The first thing you should know is that this Agreement constitutes a legally binding contract between you and Arabella Bouquets. Our official company name is Arabella Bouquets, LLC, but we operate under the name Arabella Bouquets. Hereinafter, whenever we use the terms "Arabella Bouquets," "We," "Us," or "Our," please note that we are referring to Arabella Bouquets, LLC. d/b/a Arabella Bouquets.<br/>
                    We operate nationwide and use FedEx and UPS for delivery, 
                    This Agreement applies to your use of this website as well as any services we provide, such as selling and delivering flowers.<br/>
                    Because we also collect information from you with this website, we also have a Privacy Policy that is expressly incorporated into this Agreement. You can see our Privacy Policy here (Privacy Policy), and it may be updated at any time. You agree to this Agreement by doing any one of the following:<br/>
                    1. Using, accessing, or viewing this website; 2. Registering for and using an online account through this website; 3. Submitting content, such as product reviews, to us for publication; 4. Ordering or purchasing flowers for the delivery of the same from us.<br/>
                    Please read this Agreement carefully. If you do not agree to this Agreement, you may not access or otherwise use this website or purchase products from us.
                    </p>
                  </div>
                  }
                  <br/>

                  <button onClick={() => this.myFunction('demo3')} className={this.state.test === 'demo3' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>3.General Provisions Applicable to All Users</button>
                   {this.state.test === 'demo3' &&
                   <div id="Demo3" className="w3-container">
                    <br/>
                    <p>We reserve the right, at our sole discretion, to change, modify, add or remove any portion of the Agreement, in whole or in part, at any time. Notification of changes in the Agreement will be posted on this website. Such changes shall only be effective after posting such notice.
                        You agree that there are no third-party beneficiaries to the Agreement.<br/>
                        This Agreement constitutes the entire agreement between Arabella Bouquets and you with respect to your use of this website and any transaction with Arabella Bouquets, such as the purchase of flowers and this Agreement is governed by the laws of Delaware. Any cause of action you may have with Arabella Bouquets, including but not limited to claims for breach of contract or relating to claims related to certain representations, must be commenced within two (2) years after the claim or cause of action arises and will be subject to mandatory arbitration. If for any reason a court of competent jurisdiction finds any provision of this Agreement, or portion thereof, to be unenforceable, that provision shall be enforced to the maximum extent permissible so as to effect the intent of this Agreement, and the remainder of this Agreement shall continue in full force and effect.<br/>
                        We will not be deemed to have waived any of our rights or remedies under this Agreement unless such waiver is in writing and signed by us. No delay or omission on our part in exercising any rights or remedies shall operate as a waiver of such rights or remedies or any other rights or remedies. A waiver on any one occasion shall not be construed as a bar or waiver of any rights or remedies on future occasions.<br/>
                        Arabella Bouquets disclaims all responsibility for content contained in any third-party materials provided through links from this website.

                    </p>
                  
                  </div>
                  }
                  <br/>

                  <button onClick={() => this.myFunction('demo4')} className={this.state.test === 'demo4' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>4. Registering For And Using An Account</button>
                   {this.state.test === 'demo4' &&
                   <div id="Demo4" className="w3-container">
                    <br/>
                    <p>To register for or use an online account with Arabella Bouquets, you must be at least eighteen (18) years old.<br/>
							When you register for or use an online account with Arabella Bouquets, you agree to the terms of this Agreement.
							You agree that all information you submit to us is true and correct. You further agree that you will not register for or use an account for any third person or entity.<br/>
							To prevent unauthorized access or use of your account, you agree that you will keep your password confidential and not share it with any third parties. The loss, theft, or unauthorized use of your password or user ID could permit unauthorized persons to gain access to your account and your sensitive personal and account information and to use that information for fraudulent purposes, including identity theft. If you disclose your password, user ID, and other account information to any person or entity, you assume all risks and losses associated with such disclosure. If you permit any other person or entity to use or access your account, you are responsible for any transactions and activities performed from your accounts and for any use of your personal and account information by such person or entity.<br/>
							We may at our option change the parameters for the password used to access your account without prior notice to you, and if we do so, you will be required to change your password the next time you log into your account.
                      </p>
                  </div>
                  }
                  <br/>

                  <button onClick={() => this.myFunction('demo5')} className={this.state.test === 'demo5' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>5. Submitting Content To Our Website</button>
                   {this.state.test === 'demo5' &&
                   <div id="Demo5" className="w3-container">
                    <br/>
                    <p>We encourage you and all our users to submit product reviews to this website. We do not and cannot review all materials posted to this website by users, and we are not responsible for any such materials posted by users. We will not publish all material submitted to this website, so if you submit content such as a product review to us, we may decline to publish it.
                      By submitting content to us, you represent, warrant, and covenant that:<br/>
                      (a) you shall not upload, post, or transmit to or distribute or otherwise publish through this website any materials which <br/>
                      (i) restrict or inhibit any other user from using and enjoying this website,<br/>
                      (ii) are unlawful, threatening, abusive, harassing, libelous, or defamatory,<br/>
                      (iii) constitute or encourage conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate law, <br/>
                      (iv) violate, plagiarize, or infringe the rights of third parties including, without limitation, copyright, trademark, patent, rights of privacy or publicity or any other proprietary right, <br/>
                      (v) contain a virus or other harmful component,<br/>
                      (vi) contain any information, software, or other material of a commercial nature, <br/>
                      (vii) contain advertising of any kind,<br/>
                      (viii) constitute or contain false or misleading indications of origin or statements of fact; and (b) that you are at least eighteen (18) years old.
                      
                      By posting product reviews, messages, uploading files, inputting data, or engaging in any other form of communication (individually or collectively, "Communications") to this website or Arabella Bouquets, you hereby grant to Arabella Bouquets and its successors and assigns a perpetual, worldwide, irrevocable, unrestricted, exclusive, royalty free license to use, copy, license, sublicense, adapt, distribute, display, publicly perform, reproduce, transmit, modify, edit, register for copyright protection, sue for damages for infringement, and otherwise exploit such Communications, in all media now known or hereafter developed. You hereby irrevocably and forever waive all rights to any claim against Arabella Bouquets and its successor and assigns for any alleged or actual infringements of any proprietary rights, rights of privacy and publicity, moral rights, and rights of attribution in connection with such Communications and you hereby irrevocably release Arabella Bouquets and its successors and assigns from any and all such claims.
                      <br/>
                      Unless otherwise prohibited by law, any communication or material you transmit to us via the website or electronic mail is on a on-confidential basis and we may use such communication or material for any purpose consistent with our Privacy Policy, including reproduction, publication, broadcast and posting. We are entitled, but not obligated, to monitor, retain, and review all communications, including those by telephone, email, and other formats, for reasonable business purposes, such as to survey the quality of service that you receive, to assure compliance with this Agreement and industry regulations.<br/>
                      Please note that upon submission, any suggestion, idea, or proposal or other material you provide to us becomes our property without limitation or further consideration.



                  </p>
                  </div>
                  }
                  <br/>


                  <button onClick={() => this.myFunction('demo6')} className={this.state.test === 'demo6' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>6. Service Fee</button>
                   {this.state.test === 'demo6' &&
                   <div id="Demo6" className="w3-container">
                    <br/>
                         <p>The service fee varies based upon a variety of factors related to the specific order placed.  Some of the factors used to determine the service fee are whether it is the same day or next day order, type of item ordered, proximity to a holiday, day of the week, order location and time of day.  The service fee is calculated after you enter what you are ordering, where the item is going and when your order is placed.  The service fee is displayed after it is calculated and prior to the final checkout.
                     </p>
                   </div>
                  }
                  <br/>


                  <button onClick={() => this.myFunction('demo7')} className={this.state.test === 'demo7' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>7. Sale Tax</button>
                   {this.state.test === 'demo7' &&
                   <div id="Demo7" className="w3-container">
                    <br/>
                    <p>On June 21, 2018, the Supreme Court of the United States ruled in favor of the state in South Dakota v. Wayfair, Inc. The decision allows states to tax remote sales.  Economic activity in a state - economic nexus - can trigger a sales tax collection obligation. Economic nexus is based entirely on sales revenue, transaction volume, or a combination of both.<br/>
                        Accordingly, we collect sales tax on all sales delivered to those states that have passed laws regarding economic nexus.
                        You will have an opportunity to review this amount before submitting your order.


                    </p>
                  </div>
                  }
                  <br/>


                  <button onClick={() => this.myFunction('demo8')} className={this.state.test === 'demo8' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>8. Payments</button>
                   {this.state.test === 'demo8' &&
                   <div id="Demo8" className="w3-container">
                    <br/>
                    <p>You acknowledge and agree that all information you provide with regards to a purchase, including, without limitation, credit card or other payment information, is accurate, current and complete. You represent and warrant that you have the legal right to use the payment method you provide to us or our payment processor, including, without limitation, any credit card you provide when completing a transaction. We reserve the right, with or without prior notice, to <br/>
                      (1) discontinue or limit the available quantity of any product or aspect of the Service, <br/>
                      (2) honor, or impose conditions on the honoring of, any coupon, coupon code, promotional code or other similar promotions, and <br/>
                      (3) refuse to allow any user to purchase a product or deliver any product to a user.aims all responsibility for content contained in any third-party materials provided through links from this website.<br/>
                      
                      When you purchase products through the Web Site, you <br/>
                      (1) agree to pay the price for such products set forth, all shipping and handling charges and all applicable taxes in connection with your purchase (the “Full Purchase Amount”) and  <br/>
                      (2) authorize Arabella Bouquets, LLC DBA: Arabella Bouquets to charge your credit card or other payment method for the Full Purchase Amount. Our Web Site may allow you purchase products and designate them to be delivered at a future date. In such instance, you acknowledge and agree that Arabella Bouquets may charge your credit card or other payment method for the Full Purchase Amount on the date of purchase, rather than on the ultimate date of delivery of the applicable products. Unless otherwise noted, all currency references are in U.S. dollars. All fees and charges are payable in accordance with payment terms in effect at the time the fee or the charge becomes payable.
                      Payment can be made by credit card, debit card, or through other means that we may make available. Orders will not be processed until payment has been received in full, and any holds on your account by are solely your responsibility.
                      </p>
                  </div>
                  }
                  <br/>



                  <button onClick={() => this.myFunction('demo9')} className={this.state.test === 'demo9' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>9. Shipment of Products</button>
                   {this.state.test === 'demo9' &&
                   <div id="Demo9" className="w3-container">
                    <br/>
                      <p>Title and risk of loss for any purchases of products pass to you upon our delivery to our carrier. We reserve the right to ship partial orders (at no additional cost to you), and the portion of any order that is partially shipped may be charged at the time of shipment. Unless because of events outside of our direct control, orders of goods purchased by you through the Web Site will be delivered within the time period specified for the delivery method you have selected. All orders are shipped using one of our third-party couriers. The earliest delivery date available for an order is as indicated for the item on the Web Site. Shipping is not available for delivery on ???? if applicable, unless otherwise indicated. Online tracking may be available at our courier’s website (for example, UPS, FedEx), though we make no warranties regarding its availability because it is not under our control. While deliveries may be scheduled for a specified arrival, we cannot guarantee delivery by any specific time. No recipient signature is typically required for deliveries of our products. The courier may leave the package at the address whether the recipient or another person is available or not. We strongly encourage recipients to be at the delivery location to receive the flowers as flowers that remain outside are more likely to wilt and die.
                        <br/>
                        Product purchases (whether by Account holders or non-account holders) will be subject to a shipping fee that is clearly stated prior to completing purchase. As a thank you for your continued business, subscription and scheduled reoccurring deliveries may receive discounted shipping.	
                      </p>
                  </div>
                  }
                  <br/>


                  <button onClick={() => this.myFunction('demo10')} className={this.state.test === 'demo10' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>10. Return and Refund Policy</button>
                   {this.state.test === 'demo10' &&
                   <div id="Demo10" className="w3-container">
                    <br/>
                    <p>Except as provided below, there are no refunds or returns for the goods purchased on the Service. All sales are final. You may receive a replacement bouquet only if <br/>
						•	the wrong item was delivered, the bouquet arrives in substandard condition, or the bouquet was never delivered and <br/>
						•	you complete a customer service request form at arabellabouquets/requestform within three calendar days of the delivery date.<br/>
						In the event the bouquet arrived in substandard condition, you must also attach a photograph of the bouquet to the customer service request form. Credits issued for replacement bouquets cannot be transferred or redeemed for cash.
						In the event the bouquet is delivered on a day other than the selected delivery date, Arabella Bouquets will issue a promotional credit for the amount paid for shipping.
                      </p>
                  </div>
                  }
                  <br/>


                  <button onClick={() => this.myFunction('demo11')} className={this.state.test === 'demo11' ? "w3-button w3-block w3-red w3-left-align" : "w3-button w3-block w3-black w3-left-align"}>11. Copyright And Trademarks</button>
                   {this.state.test === 'demo11' &&
                   <div id="Demo11" className="w3-container">
                    <br/>
                    <p>This website is protected by copyright, pursuant to U.S. copyright laws, international conventions, and other copyright laws. The contents of this website are only for your personal, non-commercial use. All materials contained on this website are protected by copyright and are owned or controlled by Arabella Bouquets. You will abide by all additional copyright notices, information, or restrictions contained on this website. Copying or storing of any portion of this website for other than personal, noncommercial use is expressly prohibited without our prior written permission.
					         	All tradenames, trademarks, servicemarks, trade dress, logos, designs, product names, and service names on this website are owned by Arabella Bouquets. You agree that you will not use the Arabella Bouquets Trademarks without our express permission.</p>
                  </div>
                  }
                  <br/>


                </div>


                </div>
              <br/>
          </section>
      </div>
    );
  }
}
export default TermsContainer;
