import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Category document
interface CategoryInterface extends Document {
    name: string;
    slug: string;
    parantGenre: string;
    description: string;

}

// Define schema for Genre
const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,

    },
    parantCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
},
    {
        timestamps: true
    });



// Define and export the Category model

const Category = mongoose.model<CategoryInterface>('Category', CategorySchema);

export default Category;
