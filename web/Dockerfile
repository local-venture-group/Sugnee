FROM node:15.0-alpine
COPY ./sugnee/package*.json ./
RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh && \
    yarn install
ENV TZ Asia/Tokyo
ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

WORKDIR /app/sugnee

CMD ["/bin/ash"]
