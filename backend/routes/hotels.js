const router = require("express").Router();
const {
  addHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
  getOneHotel,
} = require("../controller/hotel");

router.post("/add", addHotel);
router.get("/", getAllHotels);
router.put("/update/:id", updateHotel);
router.delete("/delete/:id", deleteHotel);

//get only one hotel
router.get("/get/:id", getOneHotel);

module.exports = router;
