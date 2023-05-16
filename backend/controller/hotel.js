const hotels = require("../model/hotel");
const hotelModel = require("../model/hotel");
const roomModel = require("../model/room");


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

const getAllHotels = async (req, res, next) => {
  const{min, max, ...others} = req.query;
  try{
     const hotels = await hotelModel.find({...others,
        cheapestPrice:{$gt:min | 1 ,$lt:max || 100000},
        });
    res.status(200).json(hotels);
  }catch(err){
    next(err);
  }
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

// const getOneHotel = async (req, res) => {
//   let hotelID = req.params.id;
//   const hotel_s = await hotelModel
//     .findById(hotelID)
//     .then((deli) => {
//       res.status(200).send({ status: "Hotel  selected", deli });
//     })
//     .catch((err) => {
//       console.log(err.messsage);
//       res.status(500).send({ status: "Error", error: err.message });
//     });
// };

const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//view hotels filtered by city

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try{
      const list = await Promise.all(cities.map(city=>{
        return hotelModel.countDocuments({city:city})
      }))
      res.status(200).json(list);
  }catch(err){
      next(err);
  }
};

//view hotels filtered by type

const countByType = async (req, res, next) => {
  try{
    const hotelCount = await hotelModel.countDocuments({type:"Hotel"});
    const apartmentCount = await hotelModel.countDocuments({type:"Apartment"});
    const resortCount = await hotelModel.countDocuments({type:"Resort"});
    const villaCount = await hotelModel.countDocuments({type:"Villa"});
    const cabinCount = await hotelModel.countDocuments({type:"Cabin"});

      res.status(200).json([
        {type: "Hotel", count: hotelCount},
        {type: "Apartment", count: apartmentCount},
        {type: "Resort", count: resortCount},
        {type: "Villa", count: villaCount},
        {type: "Cabin", count: cabinCount},
      ]);
  }catch(err){
      next(err);
  }
};

const getHotelRooms = async (req,res,next)=>{
  try{
    const hotel = await hotelModel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map(room=>{
      return roomModel.findById(room);
    }));
    res.status(200).json(list);

  }catch(err){
    next(err)
  }
}

module.exports = {
  addHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
  getOneHotel,
  countByCity,
  countByType,
  getHotelRooms
};
