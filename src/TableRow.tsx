import React, { MouseEvent } from "react";
import { maxCharLength } from "./helper";
import { BodyRowData, HeaderTransformConfig, BodyTransformConfig } from "./types";

interface Iprops {
    isHead:boolean
    headerKeys:string[]
    transformConfig:HeaderTransformConfig | BodyTransformConfig
    rowData?:BodyRowData
    headerClickHandler?:(i:string)=>void
}

const TableRow = ({isHead, headerKeys, transformConfig, rowData=undefined, headerClickHandler=undefined}:Iprops) => {
    if(isHead){
        return(
            <tr>
                {headerKeys?.map((header:string, index:number) => {
                    return(<th key={index} onClick={(evt:MouseEvent) => headerClickHandler?.(headerKeys[index])}>{transformConfig?.[header]}</th>)
                })}
            </tr>
        )
    }
    else{
        return(
            <tr>
                {rowData && headerKeys?.map((header:string, index:number) => {
                    if(typeof transformConfig?.[header] === "function"){
                        const fn = transformConfig?.[header] as (i:string) => string;
                        return(<td key={index}>{maxCharLength(fn(rowData?.[header]))}</td>)
                    }
                    else{
                        return(<td key={index}>{maxCharLength(rowData?.[header])}</td>)
                    }
                })}
            </tr>
        )
    }
}

export default TableRow;