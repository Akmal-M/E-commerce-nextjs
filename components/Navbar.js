import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'
import {GiShoppingCart} from "react-icons/gi";

function Navbar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth, cart } = state


    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
        return router.push('/')
    }

    const adminRouter = () => {
        return(
            <>
                <Link href="/users">
                    <a className="dropdown-item">Users</a>
                </Link>
                <Link href="/create">
                    <a className="dropdown-item">Products</a>
                </Link>
                <Link href="/categories">
                    <a className="dropdown-item">Categories</a>
                </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar}
                         style={{
                             borderRadius: '50%', width: '30px', height: '30px',
                             transform: 'translateY(-3px)', marginRight: '3px'
                         }} /> <span style={{color:"white"}}>{auth.user.name}</span>
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{color:"white"}}>
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    {
                        auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"/>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info" >
            <Link  href="/">
                <a className="navbar-brand" style={{color:"white"}}>E-Commerce</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav p-1">
                    <li className="nav-item" >
                        <Link href='/cart' >
                            <a className={"nav-link" + isActive('/cart')} style={{position:"relative", color:"white"}}>
                                <span className='position-absolute bg-danger style={{color:"white"}}'
                                      style={{color:"white", fontSize:"12px", paddingRight:"6px", paddingLeft:"6px", borderRadius:"100%", top:"0", left:"16px"}}>{cart.length}</span>
                                <GiShoppingCart size='30'/>Cart</a>
                        </Link>
                    </li>
                    {
                        Object.keys(auth).length === 0
                            ? <li className="nav-item">
                                <Link href="/signin">
                                    <a className={"nav-link" + isActive('/signin')} style={{color:"white"}}>
                                        <i className="fas fa-user" aria-hidden="true" ></i> Sign in
                                    </a>
                                </Link>
                            </li>
                            : loggedRouter()
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar