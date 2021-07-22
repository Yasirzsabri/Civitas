require('./auth/configurePassport')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var passport = require('passport')
var user = require('./routes/user');
var auth = require('./routes/auth');
var register = require('./routes/register');
var userLevel = require('./routes/userLevel');
var home = require('./routes/home');
var cors = require('cors');
var community = require('./routes/community');
var member = require('./routes/member');
var mail = require('./routes/mail');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const dotenv = require('dotenv');
const squareConnect = require('square-connect');
const { title } = require('process');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

dotenv.config();


// Set the Access Token
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');


app.use('/user',user)
app.use('/auth',auth)
app.use('/register',register)
app.use('/userLevel',userLevel)
app.use('/home',home)
app.use('/community',community)
app.use('/member',member)
app.use('/mail',mail)


// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
const accessToken = process.env.ACCESS_TOKEN
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

app.post('/process-payment', async (req, res) => {
  console.log(req.cookies)
  const request_params = req.body;
  console.log ("65  request_params:", request_params)
  console.log(req.sessionStore)

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString('hex');

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();
  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: request_params.fee, // $60.00 charge
      currency: 'CAD'
    },
    idempotency_key: idempotency_key
  };
  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response,
      
    });
  
  } 
  catch(error) {
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }
  
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

module.exports = app;
