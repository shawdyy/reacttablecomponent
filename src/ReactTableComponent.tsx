import React, { MouseEvent } from 'react';
import TableRow from "./TableRow";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import { tableHeadTransformations, tableBodyTransformations, valueToLinkConfig, styleConfig} from "./tableTransformation.config";
import { useReactTable, useModal } from "./helper";
import { BodyRowData } from "./types";

const ReactTableComponent = () =>{
    const apiurl:string = "http://example.com";
    const ReactTable = useReactTable(apiurl);
    const ReactModal = useModal();

    const headerCellClickHandler = (headerKey:string) => {
        if(ReactTable.sortingState.key === headerKey){
            ReactTable.setSortingObject({...ReactTable.sortingState, ascending: !ReactTable.sortingState.ascending})
        }
        else{
            ReactTable.setSortingObject({key: headerKey, ascending: false});
        }
    }
    const tableRowClickHandler = (index:number) => {
        ReactModal.setIsVisible(true);
        ReactModal.setRowDataIndex(index);
    }

    return (
        <>
            { ReactModal.isVisible &&
                <Modal
                    title={"Unique Alert ID #" + ReactTable.tableState.values[ReactModal.rowDataIndex].unique_adtile_id}
                    infoText={[tableBodyTransformations.date(ReactTable.tableState.values[ReactModal.rowDataIndex].date)]}
                    closeClickHandler={(e:MouseEvent) => ReactModal.setIsVisible(false)}
                >
                    <ModalContent
                       headerRow={ReactTable.tableState.columns} 
                       bodyRow={ReactTable.tableState.values[ReactModal.rowDataIndex]} 
                       headerTransformations={tableHeadTransformations}
                       bodyTransformations={tableBodyTransformations}
                       valueToLinkConfig={valueToLinkConfig}
                       excludeKeys={["unique_adtile_id", "date"]}
                    />
                </Modal>
            }
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
                                    styleConfig={styleConfig}
                                    rowData={tablerow}
                                    key={index}
                                    bodyClickHandler={(e:MouseEvent) => tableRowClickHandler(index)}
                                />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ReactTableComponent;
