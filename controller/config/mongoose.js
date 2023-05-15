const mongoose = require('mongoose');

const Url = process.env.URL;

mongoose.connect(Url)
.then(()=>console.log('Mongodb is Up and Connected'))
.catch((err)=>console.log('Error While Connect To MongoDb'));