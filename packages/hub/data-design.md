## Design

This application fundamentally tracks events, all data collected on different
things have a common thread of being tied to a (or multiple) events.

An event is simply a timestamp.

### "Tables"

- Events
- Notes - extension of Events
- Tasks - extension of Notes + Events
- Habits - extension of Events
- Calendar - extension of Notes + Events
- Transactions - extension of Notes + Events
- Health - extension of Events
  - Blood Sugars - extension of Events
  - Weight - extension of Events

The only table that doesn't extend from Events is the users table - which
probably doesn't need to exist at all tbh. The application doesn't need to
support multiple users yet.

- Users

### Backend

Using Airtable at the moment, with a few different `base`s (Airtables version of
a table/sheet).

Ideally we should move to a single base where I think references can work.

- TODO - create experimental base for all hub data
- TODO - Experiement with relations and API responses
