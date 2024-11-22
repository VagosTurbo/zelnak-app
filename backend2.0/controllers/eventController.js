import { dbGetAllEvents, dbGetEventById, dbCreateEvent, dbDeleteEvent, dbUpdateEvent } from "../models/event.js"

export const getAllEvents = async (req, res) => {
    try {
        const events = await dbGetAllEvents()
        res.json(events)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const event = await dbGetEventById(req.params.id)

        if (!event) {
            return res.status(404).json({ error: "Event not found" })
        }

        res.json(event)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createEvent = async (req, res) => {
    const userId = req.user.id
    const newEvent = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        user_id: userId,
    }

    try {
        await dbCreateEvent(newEvent)
        res.json({ message: "Event created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateEvent = async (req, res) => {
    const eventId = req.params.id
    const updatedEvent = {}

    if (req.body.name) updatedEvent.name = req.body.name
    if (req.body.description) updatedEvent.description = req.body.description
    if (req.body.date) updatedEvent.date = req.body.date
    if (req.body.location) updatedEvent.location = req.body.location

    // at least one field is required to update
    if (Object.keys(updatedEvent).length === 0) {
        return res.status(400).json({ error: "At least one field is required to update." })
    }

    try {
        // does event exist?
        const existingEvent = await dbGetEventById(eventId)
        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found." })
        }

        await dbUpdateEvent(eventId, updatedEvent)
        res.json({ message: "Event updated successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        await dbDeleteEvent(req.params.id)
        res.json({ message: "Event deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
