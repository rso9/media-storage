# media-storage
Microservice for storing the media that will be streamed.

## How to set up

Clone this git repository and open the directory inside your terminal.
First execute `npm install` and then run `npm run dev` and you should have
access to a local development environment.

## Example endpoints

As of now, you can access a sample .mp3 file by going into your browser
and navigating to `http://localhost:8080/song/x_files_x_files_theme.mp3`.

If you wish to test the file upload functionality, serve the index.html file,
open it and select an mp3 file from there and then click upload. By default the
form will try to upload the file to `localhost:8080`, so make sure to change the
port inside the HTML file if you're using a different one for you media-storage API.
