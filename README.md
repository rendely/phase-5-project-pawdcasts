# Pawdcasts app

Web app for finding, following, discovering and listening to Podcasts.

Search across millions of podcasts with Apple Podcast API integration:

<img src="screenshots/search.jpg" width="200">

Track your favorite podcasts by following them:

<img src="screenshots/mypawds.jpg" width="200">

See a feed of new episodes from podcasts you follow:

<img src="screenshots/feed.jpg" width="200">

Listen to episodes and discuss them via comments:

<img src="screenshots/episode.jpg" width="200">

## Running locally

Define a .env file in the root directory with these definitions:

- DATABASE_URI
- SECRET_KEY
- OPENAI_API_KEY


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

## Updating the database

1. Update the models.py file
2. `cd server`
3. `flask db migrate -m "change description"`
4. `flask db upgrade head`
