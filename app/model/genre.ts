import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
interface GenreInterface extends Document {
    name: string;
}

// Define schema for Genre
const GenreSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })

// Define and export the Genre model

const Genre = mongoose.model<GenreInterface>('Genre', GenreSchema);

export default Genre;
