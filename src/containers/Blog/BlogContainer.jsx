// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import _isError from 'lodash/isError';
import moment from 'moment';
import Redirect from 'react-router/Redirect';
import Image from 'react-image-resizer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import SidebarBlog from '../../components/Blog/SidebarBlog.jsx';
import BreadcrumbBlog from '../../components/Blog/BreadcrumbBlog.jsx';
import SocialMediaIcons from '../../components/Blog/SocialMediaIcons.jsx';
import {
  fetchBlogPostsData,
  fetchCatIdData,
  fetchBlogCategoriesData,
  fetchCommentsData,
  fetchInstaFeedData,
} from '../../actions/blog';
import ArticlePreview from '../../components/Blog/ArticlePreview.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import blog from '../../assets/img/aboutus1.jpg';
import f4 from '../../assets/img/f4.jpg';
import f5 from '../../assets/img/f5.jpg';
import f3 from '../../assets/img/f3.jpg';

class BlogContainer extends Component {
  // constructor(props) {
  //   super(props);
  state = {
    posts: [],
    categoryList: [],
    carousalData: [],
    archivesData: [],
    archivesList: [],
    comments: undefined,
    searchValue: undefined,
    redirectToSearchPage: false,
    apiBroke: false,
    currentImage: 0,
    currentImageLink: null,
    breadCrumbsList: [
      {
        link: '/',
        name: 'home',
      }
    ],
  };
  // }

  componentDidMount() {
    document.title = 'Blog';
   // this.props.fetchBlogsData();
    //this.props.fetchBlogsCategoriesData();
    //this.props.fetchCommentsData();
    //this.props.fetchInstaFeedData();
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (!_isEmpty(nextprops.blogPosts)) {
      if (_get(nextprops.blogPosts, 'code') === 404) {
        return this.setState({ apiBroke: true });
      }
      const carousalData = nextprops.blogPosts && nextprops.blogPosts.map(eachPost => ({
        id: _get(eachPost, 'id'),
        title: _get(eachPost, 'title.rendered'),
        imageUrl: _get(eachPost, ['_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'featured', 'source_url']),
      }));
      const archivesData = _groupBy(_get(nextprops, 'blogPosts'), archive => archive.date && moment(archive.date).startOf('month').format('YYYY MM'));
      const archivesList = Object.keys(archivesData);
      this.setState({
        posts: nextprops.blogPosts,
        carousalData: carousalData.length > 5 ? carousalData.slice(0, 5) : carousalData,
        archivesData,
        archivesList,
      });
    }
    if (!_isEmpty(nextprops.blogCategories)) {
      this.setState({ categoryList: nextprops.blogCategories });
    }
    if (!_isEmpty(nextprops.commentsData)) {
      this.setState({ comments: nextprops.commentsData > 5 ? nextprops.commentsData.slice(0, 5) : nextprops.commentsData });
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  handleSearchClick = () => {
    this.setState({
      redirectToSearchPage: true,
    });
  }

  onCurrentImageChange = (index) => {
    this.setState({
      currentImage: index,
      currentImageLink: _get(this.props.instaFeedData, [index, 'link']),
    });
  }

  render() {
    if (this.state.redirectToSearchPage) {
      return (
        <Redirect push to={{
          pathname: '/blog/search',
          state: { searchValue: this.state.searchValue },
        }} />
      );
    }
    return (
       <div>
         <section style={{marginTop:'114px'}}>
           <div className="row">

                      <center>
                      <h1 style={{fontFamily:'Quintessential',fontSize:'35px'}}>Blog</h1>
                      </center>
             </div>

         </section>
         <section style={{marginTop:'10px'}}>
             <div className="container">
                 <h5 style={{fontFamily:'Quintessential',fontSize:'30px',textTransform:'none'}}>Handling your flowers</h5>
                <br/>
                <p style={{color:'black'}}>Hello and welcome to Arabella Bouquets!</p>
                <br/>
                <p style={{color:'black'}}>My name is Zachary and I am our resident flower and customer experience expert! You can look forward to seeing my blogs each month as we continue to bring awareness to the floral industry and help you have the most informed experience possible. 
                   Today, I will be going over how to properly care for your new bouquet to help ensure your gorgeous gift lasts as long as possible! After following these easy steps, you can call yourself a flower care expert, so let’s get started.</p>
                <br/>
                <div className="row">
                      <div className="col-md-2">
                      <Image width={170}
                                                    height={170}
                                                  alt='s' src={f4} resizeMode='contain'/>
                      </div>
                      <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-2">
                                <p style={{color:'black',fontWeight:600}}>
                                First Step:</p> 
                                </div>
                                <div className="col-md-10" style={{marginLeft:'-80px'}}>
                                 <p style={{color:'black'}}>Cut each stem at a 45-degree angle</p>
                                 </div>
                            </div>
                        <br/>
                          <p style={{color:'black'}}>
                          Once your bouquet is received you will notice that they may be a little dehydrated from their journey to your home. There’s no need to worry, we can definitely fix this! To ensure that each stem is properly hydrated, you will need to cut each stem at a 45-degree angle. “Why a 45-degree angle?” you may ask. Well the reasoning behind that is so the stems of your bouquet will not sit flat on the bottom of the vase. When flower stems are cut flat, they will be sitting on the bottom of the vase and it will be extremely hard for them to properly drink enough water. 
                           </p>
                      </div>
                </div>
                <br/>
                <div className="row">
                      <div className="col-md-2">
                      <Image width={170}
                                                    height={170}
                                                  alt='s' src={f5} resizeMode='contain'/>
                      </div>
                      <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-2">
                                <p style={{color:'black',fontWeight:600}}>
                                Second Step:</p> 
                                </div>
                                <div className="col-md-10" style={{marginLeft:'-50px'}}>
                                 <p style={{color:'black'}}>Fill your vase half-way with warm water and add half of the pack of flower food.</p>
                                 </div>
                            </div>
                        <br/>
                          <p style={{color:'black'}}>
                          Once you have properly cut each stem of your bouquet, it is time for the flowers to hydrate! Simply fill your vase half-way with lukewarm water. The warm water will allow your flowers to bloom much faster than cold water. After your vase is filled with water, add one half of the pack of flower food to your vase and stir with a spoon. Flower food gives your flowers the wake-up call they need! The veins within each flower will expand allowing water to circulate throughout the roses. This process will have to be repeated after 48 hours, be sure to fill the vase with fresh water and use the rest of the flower food! 
                           </p>
                      </div>
                </div>

                <br/>
                <div className="row">
                      <div className="col-md-2">
                      
                      <Image width={170}
                                                    height={170}
                                                  alt='s' src={f3} resizeMode='contain'/>
                      </div>
                      <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-2">
                                <p style={{color:'black',fontWeight:600}}>
                                Third Step:</p> 
                                </div>
                                <div className="col-md-10" style={{marginLeft:'-80px'}}>
                                 <p style={{color:'black'}}> Place your bouquet in the vase and enjoy</p>
                                 </div>
                            </div>
                        <br/>
                          <p style={{color:'black'}}>
                          After completing the first two steps, your bouquet is ready to make a statement. After 48-72 hours you will see your flowers start to bloom in front of your eyes. Each day your bouquet will continue to brighten up the room and bring joy to whomever sees it. 
                           </p>
                      </div>
                </div>


            
             </div>
             <br/>
         </section>
         <br/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchBlogsData: () => dispatch(fetchBlogPostsData()),
  fetchPostCategory: () => dispatch(fetchCatIdData()),
  fetchBlogsCategoriesData: () => dispatch(fetchBlogCategoriesData()),
  fetchCommentsData: () => dispatch(fetchCommentsData()),
  fetchInstaFeedData: () => dispatch(fetchInstaFeedData()),
});

const mapStateToProps = (state) => {
  const { blogReducer } = state;

  const {
    blogPosts,
    // catIds,
    blogCategories,
    commentsData,
    error: blogError,
    // isFetching: isLoading,
    instaFeedData,
  } = blogReducer || [];

  const error = !_isEmpty(blogError) || _isError(blogError);
  return {
    blogPosts,
    // catIds,
    blogCategories,
    commentsData,
    error,
    // isLoading,
    instaFeedData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BlogContainer));
