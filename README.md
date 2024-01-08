# Pawdcasts app

Web app for finding, following, discovering and listening to Podcasts.

Search across millions of podcasts with Apple Podcast API integration:

<img src="screenshots/search.jpg" width="200">

Track your favorite podcasts by following them:
![Search](screenshots/mypawds.jpg)

See a feed of new episodes from podcasts you follow:
![Search](screenshots/feed.jpg)

Listen to episodes and discuss them via comments:
![Search](screenshots/episode.jpg)

## Running locally

```sh
npm run dev --prefix client
python -m server.app
```

OR

```sh
honcho start -f Procfile.dev
```

## Deploying to heroku

```sh
git push heroku main:master
```
