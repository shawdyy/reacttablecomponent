import { BodyRowData, BodyTransformConfig, HeaderTransformConfig, IValueToLinkConfig } from "./types";

interface IProps {
    headerRow:string[]
    bodyRow:BodyRowData
    headerTransformations:HeaderTransformConfig
    bodyTransformations:BodyTransformConfig
    valueToLinkConfig:IValueToLinkConfig
    excludeKeys?: string[]
}

const ModalContent = ({headerRow, bodyRow, headerTransformations, bodyTransformations, valueToLinkConfig, excludeKeys=[]}:IProps) => {
    return(
        <div className="modalContentComponent">
            {
                headerRow.map((header:string, index:number) => {
                    if(excludeKeys?.indexOf(header) === -1 && (bodyRow[header] !== null && bodyRow[header] !== "")){
                        const key = headerTransformations[header];
                        const value = (bodyTransformations[header]) ? bodyTransformations[header](bodyRow[header] as never) : bodyRow[header];
                        const link = (valueToLinkConfig[header]) ? valueToLinkConfig[header](bodyRow) : undefined;
                        return(
                            <>
                                <div className="modalContentRow">
                                    <div className="modalContentRow_key">{key + ":"}</div>
                                    { (!link || bodyRow.adapter === "AST") && <div className="modalContentRow_value">{value}</div> }
                                    { (link && bodyRow.adapter !== "AST") && <div className="modalContentRow_value">
                                        <a target="_blank" rel="noreferrer" href={link}>{value}</a>
                                    </div> }
                                </div>
                            </>
                        )
                    }
                    else{
                        return(<></>);
                    }
                })
            }
        </div>
    )
}

export default ModalContent