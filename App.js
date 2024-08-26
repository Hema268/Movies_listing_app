const  express  = require("express");
require('dotenv').config();
const movieRoute = require("./Routes/movies/moviesRoutes");
const db = require("./db/index");

const app = new express();
const port = process.env.PORT || 8026;
app.use(express.json());
app.use("/movies",movieRoute);

 db();


app.listen(port, () =>{
    console.log(`Express app Listening at port http://localhost:${port}`);
    
});