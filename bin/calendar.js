const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

async function createEvent({ summary, description, start, end }) {
    const client = await auth.getClient();

    const calendarId = process.env.GOOGLE_CALENDAR_ID;


    const event = {
        summary,
        description,
        start: {
            dateTime: start,
            timeZone: 'America/New_York',
        },
        end: {
            dateTime: end,
            timeZone: 'America/New_York',
        },
    };

    const response = await calendar.events.insert({
        auth: client,
        calendarId,
        requestBody: event,
    });

    return response.data;
}

module.exports = { createEvent };
