import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({

    images: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.banner || mongoose.model('banner', bannerSchema)
export default Dataset