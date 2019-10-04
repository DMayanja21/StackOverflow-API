//Call mongoose
const mongoose = require('mongoose');

//Call Schema constructor
const Schema = mongoose.Schema;

//Create a answers schema
const answersSchema= new Schema({
    //answer_id: mongoose.Schema.Types.ObjectId,
    answers: [
        {
            user_id:{
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            text: {
                type: String,
                required:true
            },
            status:{
                upvotes: [
                    {
                        user_id:{
                            type: mongoose.Schema.Types.ObjectId,
                            required: true
                        }
                    }
                ],
                downvotes: [
                    {
                        user_id:{
                            type: mongoose.Schema.Types.ObjectId,
                            required: true
                        }
                    }
                ]
            }
        }
    ],
})

//Export model
module.exports= Answer = mongoose.model("Answer", answersSchema)