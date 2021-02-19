import React from 'react';
import TableRow from "./TableRow";
import { tableHeadTransformations, tableBodyTransformations } from "./tableTransformation.config";
import { useReactTable } from "./helper";
import { BodyRowData } from "./types";

const ReactTableComponent = () =>{
    const apiurl:string = "http://localhost:8000/get.php";
    const ReactTable = useReactTable(apiurl);

    const headerCellClickHandler = (headerKey:string) => {
        if(ReactTable.sortingState.key === headerKey){
            ReactTable.setSortingObject({...ReactTable.sortingState, ascending: !ReactTable.sortingState.ascending})
        }
        else{
            ReactTable.setSortingObject({key: headerKey, ascending: false});
        }
    }

    return (
        <div className="ReactTableComponent" >
            <table>
                <thead>
                    <TableRow
                        isHead={true}
                        headerKeys={ReactTable.tableState?.columns}
                        transformConfig={tableHeadTransformations}
                        sortingObject={ReactTable.sortingState}
                        headerClickHandler={headerCellClickHandler}
                    />
                </thead>
                <tbody>
                    {  
                        ReactTable.tableState?.values?.map((tablerow:BodyRowData, index:number) => {
                            return(
                            <TableRow
                                isHead={false}
                                headerKeys={ReactTable.tableState?.columns}
                                transformConfig={tableBodyTransformations}
                                sortingObject={ReactTable.sortingState}
                                rowData={tablerow}
                                key={index}
                            />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ReactTableComponent;
