'use strict';

const { now } = require("mongoose");
const MoviesModel = require("../module/movies.module");
const ReviewsModel = require("../module/reviews.module")

const getReviews = (req, res) => {
    const { movie_ID } = req.query;
    console.log(movie_ID);
    MoviesModel.MoviesModel.findOne({ movie_ID: movie_ID }, (error, movieData) => {
        if (error) {
            res.send('user not exist');
        }
        console.log(movieData);
        res.send(movieData.reviews)
    })
}

const addReview = (req, res) => {
    const { email, name, movie_ID, review } = req.body;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    MoviesModel.MoviesModel.findOne({ movie_ID: movie_ID }, (error, movieData) => {
        if (error) {
            res.send('user not exist');
        } else if (typeof movieData != 'undefined') {
            if (typeof movieData.reviews == 'undefined') {
                movieData.reviews = {
                    review_text: review,
                    name: name,
                    email: email,
                    date: today
                };

            }
            else {
                console.log('firstelse');
                movieData.reviews.push({
                    review_text: review,
                    name: name,
                    email: email,
                    date: today
                })
            }
        }
        console.log(movieData.reviews);
        movieData.save();
        res.send(movieData.reviews)
        //userData.reviews.save();

    })
}

const deleteReview = (req, res) => {
    const { movie_ID } = req.query;
    const reviewId = req.params.id;
    MoviesModel.MoviesModel.findOne({ movie_ID }, (error, movieData) => {
        if (error) {
            res.send('something went wrong')
        } else {
            const reviewsArray = movieData.reviews.filter((review) => {
                if (review._id != reviewId) {
                    return review
                }
    
            });
            movieData.reviews = reviewsArray;
            movieData.save();
            res.send(movieData.reviews);

        }
    })

}

const updateReview = (req, res) => {
    const { review_text, movie_ID } = req.body;
    const reviewId = req.params.id;
    console.log(reviewId, "    ", movie_ID);
    MoviesModel.MoviesModel.findOne({ movie_ID }, (error, movieData) => {
        if (error) {
            res.send('something went wrong')
        } else {
            movieData.reviews.map((review, idx) => {
                if (review._id == reviewId) {
                    console.log("isupdated");
                    movieData.reviews[idx].review_text = review_text;
                    movieData.save();
                }
            });

            movieData.save();
            res.send(movieData.reviews);

        }
    })
    // const{userId,movieId,review}=req.body;
    // const review=req.params.review;
    // usermodel.findOne({userId:userId},(error,userData)=>{
    //     if(error){
    //         res.send('something went wrong');
    //     }else{
    //         usermodel.watchedMovie.findOne({movieId:movieId},(error,watchedData)=>{
    //             if(error){
    //                 res.send('something went wrong');
    //             }else{
    //                 userData.watchedData.splice(review,1,{
    //                     review:review
    //                 })
    //             }
    //             userData.save();
    //             res.send(userData.watchedData);
    //         })
    //     }
    // })
}

module.exports = {
    getReviews,
    addReview,
    deleteReview,
    updateReview,
};