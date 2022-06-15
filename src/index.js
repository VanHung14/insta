const helmet = require('helmet')
const compression = require('compression')
const config = require('config')
const path = require('path');
const express = require('express')
// const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
var port = process.env.PORT || 3000;


if(!config.get('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1) // exit when error
}

const route = require('./routes')
const db = require('./config/db')

// connect to DB
db.connect()

// static file
app.use(express.static(path.join(__dirname, '/public')))

// middlewaree processing html
app.use(express.urlencoded({
  extended: true
}))
// middlewaree processing json
app.use(express.json())

app.use(methodOverride('_method'))
app.use(helmet())
app.use(compression())

// http logger
// app.use(morgan('combined'))

// template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
}
}
   
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));


// route init
route(app)

app.get('/logout', (req, res) => {
  return res.clearCookie('token').redirect('login')
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })