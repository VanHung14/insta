const config = require('config')
const mongoose = require('mongoose');

async function connect(){

    try {
        // await mongoose.connect('mongodb://localhost:27017/insta_dev',
        await mongoose.connect(config.get('db'),
        {
            
        });
        console.log('connecting to', config.get('db'))
    }
    catch{
        console.log('connect false')

    }
}

module.exports = { connect}