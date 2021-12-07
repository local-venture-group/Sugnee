FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat

ENV APP_PATH /web/sugnee
WORKDIR $APP_PATH

COPY /web/sugnee/package.json .
RUN npm install 

COPY /web/sugnee .


# FROM node:alpine AS runner
# WORKDIR $APP_PATH
# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# USER nextjs

CMD ["npm","start"]