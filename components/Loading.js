const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
             style={{background: '#0008', color: 'white', top: 0, left: 0, zIndex: 9}}>
            <div className="bouncer">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>



    )
}

export default Loading