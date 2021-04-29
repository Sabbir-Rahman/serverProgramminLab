//in js function is also a variable

//compiling means calling the whole file one time
const HelloFunc = require("./helloWorld")


//1st parameter call back func and 2nd parameter time in milisecond
setInterval(() => {
    HelloFunc.HelloFunction()
},1000)

//call once a time after which time
setTimeout(() => {
    console.log(HelloFunc.name)
},5000)