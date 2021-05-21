import connectDB from '../../../utils/connectDB'
import Banners from '../../../models/bannerModel'
import auth from "../../../middleware/auth";

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getBanner(req, res)
            break;
        case "PUT":
            await updateBanner(req, res)
            break;
        case "DELETE":
            await deleteBanner(req, res)
            break;
    }
}

const getBanner = async (req, res) => {
    try {
        const { id } = req.query;

        const banner = await Banners.findById(id)
        if(!banner) return res.status(400).json({err: 'This banner does not exist.'})

        res.json({ banner })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateBanner = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
            return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query
        const {images} = req.body

        if(images.length === 0)
            return res.status(400).json({err: 'Please add one image at least'})

        await Banners.findOneAndUpdate({_id: id}, {
            images
        })

        res.json({msg: 'Success! Updated a banner'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteBanner = async(req, res) => {
    try {
        const result = await auth(req, res)

        if(result.role !== 'admin')
            return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query

        await Banners.findByIdAndDelete(id)
        res.json({msg: 'Deleted a banner.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}