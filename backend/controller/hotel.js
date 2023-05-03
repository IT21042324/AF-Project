const hotelModel = require("../model/hotel");


//insert new hotel to the system

const addHotel = async (req, res) => {
  const {
    name,
    type,
    city,
    address,
    distance,
    title,
    description, 
    cheapestPrice,
  } = req.body;

  const newHotel = new hotelModel({
    name,
    type,
    city,
    address,
    distance,
    title,
    description,
    cheapestPrice,
  });

  await newHotel
    .save()
    .then(() => {
      //body
      res.json("New Hotel added Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};


//view all hotels in the system

const getAllHotels = (req, res) => {
  hotelModel
    .find()
    .then((hotel_s) => {
      res.json(hotel_s);
    })
    .catch((err) => {
      console.log(err);
    });
};


//update the hotel details

const updateHotel = async (req, res) => {
  let hotelID = req.params.id;
  const {
    name,
    type,
    city,
    address,
    distance,
    title,
    description,
    cheapestPrice,
  } = req.body;

  const updateHotels = {
    name,
    type,
    city,
    address,
    distance,
    title,
    description,
    cheapestPrice,
  };

  const update = await hotelModel
    .findByIdAndUpdate(hotelID, updateHotels)
    .then(() => {
      res.status(200).send({ status: "Hotel information updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
};

//remove the hotel from the system

const deleteHotel = async (req, res) => {
  let hotelID = req.params.id;

  await hotelModel
    .findByIdAndDelete(hotelID)
    .then(() => {
      res.status(200).send({ status: "Hotel deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting Hotel", error: err.message });
    });
};

//view details of one hotel

const getOneHotel = async (req, res) => {
  let hotelID = req.params.id;
  const hotel_s = await hotelModel
    .findById(hotelID)
    .then((deli) => {
      res.status(200).send({ status: "Hotel  selected", deli });
    })
    .catch((err) => {
      console.log(err.messsage);
      res.status(500).send({ status: "Error", error: err.message });
    });
};

module.exports = {
  addHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
  getOneHotel,
};
