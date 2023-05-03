const express = require("express");
const{ 
    createPlace,
    updatePlaceByID,
    deletePlaceByID,
 } = require("../controller/placeController");

const protectedPlaceRouter = express.Router();

protectedPlaceRouter.post('/add', createPlace);
protectedPlaceRouter.patch('/update/:id', updatePlaceByID);
protectedPlaceRouter.delete('/delete/:id', deletePlaceByID);

module.exports = protectedPlaceRouter;