import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
interface GenreInterface extends Document {
    name: string;
    description: string;
    parantGenre: string;
    createdAt: Date;
}

// Define schema for Genre
const GenreSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parantGenre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define and export the Genre model

const Genre = mongoose.model<GenreInterface>('Genre', GenreSchema);

export default Genre;
