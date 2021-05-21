import Head from 'next/head'
import { useContext } from 'react'
import {DataContext} from '../store/GlobalState'
import Link from 'next/link'
import {FaCheck, FaEdit, FaTimes, FaTrashAlt} from "react-icons/fa";

const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const {users, auth, modal} = state

    if(!auth.user) return null;
    return(
        <div className="table-responsive">
            <Head>
                <title>Users</title>
            </Head>

            <table className="table w-100">
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {
                    users.map((user, index)=> (
                        <tr key={user._id} style={{cursor: 'pointer'}}>
                            <th>{index + 1}</th>
                            <th>{user._id}</th>
                            <th>
                                <img src={user.avatar} alt={user.avatar}
                                     style={{
                                         width: '30px', height: '30px',
                                         overflow: 'hidden', objectFit: 'cover'
                                     }} />
                            </th>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            <th>
                                {
                                    user.role === 'admin'
                                        ? user.root ? <FaCheck className=" fa-check text-success"> Root</FaCheck>
                                        : <FaCheck className=" fa-check text-success"/>

                                        :<FaTimes className=" fa-times text-danger"/>
                                }
                            </th>
                            <th>
                                <Link href={
                                    auth.user.root && auth.user.email !== user.email
                                        ? `/edit_user/${user._id}` : '#!'
                                }>
                                    <a><FaEdit className=" fa-edit text-info mr-2" title="Edit"/></a>
                                </Link>

                                {
                                    auth.user.root && auth.user.email !== user.email
                                        ? <FaTrashAlt className="  text-danger ml-2" title="Remove"
                                             data-toggle="modal" data-target="#exampleModal"
                                             onClick={() => dispatch({
                                                 type: 'ADD_MODAL',
                                                 payload: [{ data: users, id: user._id, title: user.name, type: 'ADD_USERS' }]
                                             })}/>

                                        : <FaTrashAlt className="  text-danger ml-2" title="Remove"/>
                                }

                            </th>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    )
}

export default Users

