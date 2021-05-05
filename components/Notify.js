import {useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import Loading from "./Loading";
import Toast from "./Toast";



const Notify = () => {
    const [state, dispatch] = useContext(DataContext)
    const {notify} = state
    return (
        <div>
            {notify.Loading && <Loading/>}
            {notify.error && <Toast/>}
            {notify.success && <Toast/>}
        </div>
    );
};

export default Notify;