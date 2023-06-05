## A CLI application for sending messages or photos to your telegram bot.

Initiate clone project

Init dependencies:

`npm i`

Create `.env` file and add:

`TELEGRAM_BOT_TOKEN=<bot-token>`

`TELEGRAM_CHAT_ID=<chat-id>`

### Commands:

### Send a message

`$ env $(cat .env | xargs) node ./src/app.js send-message|m <message>`

Example:

`$ env $(cat .env | xargs) node ./src/app.js m "Hello my Bot"`

### Send a photo

`$ env $(cat .env | xargs) node ./src/app.js send-photo|p <path>`

Example:

`$ env $(cat .env | xargs) node ./src/app.js p "/home/pictures/myPhoto.jpg"`
