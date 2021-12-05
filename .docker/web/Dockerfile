FROM node:15.0-alpine
RUN apk add --no-cache libc6-compat

ENV APP_PATH /web/sugnee

WORKDIR $APP_PATH
COPY . .
RUN npm install

WORKDIR $APP_PATH

CMD ["/bin/ash"]
