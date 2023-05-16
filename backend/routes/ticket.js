const router = require("express").Router();
const {
  addTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
} = require("../controller/ticket");

router.post("/add", addTicket);
router.get("/", getAllTickets);
router.put("/update/:id", updateTicket);
router.delete("/delete/:id", deleteTicket);

module.exports = router;
