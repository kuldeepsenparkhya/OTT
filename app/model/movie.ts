import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
interface MovieInterface extends Document {
    title: string;
    description: string;
    genres: string[];
    bannerImage: string;
    languageType: string;
    createdAt: Date;
    releaseDate: Date;
}

// Define schema for Movie
const MovieSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String
    },
    video: {
        type: String
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    languageType: {
        type: String,
        enum: ['hindi', 'english', 'telgu', 'punjabi'],
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define and export the Movie model
const Movie = mongoose.model<MovieInterface>('Movie', MovieSchema);

export default Movie;