require('dotenv/config');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport')

const shopData = require('./data.json');
const products = require('./routes/products');
const admin = require('./routes/admin');
const users = require('./routes/users');

const app = express();
const host = process.env.HOST
const port = process.env.PORT;
const sessionSecret = process.env.SECRET;

const Product = require('./db/models/Product');
const User = require('./db/models/User');

Product.find().remove();
for (let i = 0; i < shopData.length; i++) {
    console.info("Adding product:", shopData[i].name);
    new Product(shopData[i]).save();
}

app.use(cors());
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize);
app.use(passport.session());

app.get('/', async (req, res) => {
    const productList = await Product.find().exec()
    res.send(productList);
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use('/products', products);
app.use('/admin', admin);
app.use('/users', users);

app.post('/reset')

app.listen(port, () => {
    console.log(`Shop listening at http://${host}:${port}`);
});