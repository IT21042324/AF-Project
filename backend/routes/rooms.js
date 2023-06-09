const router = require("express").Router();
const {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
  getOneRoom,
  updateRoomAvailability
} = require("../controller/room");

//create new room
router.post("/add/:hotelID", addRoom);

//display all rooms
router.get("/", getAllRooms);

//update room details
router.put("/update/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete room from the system
router.delete("/delete/:id/:hotelID", deleteRoom);

//get only one event
router.get("/get/:id", getOneRoom);

module.exports = router;
