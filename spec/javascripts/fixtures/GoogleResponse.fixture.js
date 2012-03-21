CalApp.fixtures = _.extend(CalApp.fixtures || {}, {
  item:{
    "htmlLink":"https://www.google.com/calendar/event?eid=cDR2bmdyNDhpbnVtOGtiMjcycjN2a2wxNTggcGl2b3RhbGxhYnMuY29tXzJkMzEzOTMyMzkzMTMzMzcyZDMyMzgzM0ByZXNvdXJjZS5jYWxlbmRhci5nb29nbGUuY29t",
    "summary":"Big Meeting",
    "location":"Room 1",
    "start":{
      "dateTime":"2012-02-29T08:00:00-08:00"
    },
    "end":{
      "dateTime":"2012-02-29T17:00:00-08:00"
    },
    "attendees":[
      {
        "email":"email1@example.com",
        "displayName":"Batman",
        "responseStatus":"accepted"
      },
      {
        "email":"email2@example.com",
        "displayName":"Robin",
        "responseStatus":"accepted"
      },
      {
        "email":"email3@example.com",
        "displayName":"Mario",
        "responseStatus":"needsAction"
      },
      {
        "email":"email4@example.com",
        "organizer":true,
        "responseStatus":"accepted"
      }
    ]
  },
  Response:{
    "timeZone":"America/Los_Angeles",
    "items":[{status: 'confirmed'}]
  }
});