const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)]; //create random set of array for Title

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000); //create random set of array for Title
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground({
            author: '65ed8808fc928f5fba8d23b2',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/random/?camping',
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, adipisci sunt. Pariatur totam temporibus fugiat sint eaque cupiditate dolores sequi atque consequatur assumenda impedit quasi voluptas harum, maxime rerum suscipit?",
            price 
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})