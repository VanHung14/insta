const mongoose = require('mongoose');

async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/insta_dev',{
            
        });
        console.log('connect successfully')
    }
    catch{
        console.log('false')

    }
}

module.exports = { connect}