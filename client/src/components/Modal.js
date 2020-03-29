import React from 'react';
import ReactDOM from 'react-dom';
const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    {props.title}
                </div>
                <div>
                    {props.content}
                </div>
                <div>
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;