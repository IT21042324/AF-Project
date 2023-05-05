const roomModel = require("../model/room");
const hotelModel = require("../model/hotel");


//insert new room to the system

const addRoom = async (req, res,next) => {
    const hotelId = req.params.hotelID;  
    const newRoom = new roomModel(req.body) 

    try{
        const savedRoom = await newRoom.save()
        try{
            await hotelModel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id},
            })

        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err)
    }
}

//view all hotels in the system

const getAllRooms = (req, res) => {
  roomModel
    .find()
    .then((room_s) => {
      res.json(room_s);
    })
    .catch((err) => {
      console.log(err);
    });
};


//update the hotel details

const updateRoom = async (req, res, next) => {
  try{
        const updatedRoom = await roomModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true}
        );
        res.status(200).send({status: "Room Updated"});
  }catch (err){
    next(err);
  }
};

//remove the hotel from the system

const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelID;

    try{
        await roomModel.findByIdAndDelete(req.params.id);

        try{
            await hotelModel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id},
            });
        }catch(err){
            next(err);
        }
        res.status(200).json("Room deleted!");
    }catch(err){
        next(err);
    }
};

//view details of one hotel

const getOneRoom = async (req, res) => {
  let roomID = req.params.id;
  const room_s = await roomModel
    .findById(roomID)
    .then((deli) => {
      res.status(200).send({ status: "Room selected", deli });
    })
    .catch((err) => {
      console.log(err.messsage);
      res.status(500).send({ status: "Error", error: err.message });
    });
};

module.exports = {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
  getOneRoom,
}
