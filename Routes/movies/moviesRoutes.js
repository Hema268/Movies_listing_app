const express = require("express");
const router = express.Router();
const Movie=require("../../db/schemas/movieSchema");

// router.get("/", async (req,res) => {
//     const movies = await Movie.find();
//     res.json(movies);
// });
router.get("/", async (req,res) => {
    const queryParams = req.query;
    const filters ={};
    if(queryParams.name){
        filters.name = {
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
    }
    if(queryParams.rating){
        filters.rating = {
            $gte: parseFloat(queryParams.rating),
        };
    }

    const movies = await Movie.find(filters);
    res.json(movies);
});


router.post("/" , async(req,res) =>{
    try{
    console.log(req.body);
    const moviesData = req.body;
    const newMovie = new Movie(moviesData);
    await newMovie.save();
    res.json({
        message: "Movie added Successfully",
    });
    }catch (error){
        console.log(error);
        res.status(500).json({
            message:"Internal server Error",
        });
    }
});

router.put("/:id", async (req,res) => {
    try {
        const movieId = req.params.id;
        const updatedMovieData = req.body;
        await Movie.findByIdAndUpdate(movieId, updatedMovieData)
        res.json({
            message: "Movie Update Successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server error",
        });
    }
});

router.delete("/:id", async (req,res) => {
    try {
        const movieId = req.params.id;
        const deleteMovieData = req.body;
        await Movie.findByIdAndDelete(movieId, deleteMovieData);
        res.json({
            message: "Movie Deleted Successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server error",
        });
    }
});

router.get("/:id", async (req,res) => {
    try {
        const movieId = req.params.id;
        console.log("Handling ")
        const oneMovie = await Movie.findById(movieId);
        res.json(oneMovie);
    }catch(error){
        if(error.kind === "ObjectId"){
            res.status(404).json({ message: "Movies not found"});
        } else{
          res.status(500).json({ message: "Internal Server error" });
    }
    }
});



module.exports = router;