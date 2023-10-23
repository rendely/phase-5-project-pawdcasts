# Pawdcasts app

Web app for finding, following, discovering and listening to Podcasts.

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
