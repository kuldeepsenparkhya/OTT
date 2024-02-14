import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define interface for User document
interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    matchPassword: (password: string) => Promise<boolean>;
}

// Define schema for User
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not supported'
        },
        default: 'admin'

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define pre-save middleware for hashing password
UserSchema.pre<UserInterface>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Define instance method for comparing passwords
UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Define and export the User model
const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
