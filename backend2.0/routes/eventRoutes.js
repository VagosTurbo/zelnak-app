import { Router } from "express"
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = Router()

router.get("/", getAllEvents)
router.get("/:id", getEventById)
router.post("/", authenticateToken, createEvent)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

export default router
