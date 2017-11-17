const path = require('path')
const express = require('express')
const swaggerTools = require('swagger-tools')
// const bodyParser = require('body-parser')

const app = express()
const swaggerSpecFileName = `test.swagger.json`
const swaggerPath = path.join(__dirname, `./${swaggerSpecFileName}`)
const swaggerDoc = require(swaggerPath)

// const {
//   assertSwagger,
//   handleNotFound,
//   handleError,
//   handleSwaggerInputError,
//   handleSwaggerOutputError,
// } = require('./middlewares')

// allow cross-origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,PATCH,POST,DELETE,OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Operator, X-Origin, X-Domain'
  )
  res.header('Access-Control-Allow-Credentials', 'true')

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use(`/${swaggerSpecFileName}`, express.static(swaggerPath))

// Initialize the Swagger middleware

swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
  // app.use(bodyParser())
  app.use(middleware.swaggerUi())

  const port = process.env.PORT || 3333

  // Start the server
  app.listen(port, () => {
    console.log('RUNING') // eslint-disable-line no-console
  })
})
