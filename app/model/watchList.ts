import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
interface WatchListInterface extends Document {
    movies: string[];
    userID: string[];
    createdAt: Date;
}

// Define schema for WatchList
const WatchListSchema: Schema = new Schema({
    movies: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    userID: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define and export the WatchList model
const WatchList = mongoose.model<WatchListInterface>('WatchList', WatchListSchema);

export default WatchList;