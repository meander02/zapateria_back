const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for size and stock including price
const sizeStockSchema = new Schema({
    size: { type: Number, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true }
});

// Schema for product variants
// Schema for product variants
const variantSchema = new Schema({
    color: { type: String, required: true },
    texture: { type: String, required: true },
    sizeStock: {
        type: [sizeStockSchema],
        required: true
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: function(images) {
                if (!Array.isArray(images)) return false;
                for (let i = 0; i < images.length; i++) {
                    if (typeof images[i] !== 'string') return false;
                }
                return true;
            },
            message: props => `${props.value} should be an array of strings!`
        }
    }
});


// Main product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    material: { type: String, required: true },
    description: { type: String },
    dateAdded: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false },
    ratings: {
        average: { type: Number, default: 0 },
        reviews: [
            {
                userId: { type: Schema.Types.ObjectId, ref: 'User' },
                rating: { type: Number, required: true },
                comment: { type: String }
            }
        ]
    },
    variants: { type: [variantSchema], required: true }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
