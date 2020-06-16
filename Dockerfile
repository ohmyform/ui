FROM node:12-alpine AS builder
MAINTAINER OhMyForm <admin@ohmyform.com>

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --frozen-lock-file
RUN yarn build

FROM node:12-alpine
MAINTAINER OhMyForm <admin@ohmyform.com>

# Create a group and a user with name "ohmyform".
RUN addgroup --gid 9999 ohmyform && adduser -D --uid 9999 -G ohmyform ohmyform

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=4000

# Change to non-root privilege
USER ohmyform

CMD [ "yarn", "start" ]
