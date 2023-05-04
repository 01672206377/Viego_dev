const express = require('express')
const path = require('path')
const app = express()
const handlebars = require('express-handlebars').engine
const route = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const moment = require('moment');
const port = 3000

const db = require('./config/db/index')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

db.connect();
const createAccAdmin = require('./app/middlewares/createAccAdmin')

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

// template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a+ b,
    formatTime: function(date) {
      return moment(date).format('HH:mm---DD/MM/YYYY');
  }
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app)

createAccAdmin.initApp()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})