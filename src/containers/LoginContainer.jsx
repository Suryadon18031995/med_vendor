import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import LoginComponent from './../components/BKMComponent/LoginComponent.jsx';
import { fetchCustomerToken, fetchCustomerDetails } from '../actions/login';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';
import flower from '../assets/img/top-flower.jpg';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
      redirectToHome: false,
      errors: {},
      showError: false,
    };
  }

  componentDidMount() {
    document.title = 'Customer Login';
   // this.props.getAccessToken({ username: 'nandisha@gmail.com', password: 'Nandish@1995' });
   // this.props.getLoginData();
   var tokenpay = TokenPay('tokenpay8413api20205212397382');
   tokenpay.initialize({
    dataElement: '#card', 
    errorElement: '#errorMessage', 
    useStyles: false
  });   
   var form = document.getElementById('paymentForm'); 
      $('#paymentForm').on('submit', function (event) {
      event.preventDefault(); 
      tokenpay.createToken(function (result) {
          var hiddenInput = document.createElement('input'); 
          hiddenInput.setAttribute('type', 'hidden'); 
          hiddenInput.setAttribute('name', 'token'); 
          hiddenInput.setAttribute('value', result.token); 
          console.log("Token: " + result.token);
          form.appendChild(hiddenInput);
          form.submit();
      }, function (result) {
          console.log("error: " + result);
      });
      });
  }

  loginData = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.handleValidation()) {
        this.props.getAccessToken({ username: this.state.email, password: this.state.password });
      }
    }
  };

  loginDataclick = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.handleValidation());
    if(this.handleValidation()) {
      console.log('inside');
      this.props.getAccessToken({ username: this.state.email, password: this.state.password });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log(event);
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;
    // Email
    if (this.state.email === '') {
      formIsValid = false;
      errors.email = 'This is a required field.';
    }
    console.log(this.state.email);
    console.log(this.state.password);
    if (typeof this.state.email !== 'undefined' && this.state.email !== '') {
      const lastAtPos = this.state.email.lastIndexOf('@');
      const lastDotPos = this.state.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors.email = 'Please enter a valid email address. For example johndoe@domain.com.';
      }
    }

    if (this.state.password === '') {
      formIsValid = false;
      errors.password = 'this is a required field';
    }

    if (typeof this.state.password !== 'undefined' && this.state.password !== '') {
      if ((this.state.password).length < 6) {
        formIsValid = false;
        errors.password = 'Please enter 6 or more characters. Leading or trailing spaces will be ignored.';
      }
    }

    this.setState({ errors });
    return formIsValid;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!_isEmpty(_get(nextProps, 'loginData'))) {
      this.setState({
        loginResult: _get(nextProps.loginData, [0, 'message']),
      });
      if (_get(nextProps.loginData, [0, 'message']) === 'success') {
        this.setState({
          loginShow: true,
          redirectToHome: true,
          totalProd: _get(nextProps.loginData, [0, 'cartDetails', 'result']),
          totalProdInCart: _get(nextProps.loginData, [0, 'cartDetails', 'total_products_in_cart']),
          subtotal: _get(nextProps.loginData, [0, 'cartDetails', 'subtotal']),
        });
      } else {
        this.setState({
          showError: true,
        });
      }
    }
  }

  render() {
    console.log(this.props);
    if (this.state.redirectToHome) {
      return <Redirect push to="/customer/account" />;
    }
    let forgotPasswordId; let forgotPasswordRes;
    if (this.props.location.state !== undefined) {
      forgotPasswordRes = this.props.location.state.msg;
      forgotPasswordId = this.props.location.state.id;
    }
    return (
      <div>
        <section>
          <div>
          <img src={flower} alt="#" style={{width:'100%',marginTop:'60px'}} />
          </div>
          </section>
        <section>
            <div className="text-center" style={{marginTop: '5px'}}>
            <h1 style={{fontFamily:'Quintessential',fontSize:'45px'}}>Log In</h1>
            </div>
            {/*<div style={{marginTop: '100px'}}>
                            <form id="paymentForm" action="https://api-test.getbeyondpay.com/PaymentService/RequestHandler.svc" method="post"> 
                                <select class="form-control" name="amount" id="amount">
                                    <option value="25">$25</option>
                                    <option value="50">$50</option> 
                                </select>
                                <div id="card"></div>
                                <div id="errorMessage"></div>
                                <button type="submit">Submit</button>
                                </form>
                                </div>*/}
        </section>
        <ErrorBoundary>
          <LoginComponent
            forgotPasswordRes={forgotPasswordRes}
            forgotPasswordId={forgotPasswordId}
            handleInputChange={this.handleInputChange}
            loginData={this.loginData}
            loginDataclick={this.loginDataclick}
            state={this.state}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAccessToken: data => dispatch(fetchCustomerToken(data)),
  getLoginData: () => dispatch(fetchCustomerDetails()),
});

const mapStateToProps = (state) => {
  const { loginReducer } = state;

  const {
    loginResponseData,
    isFetching: isLoading,
    accessToken,
    error: loginError,
  } = loginReducer || [];

  const error = !_isEmpty(loginError) || _isError(loginError);

  return {
    loginResponseData,
    accessToken,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(LoginContainer));
