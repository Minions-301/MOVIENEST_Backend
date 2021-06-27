'use strict';

const reviewFunction = {};


reviewFunction.addReviews=function(req,res){
    const{email,name,movieId,review}=req.body;
    moviemodel.find({movieId:movieId},(error,userData)=>{
        if(error){
            res.send('user not exist');
        }else{
                    userData.reviews.push({
                        review:review,
                        name:name,
                        email:email
                    })
                }
                userData.save();
                res.send(userData.reviews)
            })
        }
   


reviewFunction.deleteReview=function(req,res){
    const{reviewId,movieId}=req.query;
    const review=req.params.review;
    moviesModel.find({movieId},(error,userData)=>{
        if(error){
            res.send('something went wrong')
        }else{
                    const reviewsArray=userData.reviews.filter((item)=>{
                        if(item._Id!=reviewId){
                            return item;
                        }
                    })
                    userData.reviews=reviewsArray;
                    userData.save();
                    res.send(userData.reviews);

                }
            })

        }
    
reviewFunction.updateReview=function(req,res){
    const{reviewId,movieId}=req.query;
    const review=req.params.review;
    moviesModel.find({movieId},(error,userData)=>{
        if(error){
            res.send('something went wrong')
        }else{
                    const reviesArray=userData.reviews.splice(review,1,{
                       review:review
                    })
                    userData.reviews=reviesArray;
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

module.exports=reviewFunction;