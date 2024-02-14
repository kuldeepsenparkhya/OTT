import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Subscription document
interface SubscriptionInterface extends Document {
    name: string;
    description: string;
    price: number;
    duration: number; // Duration of the plan in days
    features: string[];
    createdAt: Date;
}

// Define schema for Subscription
const SubscriptionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    features: [{
        type: String,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define and export the Subscription model
const SubscriptionPlan = mongoose.model<SubscriptionInterface>('SubscriptionPlan', SubscriptionSchema);

export default SubscriptionPlan;