"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMyEventsService = void 0;
const client_1 = require("../lib/client");
const getAllMyEventsService = async ({ comedianId }) => client_1.prisma.event.findMany({
    where: {
        comedianId
    }
});
exports.getAllMyEventsService = getAllMyEventsService;
