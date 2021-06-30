const UserModel = require("../module/users.module");
const movies = require("./movies");

const addMovieToWatchList = (req, res) => {
    const { email, movie_ID, title, moviePoster, overview, release_date, vote_average } = req.body;
    UserModel.UserModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            
            res.send(error)
        } else if (userData != null) {
      
         
            movies.addMovie(req.body);
            userData.movies.push({
                movie_ID: movie_ID,
                title: title,
                overview: overview,
                moviePoster: moviePoster,
                release_date: release_date,
                vote_average: vote_average,
                isWatched: false,
            });
            userData.save();
            res.send(userData);
        } else {
            const newUser = new UserModel.UserModel({
                email: email,
                movies: [{
                    movie_ID: movie_ID,
                    title: title,
                    overview: overview,
                    moviePoster: moviePoster,
                    release_date: release_date,
                    vote_average: vote_average,
                    isWatched: false,
                }]
            })
            movies.addMovie(req.body);
            newUser.save();
            res.send(newUser.movies)
        }
    });
}
const addMovieAsWatched = async (req, res) => {
    const { email, movie_ID, title, overview, moviePoster, release_date, vote_average } = req.body;
    await UserModel.UserModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            res.send(error)
        } else if (typeof userData !== null) {
            movies.addMovie(req.body);
            userData.movies.push({
                movie_ID: movie_ID,
                title: title,
                overview: overview,
                moviePoster: moviePoster,
                release_date: release_date,
                vote_average: vote_average,
                isWatched: true,
                reviews: [],
            });
            userData.save();
            //movies.incrementNumberOfWatch(movie_ID);
            res.send(userData);
        } else {
            const newUser = new UserModel.UserModel({
                email: email,
                movies: [{
                    movie_ID: movie_ID,
                    title: title,
                    overview: overview,
                    moviePoster: moviePoster,
                    release_date: release_date,
                    vote_average: vote_average,
                    isWatched: true,
                    reviews: [],
                }]
            })
            movies.addMovie(req.body);
           // movies.incrementNumberOfWatch(movie_ID);
            newUser.save();
            res.send(newUser.movies)
        }
    });
}

const moveFromWatchListToWatched = async (req, res) => {
    const { id,email } = req.body;

    await UserModel.UserModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            res.send(error)
        }
        userData.movies.map(  (movie,idx) => {
            if (movie._id==id) {
              
                userData.movies[idx].isWatched = true;
                userData.save();
                //movies.incrementNumberOfWatch(movie.movie_ID);
            }
        });
        res.send(userData.movies);
    });
        
}

    
const deleteMovieFromWatchList = async (req, res) => {
    const id = req.params.id;
    const { email } = req.query;
 
    await UserModel.UserModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            res.send(error)
        }
        const watchlist = userData.movies.filter((movie) => {
            if (movie._id != id) {
             
                return movie
            }

        });
       
        userData.movies = watchlist;
        userData.save();

        res.send(userData.movies);
    });
}

const getList = (req, res) => {
   
    const { email } = req.query;
    UserModel.UserModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error);
        }else if (user != null) {
        
            const movieList = user.movies.map(item => {
           
                    return item;
                

            })
            res.send(movieList);

        }else{res.send([])}
    })
    
    
}

const getWatchedList = (req, res) => {

    const { email } = req.query;
 
    UserModel.UserModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error);
        }

        else if (user != null)  {
         
            const watchList = user.movies.filter(item => {
                if (item.isWatched) {
                    return item;
                }

            }
            )
            res.send(watchList);

        }

    })
}


const getWatchList = (req, res) => {
   
    const { email } = req.query;
    UserModel.UserModel.findOne({ email: email }, (error, user) => {
      
        if (error) {
            res.send(error);
        }
       
        else if (user != null) {
            const watchList = user.movies.filter(item => {
                if (!item.isWatched) {
                    return item;
                }

            }
            )
            res.send(watchList);

        }
        
    })
}



module.exports = {
    addMovieAsWatched,
    moveFromWatchListToWatched,
    addMovieToWatchList,
    deleteMovieFromWatchList,
    getWatchedList,
    getWatchList,
    getList,
};