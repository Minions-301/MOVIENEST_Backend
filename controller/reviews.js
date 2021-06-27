'use strict';

const { now } = require("mongoose");
const MoviesModel = require("../module/movies.module");

const getReviews = (req, res) => {
    const {movie_ID } = req.query;
    MoviesModel.find({ movie_ID: movie_ID }, (error, userData) => {
        if (error) {
            res.send('user not exist');
        }
        userData.save();
        res.send(userData.reviews)
    })
}

const addReview = (req, res) => {
    const { email, name, movie_ID, review } = req.body;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    MoviesModel.MoviesModel.find({ movie_ID: movie_ID }, (error, userData) => {
        if (error) {
            res.send('user not exist');
        } else {
            userData.reviews.push({
                review: review,
                name: name,
                email: email,
                date: today
            })
        }
        userData.save();
        res.send(userData.reviews)
    })
}

const deleteReview = (req, res) => {
    const { movie_ID } = req.query;
    const reviewId = req.params.id;
    MoviesModel.find({ movie_ID }, (error, userData) => {
        if (error) {
            res.send('something went wrong')
        } else {
            const reviewsArray = userData.reviews.filter((item) => {
                if (item._Id != reviewId) {
                    return item;
                }
            })
            userData.reviews = reviewsArray;
            userData.save();
            res.send(userData.reviews);

        }
    })

}

const updateReview = (req, res) => {
    const { review, movie_ID } = req.query;
    const reviewId = req.params.id;
    MoviesModel.find({ movie_ID }, (error, userData) => {
        if (error) {
            res.send('something went wrong')
        } else {
            userData.reviews.splice(reviewId, 1, {
                review: review
            })
            userData.save();
            res.send(userData.reviews);

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