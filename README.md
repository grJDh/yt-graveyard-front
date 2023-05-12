# YouTube Graveyard

![YouTube Graveyard logo](https://raw.githubusercontent.com/grJDh/yt-graveyard-front/master/src/assets/grave_main.svg)

YouTube Graveyard is a small SPA that allows you to see which channels from your YouTube subscriptions have not uploaded videos for a long time (i.e. _"died"_). You can get the list either by logging in with your Google Account (the site has not yet been verified by Google, which is why there are warnings), or by manually entering your channel ID (there are instructions on the site).

If you are afraid to enter your data, then in the channel ID field you can enter the ID **"UC123"**, which will display a test list of channels.

Requests to the Google API are made from a backend (NodeJS) that runs on Vercel.