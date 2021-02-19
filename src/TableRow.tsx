import React, { MouseEvent } from "react";
import { maxCharLength } from "./helper";
import { BodyRowData, HeaderTransformConfig, BodyTransformConfig, ISortingObject } from "./types";

interface Iprops {
    isHead:boolean
    headerKeys:string[]
    transformConfig:HeaderTransformConfig | BodyTransformConfig
    sortingObject: ISortingObject
    rowData?:BodyRowData
    headerClickHandler?:(i:string)=>void
}

const TableRow = ({isHead, headerKeys, transformConfig, sortingObject, rowData=undefined, headerClickHandler=undefined}:Iprops) => {
    if(isHead){
        return(
            <tr className="headerRow">
                {headerKeys?.map((header:string, index:number) => {
                    return(
                        <th key={index} onClick={(evt:MouseEvent) => headerClickHandler?.(header)}>
                            {transformConfig?.[header]}
                            {sortingObject.key === header && 
                                ((sortingObject.ascending) ? 
                                <span className="sortingMarker">/\</span> :
                                <span className="sortingMarker">\/</span>)
                            }
                        </th>)
                })}
            </tr>
        )
    }
    else{
        return(
            <tr className="bodyRow">
                {rowData && headerKeys?.map((header:string, index:number) => {
                    if(typeof transformConfig?.[header] === "function"){
                        const fn = transformConfig?.[header] as (i:(string|number)) => string;
                        return(
                        <td key={index}>
                            {maxCharLength(fn(rowData?.[header]))}
                        </td>)
                    }
                    else{
                        return(
                            <td key={index}>
                                {rowData?.[header]}
                            </td>)
                    }
                })}
            </tr>
        )
    }
}

export default TableRow;