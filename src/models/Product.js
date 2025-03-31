import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // Name is required with a custom error message
        minlength: [3, "Name must be at least 3 characters"], // Minimum length
        max_length: [50, "Name cannot exceed 50 characters"], // Maximum length
        trim: true, // Removes whitespace from beginning & end
    },
    brand:{
        type:String,
        required:[true,"Brand is required"],

    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0,"Price must not be negative value."]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    rating : {
        type:Number,
        min:[1,"Rating value must be between 1 and 5"],
        max:[5,"Rating value must be between 1 and 5"],
    },
    description : String,
    imageUrls:{
        type:[String]
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    }
});

const model = mongoose.model("Product",productSchema);

export default model;