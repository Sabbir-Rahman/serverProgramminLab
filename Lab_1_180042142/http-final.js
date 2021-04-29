const http = require('http')
const data = require('./loadContent')



const final_server = http.createServer((request,response) => {
    
    // response.writeHead(201,{'Content-Type': "text/plain"})

    // response.write("<h1>Hello</h1>")
    // response.end()
    if(request.url=="/"){
        response.write(data.loadData.indexHtml)
        response.end()
    }
    else if (request.url=="/about"){
        response.write(data.loadData.aboutHtml)
        response.end()
    }
    else if (request.url=="/blog"){
        response.write(data.loadData.blogHtml)
        response.end()
    }
    else if (request.url=="/contact"){
        response.write(data.loadData.contactHtml)
        response.end()
    }
    else if (request.url=="/pricing"){
        response.write(data.loadData.pricingHtml)
        response.end()
    }
    else if (request.url=="/services"){
        response.write(data.loadData.serviceHtml)
        response.end()
    }
    else if (request.url=="/work"){
        response.write(data.loadData.workHtml)
        response.end()
    } 
    else {
        response.write("<h2>This page don't exist</h2> <a href = '/'>Go To base</a>")
        response.end()
    }
})

module.exports = {final_server}