const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Viego_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Create Acc Admin Successfully!!!')
        console.log('Connect Successfully!!!')
    } catch (error) {
        console.log(error)
        console.log('Connect Failer!!!')
    }
}
module.exports = { connect }