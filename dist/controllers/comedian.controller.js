"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMyEvents = void 0;
const comedian_repo_1 = require("../repo/comedian.repo");
const response_handler_1 = require("../handlers/response.handler");
// Controller for comedian Routes :-
const allMyEvents = async (req, res) => {
    try {
        const { userId } = req.user;
        const eventList = await (0, comedian_repo_1.getAllMyEventsService)({ comedianId: userId });
        return (0, response_handler_1.responseHandler)(res, "List of all your events ", 200, eventList);
    }
    catch (error) {
        throw error;
    }
};
exports.allMyEvents = allMyEvents;
const createNewEvent = async () => { };
