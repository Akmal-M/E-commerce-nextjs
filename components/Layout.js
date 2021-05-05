import React from 'react';
import Navbar from "./Navbar";
import Notify from "./Notify";

const Layout = ({children}) => {
    return (
        <div className='container'>
            <Navbar/>
            <Notify/>
            {children}
        </div>
    );
};

export default Layout;