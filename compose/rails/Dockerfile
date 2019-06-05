FROM ruby:2.5.5-alpine3.9
RUN apk update && apk add --virtual build-base \
  && apk add tzdata \
  && apk add postgresql-dev postgresql-client

RUN mkdir /server
WORKDIR /server

COPY server/Gemfile /server/Gemfile
COPY server/Gemfile.lock /server/Gemfile.lock
RUN bundle install

COPY server /server

# Add a script to be executed every time the container starts.
COPY server/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]