import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from ".";
import twilio from "twilio";

export const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
