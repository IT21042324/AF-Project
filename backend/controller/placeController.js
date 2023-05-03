const Place = require('../model/place')

//Get all places
const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error getting all places");
    }
}

//Get places by name
const getPlacesByID = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            console.error("Place" + req.params.id + " not found");
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error getting place " + req.params.id);
    }
}

//Create a new place
const createPlace = async (req, res) => {
    const newPlace = req.body;
    console.log(newPlace)
    try {
        const place = new Place(newPlace);
        await place.save();
        res.status(201).json(place);
        console.info("Place create successful");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error("Place create failed");
    }
}

//Update a place by ID
const updatePlaceByID = async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(req.params.id,
            req.body,
            { new: true }
        );
        console.info("Place " + req.params.id + " update successful");
        if (!place) {
            console.error("Place " + req.params.id + " not found");
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error("Place " + req.params.id + " update unsuccessful");
    }
}

//Delete a place by ID
const deletePlaceByID = async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) {
            console.error("Place " + req.params._id + " not found");
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json({ message: 'Place deleted' });
        console.info("Place " + req.params.id + " deleted successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.info("Place " + req.params.id + " delete unsuccessfull");
    }
}

//search place
const searchPlace = async (req, res) => {

    const { term } = req.query;
    const regex = new RegExp(term, 'i');
    const places = await Place.find({
        $or: [
            { placeName: regex },
            { placeDescription: regex }
        ]
    })

    res.json(places);
}

module.exports = {
    getAllPlaces,
    getPlacesByID,
    createPlace,
    updatePlaceByID,
    deletePlaceByID,
    searchPlace
}