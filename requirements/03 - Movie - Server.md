
# Create a movie - API

A `POST` API route has already been set up for `http://localhost:4000/movie`. You can see it in [src/server/routers/movie.js](../src/server/routers/movie.js).

Do the work for this requirement in the `createMovie` function in [src/server/controllers/movie.js](../src/server/controllers/movie.js).

1. A movie should only be created if a valid JWT has been provided to the route. Get the token from the appropriate request header and store it in the `token` variable.
2. Use the `jsonwebtoken` library to verify the token, using the same secret as when creating the token during login.
3. Create the movie and store the result in the `createdMovie` variable.
