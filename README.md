# sdi17-project1 (GAMELABS)

## Overview
GameLabs uses freetogame api to provide you with free PC games in its database.
https://www.freetogame.com/api-doc

## Download
1. Fork and clone this repository to your local desktop.
2. If you prefer to download the file, click 'Code' and download the files.

## API Key
1. Create apikey.js inside the scripts folder.
2. Grab your apikey from https://rapidapi.com/digiwalls/api/free-to-play-games-database/
3. Copy and paste this code into the apikey.js file.
```
const GAMELABS_API_KEY = 'your api key';
export default GAMELABS_API_KEY;
```
Note: Even when using a .js file to seperate your API key from index.js, it will still be visible on browser developer tools. Look into utilizing environment variable and dotenv for future projects.

## Running GameLabs
1. Run the files using the VS Code Live Server extension.
Note: Without a live sever, the API requests will run into a Cross Origion Request (CORS) issue.

## Additional Information/Credits
1. Font Animation: https://alvarotrigo.com/blog/css-text-animations/
2. Background: https://www.deviantart.com/skullbreaker000/art/Cool-Gaming-Background-4k-876162743 by SkullBreaker000




