# This Dockerfile builds the React client and API together

# Build step #1: build the React front end
FROM node:17-alpine as build-step
WORKDIR /app
COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

# Build step #2: build the API with the client as static files
FROM python:3.9
WORKDIR /app
COPY --from=build-step /app/build ./build

COPY requirements.txt app.py .flaskenv ./
RUN pip install -r ./requirements.txt

COPY database ./database

EXPOSE 3000
CMD ["gunicorn", "-b", ":3000", "app:app"]