import connectDB from '../../../utils/connectDB'
import Banners from '../../../models/bannerModel'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getBanners(req, res)
            break;
    }
}

const getBanners = async (req, res) => {
    try{
        const banners = await Banners.find()
        res.json({
            status:"success",
            result: banners.length,
            banners
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}