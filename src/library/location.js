const axios = require("axios");

const getCoordsForAddress = async (address) => {
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`)

    const data = response.data;
    
    if(!data || data.status === 'ZERO_RESULTS'){
        return "Could not find location for the specified addres."
    }

    console.log('Vea pues:  ', data.results[0].geometry.location)
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;