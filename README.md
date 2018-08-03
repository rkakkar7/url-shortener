# URL Shortener

This is a working prototype for URL shortener services like TinyURL.

## Features

Other than shortening URL you can also :

- Create a custom URL (if available) which should be 6 characters long and without special characters like '/' and '+'.
- Set expiry date for your shortened URL (default is 1 hr).
- Track how many times your shortened URL has been visited.

## Tech Used

NodeJS for server-side scripting, ExpressJS for routing and MongoDB with Mongoose for database.

## Working

### Shortening

1. The URL to be shortened is converted to MD5 Hash Sum (32 chars) which serves as a unique fingerprint.
2. MD5 Hash hum is converted into Base64 type (24 chars).
3. Since, only 6 characters are required, first 6 characters of the resulting string are chosen.
4. If already present in database (collision), next 6 characters are chosen
5. Step 4 is repeated until either no collision happens (success) or array length is reached (fail).
6. The calculated hash (6 chars) is then inserted into the database with corresponding Expiry Date (if given), Original URL and Number of Redirects (0 for the first time).

### Redirecting

1. When a user enters a shortened URL in the browser, the hash value is extracted from request.params
2. Check if value is present in database or not.
3. If yes, then redirect to Original URL.
3  If no, then redirect to an Error Page stating Wrong URL.

## Development

NodeJS and NPM is required. [Link](https://nodejs.org/en/download/)
- Clone/Fork this repo.
- Run ```npm install``` in the root directory
- Either run MongoDB locally or use MLab (cloud), this project is using Mlab. You can follow [this](https://forum.freecodecamp.org/t/guide-for-using-mongodb-and-deploying-to-heroku/19347) guide for setting it up.
- If you have deployed using Mlab, replace ```process.env.URLSHORTENERDBLINK``` in ```server.js``` with your database link.
- Run ```node server.js``` in root directory of the porject and your service will up and running.
