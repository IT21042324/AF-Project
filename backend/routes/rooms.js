const router = require("express").Router();
const {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getOneEvent,
} = require("../controller/event");

router.post("/add", addEvent);
router.get("/", getAllEvents);
router.put("/update:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

//get only one event
router.get("/get/:id", getOneEvent);

module.exports = router;
