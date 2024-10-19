import { dbGetAllEvents, dbGetEventById, dbCreateEvent, dbDeleteEvent, dbUpdateEvent } from '../models/event.js';

export const getAllEvents = async (req, res) => {
    try {
        const events = await dbGetAllEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getEventById = async (req, res) => {
    try {
        const event = await dbGetEventById(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createEvent = async (req, res) => {
    const newEvent = {
        name : req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        user_id: req.body.user_id,
    };

    try {
        await dbCreateEvent(newEvent);
        res.json({ message: "Event created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateEvent = async (req, res) => {
    const updatedEvent = {
        title: req.body.title,
        completed: req.body.completed,
    };

    try {
        await dbUpdateEvent(req.params.id, updatedEvent);
        res.json({ message: "Event updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        await dbDeleteEvent(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

