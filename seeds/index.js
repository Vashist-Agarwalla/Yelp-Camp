const mongoose = require('mongoose');
const cities = require('./cities');
const { place, descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connection')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime autem incidunt ad officiis reiciendis dignissimos nisi inventore? Harum illum deserunt praesentium ratione libero sint sit, iste beatae, quis aspernatur molestiae.",
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})