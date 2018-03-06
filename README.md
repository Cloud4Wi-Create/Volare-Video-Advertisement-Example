# Video Advertisement Demo
This is a basic web application to show a video allowing the user to continue their Access Journey after a configurable amount of time. It uses the MyApps API to integrate seamlessly into the Access Journey.

## Using MyApps SDK

- [MyApps SDK](./MyAPPS_SDK.md)
- [Context API](./ContextAPI.md)

This application takes advantage of the MyApps function `MYAPPS.end()` to move along the Access Journey if available and to exit to home if opened from the App Bar.

The Context API is used more heavily to associate requests with the appropriate Tenant and the Tenant's settings and for logging user data.

## Main Application

### Application Flow

#### GET
- GET request to index.php
- Uses session key from GET request to pull context data from Context API
- Tenant ID from Context data to pull any saved settings from MySQL
- Serve page to user with settings passed into javascript via php
- The page shows a loading icon until window finishes loading
- The video is attempted to play, and if it succeeds, the poster is hidden and countdown started
- If video fails to autoplay, poster prompts user to click it to begin countdown and video playback
- If video still fails to play, countdown will commence after 10 seconds to allow user through
- After countdown, Continue button is revealed which will call `MYAPPS.end()` on the `click` event

#### POST
- On `click` of the continue button, a post request is sent to the server with context data
- Index.php uses the context data in post to create a new entry in the log files

## Settings Window

### Application Flow

#### GET
- GET request to settings.php
- Uses session key from GET request to pull context data from Context API
- Tenant ID from Context data to pull any saved settings from MySQL
- Serve settings page to User

#### POST
- POST request to settings.php
- Parses the data sent via JSON
- Saves the parsed data to MySQL replacing the whole row
- Responds with "Success!" to let the frontend know

## Dependencies

- Node.js, npm, and the npm packages outlined in [package.json](./package.json)
    - webpack used to produce `bundle.js` which is the app javascript presented to users
- PHP
- MySQL