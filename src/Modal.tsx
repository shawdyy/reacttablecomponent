import React, { ReactElement, useEffect } from "react";

interface IModal {
    title:string
    infoText:string[]
    children?:ReactElement
}

const Modal = ({title,infoText=[],children}:IModal) =>{
    useEffect(()=>{
        const styleElement = document.createElement("style");
        styleElement.id = "styleContainer"
        styleElement.innerText = "* {overflow: hidden !important;}";
        document.head.appendChild(styleElement)
        return () =>{
            styleElement.innerText = "";
        };
    })
    return(
        <div className="modalBackground">
            <div className="modalWindow">
                <div className="modalHeader">
                    <div className="modalHeaderTitleWrapper">
                        <h2>{title}</h2>
                    </div>
                    {infoText.map((text:string, index:number) =>{
                        return(
                            <div key={index} className="modalHeaderInfoText">
                                <p>{text}</p>
                            </div>
                        )
                    })}
                    <div className="closeButtonWrapper">
                        <div>
                            <span className="closeButton">✕</span>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;