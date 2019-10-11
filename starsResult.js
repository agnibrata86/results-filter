'use strict'

const http = require('http')
const fs = require('fs')

const options = {
  hostname: 'localhost',
  port: 7000,
  path: '/api/people',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}
// send HTTP request to invoke the test
const req = http.request(options, function(res) {
  console.log('inside request')
  // response data is received
  let responseData = ''
  res.on('data', function(d) {
    responseData += d
  })
  // on end sending the virtualEndpoint to consumer
  res.on('end', function() {
    // console.log(responseData.toString())
    const peoples = JSON.parse(responseData.toString())
    for (let result of peoples.results) {
      if (result.height < 100 || result.height > 200) {
        console.log(result)
      }
    }
  })
})
// send the request
req.end()
// on error
req.on('error', function(e) {
  console.log(`Failed to get results`)
  console.log(e)
})
