const mongoose = require('mongoose');
const Machine = require('./models/Machine');
mongoose.connect('mongodb://127.0.0.1/perfData');


const socketMain = (io,socket)=>{
    let macA;
    socket.on('auth',(key)=>{
        if(key==='123456'){
            socket.join('clients')
        }else if(key === '654321'){
            console.log('a react client has joined');
            socket.join('ui');
        }
        else{
            socket.disconnect(true);
        }
    });

    socket.on('initPerfData',async (data)=>{
        macA = data.macA;
        const mongooseRes = await checkAndAdd(data);
        console.log(mongooseRes);
    })

    socket.on('perfData',(data)=>{
        console.log(data);
    });


}


checkAndAdd=(data)=>{
    return new Promise((resolve,reject)=>{
        Machine.findOne({
            macA:data.macA
        },(err,doc)=>{
            if(err){
                throw err;
            }else if(doc===null){
               let newMachine = new Machine(data);
               newMachine.save();
               resolve('added');
            }else{
                resolve('found');
            }
        })
    })
}

module.exports = socketMain;