import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Subscription document
interface SubscriptionInterface extends Document {
    movies: string[];
    userID: string[];
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
},
    {
        timestamps: true
    })

// Define and export the Subscription model
const Subscription = mongoose.model<SubscriptionInterface>('Subscription', SubscriptionSchema);

export default Subscription;