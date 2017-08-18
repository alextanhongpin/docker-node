const app = require('express')()
const os = require('os')

const hostname = os.hostname()

const TEXT = process.env.TEXT || 'hello, node!'
const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'

let isSuccess = true
app.get('/', (req, res) => {
  res.status(200).json({
    hostname,
    text: TEXT
  })
})

app.get('/custom', (req, res) => {
  res.status(req.query.code || 200).json({
    message: req.query.message || 'custom-message'
  })
})

app.get('/patient', (req, res) => {
  if (isSuccess) {
    res.status(200).json({
      hostname
    })
  } else {
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

app.get('/moody', (req, res) => {
  if (Math.random() < 0.5) {
    res.status(200).json({
      hostname
    })
  } else {
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

app.post('/toggle_health', (req, res) => {
  isSuccess = !isSuccess
  res.status({
    is_success: isSuccess
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'I\'m healthy',
    is_success: isSuccess,
    text: TEXT
  })
})

console.log(`Running on http://${HOST}:${PORT}`)
app.listen(PORT, HOST)
