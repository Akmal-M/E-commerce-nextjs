import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {bannerUpload} from '../../utils/bannerUpload'
import {postData, getData, putData} from '../../utils/fetchingData'
import {useRouter} from 'next/router'

const BannerCreate = () => {
    const initialState = {

    }
    const [images, setImages] = useState([])
    const [banner, setBanner] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const {banners, auth} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`banner/${id}`).then(res => {
                setBanner(res.banner)
                setImages(res.banner.images)
            })
        }else{
            setOnEdit(false)
            setBanner(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setBanner({...banner, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0)
            return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
                return err = 'The largest image size is 1mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 10) newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 10)
            return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 10 images.'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin')
            return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(images.length === 0)
            return dispatch({type: 'NOTIFY', payload: {error: 'Please add image.'}})


        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await bannerUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`banner/${id}`, {...banner, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('banners', {...banner, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

    }

    return(
        <div className="banners_manager">
            <Head>
                <title>Banners Manager</title>
            </Head>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">

                    <button type="submit" className="btn btn-info my-2 px-4">
                        {onEdit ? 'Update': 'Create'}
                    </button>

                </div>

                <div className="col-md-6 my-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                        </div>
                        <div className="custom-file border rounded">
                            <input type="file" className="custom-file-input"
                                   onChange={handleUploadInput} multiple accept="image/*" />
                        </div>

                    </div>

                    <div className="row img-up mx-0">
                        {
                            images.map((img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                         alt="" className="img-thumbnail rounded" />

                                    <span onClick={() => deleteImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>


                </div>


            </form>


        </div>
    )
}

export default BannerCreate