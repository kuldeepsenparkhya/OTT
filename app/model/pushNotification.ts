import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Subscription document
interface SubscriptionInterface extends Document {
    movies: string[];
    userID: string[];
    createdAt: Date;
}

// Define schema for Subscription
const SubscriptionSchema: Schema = new Schema({
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

// Define and export the Subscription model
const Subscription = mongoose.model<SubscriptionInterface>('Subscription', SubscriptionSchema);

export default Subscription;