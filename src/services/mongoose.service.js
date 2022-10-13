const mongoose = require('mongoose');
const config = require('../configs/db.configs');

exports.connectDb = ( ) => {
    let url = config.mongo.uri;
    mongoose.connect(url, {})
    .then(() => console.log('connection reussi à mongodb'))
    .catch((err) => console.log('connection echoué', err));
};