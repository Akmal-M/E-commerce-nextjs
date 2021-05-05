const Toast = ({msg, handleShow, bgColor}) => {
    return (
        <div>
            <div className={`toast show position-fixed text-light ${bgColor}`} data-autohide="false">
                style={{top:'5px', right:'5px', zIndex:9, minWidth:'280px'}}
                <div className={`toast-header ${bgColor} text-light`}>
                    <strong className="mr-auto text-light">Toast Header</strong>
                    <small className="text-muted">5 mins ago</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
                </div>
                <div className="toast-body">
                    Some text inside the toast body
                </div>
            </div>
        </div>
    );
};

export default Toast;