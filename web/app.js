const path = require('path')
const express = require('express')
const morgan = require('morgan')

// Configuration
const { port } = {
  port: process.env.PORT || 3000
}

const app = express()

// Logging
app.use(morgan('tiny'))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Pug Templates
app.set('view engine', 'pug')
app.set('pug options', {
  basedir: './views',
  pretty: true
})

// Routes
const routes = require('./routes')(app)

app.get('/', routes.home)

app.get('/blog', routes.blog.landing)
app.get('/blog/:slug', routes.blog.detail)

app.get('/about-us', routes.aboutUs)

// Start web server
app.listen(port, () =>
  console.info(`Ready at http://localhost:${port}`)
)
