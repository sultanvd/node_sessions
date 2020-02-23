const axios = require('axios');
const allMoviesList = "";


const getAllMovies = function getAllMoviesList(callback){
  axios.get('https://swapi.co/api/films',{
    params: {
      format: "json"
    }
  })
    .then(response => {
        callback(response, null);
    }).catch(error => {
      callback(null, error);
    });
  }

  const getMovieByName = function getMovieByName(name, callback){
    axios.get('https://swapi.co/api/films',{
      params: {
        format: "json"
      }
    })
      .then(response => {
          const movieResult = response.data.results;
          console.log("Movies result", movieResult);
          const u = movieResult.filter((e) => e.title.toLowerCase().replace(/\s/g, '') === name.toLowerCase().replace(/\s/g, ''));
          if(!u){
            callback(null, Error("User not found"));
          }  
          else{
            callback(u, null);            
          }
      }).catch(error => {
        console.log("Movies data error", error);
        
        callback(null, error);
      });
    }


  module.exports = {
    getAllMovies : getAllMovies,
    getMovieByName : getMovieByName
  };
