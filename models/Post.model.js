const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
    {
     content: {
        type: String,
     },
     creatorId: { 
        type: Schema.Types.ObjectId, ref: "User"     
    },
     picPath: {
        type: String,
     },
     picName: {
        type: String,
     }
    },
    {
        timestamps: true
    }
);

module.exports = model("Post", PostSchema);
