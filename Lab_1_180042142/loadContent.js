const fs = require("fs");

const aboutData = fs.readFileSync('./contents/HTML/about.html',"utf-8")
const blogData = fs.readFileSync('./contents/HTML/blog.html',"utf-8")
const contactData = fs.readFileSync('./contents/HTML/contact.html',"utf-8")
const indexData = fs.readFileSync('./contents/HTML/index.html',"utf-8")
const pricingData = fs.readFileSync('./contents/HTML/pricing.html',"utf-8")
const serviceData = fs.readFileSync('./contents/HTML/services.html',"utf-8")
const workData = fs.readFileSync('./contents/HTML/work.html',"utf-8")

const loadData = {
    'aboutHtml':aboutData,
    'blogHtml':blogData,
    'contactHtml': contactData,
    'indexHtml': indexData,
    'pricingHtml': pricingData,
    'serviceHtml': serviceData,
    'workHtml': workData
}

module.exports = {loadData}