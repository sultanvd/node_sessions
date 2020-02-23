const router = require('express').Router();
const starWars = require("./star-wars");

//get all movies list
router.get('/movie/', (req, res) => {
  const getAllMovies = starWars.getAllMovies
    getAllMovies( (response, error) => {
      console.log(response);
      if(error){
        res.status(400).send(error);
    } else{
      res.status(200).send(response.data);
    }
  });
});

//get movie by name, movie name would be passed by the user as path parameter
router.get('/movie/:name', (req,res) => {
  const getMovieByName = starWars.getMovieByName
    const movieName = req.params.name;
    getMovieByName( movieName, (response, error) => {
      console.log(response);
      if(error){
        res.status(400).send(error);
    } else{
      res.status(200).send(response);
    }
  });
});

module.exports = router;
