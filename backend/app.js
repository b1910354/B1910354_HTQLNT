// npm packages
const createError = require('http-errors');

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// route path
const positionRouter = require("./app/routes/position.route");
const diplomaRouter = require("./app/routes/diploma.route");
const teacherRouter = require("./app/routes/teacher.route");
const schoolYearRouter = require('./app/routes/school-year.route');
const tuitionFeesRouter = require('./app/routes/tuition-fees.route');
const gradeRouter = require('./app/routes/grade.route');
const collectionRatesRouter = require('./app/routes/collection-rates.route');
const monthRouter = require('./app/routes/month.route');
const childrenRouter = require('./app/routes/children.route');
const parentsRouter = require('./app/routes/parents.route');
const parentsDetail = require('./app/routes/parent-detail.route');
const classRouter = require('./app/routes/class.route');
const cdiRouter = require('./app/routes/cdi.route');
const missonRouter = require('./app/routes/mission.route');
const assignmentRouter = require('./app/routes/assignment.route');
const receiptRouter = require('./app/routes/receipt.route');
const accountsRouter = require('./app/routes/account.route');
const dateTimeRouter = require('./app/routes/date-time.route');
const mealTicketRouter = require('./app/routes/meal-ticket.route');
const mealRouter = require('./app/routes/meal.route');
const sessionRouter = require('./app/routes/session.route');


// 
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// register routes
app.use('/api/positions', positionRouter);
app.use('/api/diplomas', diplomaRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/school-years', schoolYearRouter);
app.use('/api/tuition-fees', tuitionFeesRouter);
app.use('/api/grades', gradeRouter);
app.use('/api/collection-rates', collectionRatesRouter);
app.use('/api/month', monthRouter);
app.use('/api/children', childrenRouter);
app.use('/api/parents', parentsRouter);
app.use('/api/parents-detail', parentsDetail);
app.use('/api/classes', classRouter);
app.use('/api/cdi', cdiRouter);
app.use('/api/missions', missonRouter);
app.use('/api/assignments', assignmentRouter);
app.use('/api/receipts', receiptRouter);
// app.use('/api/accounts', accountsRouter);
// app.use('/api/date-time', dateTimeRouter);
// app.use('/api/meal-tickets', mealTicketRouter);
app.use('/api/meals', mealRouter);
app.use('/api/sessions', sessionRouter);






// simple route
app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to here with us"
    })
});

// check error
app.use((req, res, next) => {
    return next(
        createError(404, "Resource not found")
    );
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;