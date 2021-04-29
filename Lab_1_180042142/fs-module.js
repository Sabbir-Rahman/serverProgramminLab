//Synchronus and asynchronus

//readFile
//writeFile
//appendFile
//Delete
//Rename

const fs = require("fs")

fs.writeFileSync('contents/demoFile.txt', 'We are learning node js \n')
fs.appendFileSync('contents/demoFile.txt', 'We are learning javascript')

fs.rename('contents/demoFile.txt','contents/renameFile.txt', (error)=>{
    if (error){
        console.log(error)
    } else {
        console.log("Write succesfull")
    }
})

fs.readFile("contents/renameFile.txt","utf-8",(error,data)=>{
    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
})

console.log('Before')

fs.readFile("contents/renameFile.txt","utf-8",(error,data)=>{
    if(error){
        console.log(error)
    } else {
        fs.appendFile(
            'contents/renameFile.txt', 
            'Is this a synchronus process?',
                (err) =>{
                    if(err){
                        console.log(error)
                    }
                }
            )

        fs.readFile(
            "contents/renameFile.txt","utf-8",(error,data)=>{
                if(error){
                    console.log(error)
                }
                else {
                    console.log(data)
                }
            })
    }
})

console.log('After')

fs.unlink("contents/delete.txt", (err)=>{
    if(!err){
        console.log('Deleted Successfully')
    }
})

