import mongoose, { Document, Schema, Types } from 'mongoose';

// Define interface for Video sub-document
interface BannerInterface {
    size: number;
    filename: string;
    mimetype: string;
    originalname: string;
    bannerUrl: string;
}

// Define interface for MovieBanner document
interface MovieBannerInterface extends Document {
    title: string;
    banner: BannerInterface[];
    movies: Types.ObjectId[];

    languageType: 'hindi' | 'english' | 'telugu' | 'punjabi';
    releaseDate: Date;
}

// Define schema for MovieBanner
const MovieBannerSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        banner: [{
            size: { type: Number, },
            filename: { type: String, },
            mimetype: { type: String, },
            originalname: { type: String, },
            bannerUrl: { type: String, }
        }],
        movies: [{
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }],
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

// Define and export the MovieBanner model
const MovieBanner = mongoose.model<MovieBannerInterface>('MovieBanner', MovieBannerSchema);

export default MovieBanner;
