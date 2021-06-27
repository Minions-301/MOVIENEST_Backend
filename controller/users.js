const UserModel = require("../module/users.module");
const movies = require("./movies");

const addMovieToWatchList = async (req, res) => {
    const { email, movie_ID, title, overview, release_date, runtime, vote_average } = req.body;
    console.log(request.body);
    await UserModel.UserModel.find({ email: email }, (error, userData) => {
        if (error) {
            res.send(error)
        } else if (typeof userData[0] !== 'undefined') {
            movies.addMovie(req.body);
            userData.movies.push({
                movie_ID: movie_ID,
                title: title,
                overview: overview,
                moviePoster: moviePoster,
                release_date: release_date,
                runtime: runtime,
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
                    runtime: runtime,
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

const moveFromWatchListToWatched = async (req, res) => {
    const { email, movie_ID } = req.body;
    console.log(request.body);
    await UserModel.UserModel.find({ email: email }, (error, userData) => {
        if (error) {
            res.send(error)
        }
        userData.movies.find({ _id: movie_ID }, (error, movie) => {
            if (error) {
                res.send(error)
            }
            movie.isWatched = true;
            movie.save();
            movies.incrementNumberOfWatch(movie_ID);
        });
    });
    res.send(userData.movies);
}


const deleteMovieFromWatchList = async (req, res) => {
    const id = Number(req.params.id);

    const { email } = req.query;
    await UserModel.UserModel.find({ email: email }, (error, moviesDetails) => {
        if (error) {
            res.send(error)
        }

        const watchlist = moviesDetails.movies.filter((movie) => {
            return movie._id !== id;
        });
        moviesDetails.movies = watchlist;
        moviesDetails.save();

        res.send(moviesDetails);
    });
}


const getWatchedList = (req, res) => {

    const { email } = req.query;
    userModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error);
        }

        else {
            const watchList = user.movies.map(item => {
                if (item.isWatched) {
                    return true;
                }
                res.send(watchList);
            }
            )


        }

    });
}


const getWatchList = (req, res) => {
    const { email } = req.query;
    userModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error);
        }

        else {
            const watchList = user.movies.map(item => {
                if (!item.isWatched) {
                    return true;
                }
                res.send(watchList);
            }
            )

        }
    })
}



module.exports = {
    moveFromWatchListToWatched,
    addMovieToWatchList,
    deleteMovieFromWatchList,
    getWatchedList,
    getWatchList,
};