import React, { ReactElement, useEffect } from "react";

const Modal = ({children}:{children:ReactElement}) =>{
    useEffect(()=>{
        let styleElement = document.createElement("style");
        styleElement.id = "styleContainer"
        styleElement.innerText = "body > * {overflow: hidden;}";
        return () =>{
            document.body.style.overflow = "inherit";
        };
    })
    return(
        <div className="modalBackground">
            <div className="modalWindow">
                {children}
            </div>
        </div>
    )
}

export default Modal;