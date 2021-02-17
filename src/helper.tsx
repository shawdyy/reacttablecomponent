import { TableData } from "./types";
import { tableHeadTransformations, tableBodyTransformations } from "./tableTransformation.config";

interface IconfigHead {
    [propName:string]: string 
}
interface IconfigBody {
    [propName:string]: ((input: (string | number)) => string)
}
const transformHeaderRow = (headerRow:string[], config:IconfigHead):string[] => {
    let toReturn:string[] = headerRow.map((element:string, index:number) => {
        return (config[element]) ? config[element] : element;
    });
    return toReturn;
}
const transformBodyRow = (tableRow:IconfigHead, headerRow:string[], config:IconfigBody):IconfigHead => {
    let toReturn:{[propName:string]:string} = {};
    for(let i = 0; i < headerRow.length; i++){
        toReturn[headerRow[i]] = (config[headerRow[i]]) ? config[headerRow[i]](tableRow[headerRow[i]]) : tableRow[headerRow[i]];
    }
    return toReturn;
}
export const transformTable = (rawTableData:TableData):TableData => {
    const toReturn:TableData = {columns: [], values: []};
    toReturn.columns = transformHeaderRow(rawTableData?.columns, tableHeadTransformations);

    for(let i = 0; i < rawTableData.values.length; i++){
        toReturn.values.push(transformBodyRow(rawTableData.values[i], rawTableData.columns, tableBodyTransformations))
    }

    return toReturn;
}
