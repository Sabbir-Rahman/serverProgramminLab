const http = require('http')
const data = require('./loadContent')



const final_server = http.createServer((request,response) => {
    
    // response.writeHead(201,{'Content-Type': "text/plain"})

    // response.write("<h1>Hello</h1>")
    // response.end()
    if(request.url=="/"){
        response.write("<h2>This is index url</h2>")
        response.end()
    }
    else if (request.url=="/about"){
        response.write("<h2>This is a about url</h2>")
        response.end()
    }
    else if (request.url=="/blog"){
        response.write("<h2>This is a blog url</h2>")
        response.end()
    }
    else if (request.url=="/contact"){
        response.write("<h2>This is a contact url</h2>")
        response.end()
    }
    else if (request.url=="/pricing"){
        response.write("<h2>This is pricing url</h2>")
        response.end()
    }
    else if (request.url=="/services"){
        response.write("<h2>This is a services url</h2>")
        response.end()
    }
    else if (request.url=="/work"){
        response.write("<h2>This is a work url</h2>")
        response.end()
    } 
    else {
        response.write("<h2>This page don't exist</h2> <a href = '/'>Go To base</a>")
        response.end()
    }
})

module.exports = {final_server}