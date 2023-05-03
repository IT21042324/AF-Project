const express = require("express");
const{ 
    getAllPlaces,
    getPlacesByID,
    createPlace,
    updatePlaceByID,
    deletePlaceByID,
    searchPlace
 } = require("../controller/placeController");

const placeRouter = express.Router();

placeRouter.get('/', getAllPlaces);
placeRouter.get('/:id', getPlacesByID);
// placeRouter.post('/add', createPlace);
// placeRouter.patch('/update/:id', updatePlaceByID);
// placeRouter.delete('/delete/:id', deletePlaceByID);
placeRouter.get('/search/byplaceName', searchPlace);

module.exports = placeRouter;