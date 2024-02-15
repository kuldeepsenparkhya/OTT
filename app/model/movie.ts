import mongoose, { Document, Schema, Types } from 'mongoose';

// Define interface for Video sub-document
interface VideoInterface {
    size: number;
    filename: string;
    mimetype: string;
    originalname: string;
    videoUrl: string;
}

// Define interface for Movie document
interface MovieInterface extends Document {
    title: string;
    description: string;
    video: VideoInterface[];
    genres: Types.ObjectId[];
    categories: Types.ObjectId[];
    tags: Types.ObjectId[];
    type: string,
    languageType: 'hindi' | 'english' | 'telugu' | 'punjabi';
    releaseDate: Date;
}

// Define schema for Movie
const MovieSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        video: [{
            size: { type: Number, },
            filename: { type: String, },
            mimetype: { type: String, },
            originalname: { type: String, },
            videoUrl: { type: String, }
        }],
        genres: [{
            type: Schema.Types.ObjectId,
            ref: 'Genre'
        }],
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }],
        type: {
            type: String,
            enum: ['Thriller', 'Science Fiction', 'Romance', 'Mystery', 'Musical', 'Horror', 'Fantasy', 'Drama', 'Documentary', 'Comedy', 'Action', 'Western'],
            required: true
        },
        languageType: {
            type: String,
            enum: ['hindi', 'english', 'telugu', 'punjabi'],
            required: true
        },
        releaseDate: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true
    }
);

// Define and export the Movie model
const Movie = mongoose.model<MovieInterface>('Movie', MovieSchema);

export default Movie;
