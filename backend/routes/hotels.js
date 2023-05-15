const router = require("express").Router();
const {
  addHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
  getOneHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controller/hotel");

//adding a new hotel
router.post("/add", addHotel);

//view all hotels
router.get("/", getAllHotels);

//update hotel details
router.put("/update/:id", updateHotel);

//remove hotel from the system
router.delete("/delete/:id", deleteHotel);

//get only one hotel
router.get("/get/:id", getOneHotel);

//get hotels by type
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;
