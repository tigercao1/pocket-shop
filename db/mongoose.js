const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise

mongoose.connect(uri, { useNewUrlParser: true }).then(() => console.log('Connected to database.'))
.catch(() => {
        console.log('Cannot connect to database. Exiting.')
        process.exit()
    }
)

module.exports = {
    mongoose: mongoose
};