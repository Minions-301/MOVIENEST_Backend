const MoviesModel = require("../module/movies.module");


const addMovie = async (movie) => {
    const { movie_ID, title, overview, release_date, runtime, vote_average } = movie;
    console.log(movie);
    await MoviesModel.MoviesModel.find({ movie_ID: movie_ID }, (error, movieData) => {
        if (error) {
            console.log(`can't add movie`);
        } else if (typeof movieData[0] === 'undefined') {
            movieData.push({
                movie_ID: movie_ID,
                title: title,
                overview: overview,
                moviePoster: moviePoster,
                release_date: release_date,
                runtime: runtime,
                vote_average: vote_average,
                num_Of_Wotched: 0,
                reviews: []
            });
            movieData.save();
        }
    })
}

const getMostWatched= async(req,res)=>{
 const sortMovies= await MoviesModel.MoviesModel.sort((a, b) => {

    if (a.num_Of_Wotched < b.num_Of_Wotched) {
      return -1;
    }
    else {
      return 1;
    }
  });
  console.log(sortMovies);
  res.send(sortMovies.slice(4));

}


const incrementNumberOfWatch = async (movie_ID) => {
    console.log(movie_ID);
    await MoviesModel.MoviesModel.find({ movie_ID }, (error, movieData) => {
        if (error) {
           console.log(error);
        }else{
        movieData.num_Of_Wotched += 1;
        movieData.save();
    }
       
    });
   
}



module.exports = {
    getMostWatched,
    incrementNumberOfWatch,
    addMovie
};