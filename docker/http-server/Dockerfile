FROM keymetrics/pm2:18-buster

# Bundle APP files
COPY ./app /app
COPY ./ecosystem.config.js /app/
WORKDIR /app

CMD [ "pm2-runtime", "ecosystem.config.js" ]