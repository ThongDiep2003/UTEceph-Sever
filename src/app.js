var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
require('dotenv').config();

import connectDB from './config/connectDB';
import clinicRouter from './routes/clinicRoutes';
import doctorRouter from './routes/doctorRoutes';
import authRouter from './routes/authRouters';
import patientRouter from './routes/patientRouters';
import historyRouter from './routes/historyRouters';
import extraoralRouter from './routes/extraoralRouters';
import intraoralRouter from './routes/intraoralRouters';
import radiographyRouter from './routes/radiographyRouters';
import diagnosisAndTreatmentRouters from './routes/diagnosisAndTreatmentRouters';
import listOfIssueRouter from './routes/listOfIssueRouters';
import treatmentPlanRouter from './routes/treatmentPlanRouters';
import treatmentHistoryRouter from './routes/treatmentHistoryRouters';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// router setup
app.use('/v1/clinic', clinicRouter);
app.use('/v1/doctor', doctorRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/patient', patientRouter);
app.use('/v1/history', historyRouter);
app.use('/v1/extraoral', extraoralRouter);
app.use('/v1/intraoral', intraoralRouter);
app.use('/v1/radiography', radiographyRouter);
app.use('/v1/diagnosis', diagnosisAndTreatmentRouters);
app.use('/v1/listOfIssue', listOfIssueRouter);
app.use('/v1/treatmentPlan', treatmentPlanRouter);
app.use('/v1/treatmentHistor', treatmentHistoryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

connectDB();

app.listen(process.env.PORT || 3000, ()=>{
  console.log('server listening on port: ' + process.env.PORT || 3000);
})

module.exports = app;
