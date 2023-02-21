const app = require('./app')
const http = require('http')
const config = require('./util/config')
const logger = require('./util/logger')

const PORT  = config.PORT || 3003

const server = http.createServer(app)

server.listen(PORT,() => {
  logger.info(`Server running on port ${PORT}`)
})
