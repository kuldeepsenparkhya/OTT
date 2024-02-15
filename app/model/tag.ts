import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
interface TagInterface extends Document {
    name: string;
    description: string;
}

// Define schema for Movie
const TagSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })

// Define and export the Movie model
const Tag = mongoose.model<TagInterface>('Tag', TagSchema);

export default Tag;