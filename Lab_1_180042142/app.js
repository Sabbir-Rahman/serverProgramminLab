const var_server = require('./http-module')
const last_four_digit = 2142

console.log(`Server is running at ${last_four_digit}`)
var_server.server.listen(last_four_digit)
