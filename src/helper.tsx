import { BodyRowData, TableData, IReactTable, BodyTypeTransform } from "./types";
import { useEffect, useState } from "react";
import { tableBodyTypeTransform } from "./tableTransformation.config"

export const maxCharLength = (input:string):string => {
    return (input && input.length > 70) ? input.substring(0, 67) + "..." : input;
}
export const generateSortingCallback = (sorting:{key:string, ascending:boolean}):(a:BodyRowData,b:BodyRowData) => number => {
    if(sorting.ascending){
        return function(a:BodyRowData,b:BodyRowData):number{
            if(a[sorting.key] < b[sorting.key]){
                return -1;
            }
            else if(a[sorting.key] > b[sorting.key]){
                return 1;
            }
            return 0;
        }
    }
    else{
        return function(a:BodyRowData,b:BodyRowData):number{
            if(a[sorting.key] < b[sorting.key]){
                return 1;
            }
            else if(a[sorting.key] > b[sorting.key]){
                return -1;
            }
            return 0;
        }
    }
}
export const fetchData = async(apiurl:string) => {
    try{
        const response = await fetch(apiurl, {method: "get"});
        const responseJSON:TableData = await response.json();
        return responseJSON;
    }
    catch(err){
        return err;
    }
}
export const useReactTable = (apiurl:string):IReactTable => {
    const [_table, _setTable] = useState<TableData>({columns: [], values:[]} as TableData);
    const [_sortingObject, _setSortingObject] = useState({key:"date", ascending: false});
    const sortTable = (table:TableData) => {
        const sortingCallback = generateSortingCallback(_sortingObject);
        const sortedTable = {...table}
        sortedTable.values.sort(sortingCallback);
        _setTable(sortedTable);
    };
    const transformCellTypes = (tableData:TableData) => {
        const c = {...tableData};
        c.values = c.values.map((values:BodyRowData, i:number) => {
            const d = values;
            for(let i = 0, k = Object.keys(tableBodyTypeTransform); i < k.length; i++){
                d[k[i]] = Number(d[k[i]]);
            }
            return d;
        });
        return c;
    }
    useEffect(() => {
        (async function(apiurl){
            const rawTableData = await fetchData(apiurl);
            const transformedTypes = transformCellTypes(rawTableData);
            sortTable(transformedTypes);
        })(apiurl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(() =>{
        sortTable(_table);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[_sortingObject])
    return {
        tableState: _table,
        sortingState: _sortingObject,
        setSortingObject: _setSortingObject
    };
}