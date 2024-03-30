if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL // 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)]; //create random set of array for Title

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000 = Math.floor(Math.random()*1000); //create random set of array for Title
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground({
            // Your user ID 
            author: '6607c7236afdd2f7fed778c6',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, adipisci sunt. Pariatur totam temporibus fugiat sint eaque cupiditate dolores sequi atque consequatur assumenda impedit quasi voluptas harum, maxime rerum suscipit?",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                 cities[random1000].longitude,
                 cities[random1000].latitude,
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djgnmlwh1/image/upload/v1710766497/YelpCamp/gsev7otekkkqfvuymmc0.jpg',
                    filename: 'YelpCamp/gsev7otekkkqfvuymmc0'
                },
                {
                    url: 'https://res.cloudinary.com/djgnmlwh1/image/upload/v1710766497/YelpCamp/loyprfdxgzebs6usnbty.jpg',
                    filename: 'YelpCamp/loyprfdxgzebs6usnbty'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})
