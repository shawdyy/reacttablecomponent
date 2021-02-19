import { Dispatch, SetStateAction } from "react";

export interface TableData  {
    columns: string[]
    values: BodyRowData[]
}
export interface BodyRowData {
    unique_adtile_id:string
    incident_id:string
    date:string
    reason_dropdown:string
    user_input:string
    user_agent:string
    toplevel_adunit:string
    adunit:string
    _url:string
    layout:string
    adtile:string
    banner_type:string
    size:string
    adapter:string
    classification:string
    gam_advertiser_id:string
    gam_lineitem_id:string
    gam_troubleshoot_id:string
    ast_auction_id:string
    ast_tag_id:string
    creative_id:string
    hb_bidder:string
    hb_adid:string
    hb_dealid:string
    [propNames:string]:string
}
export interface HeaderTransformConfig {
    unique_adtile_id:string
    incident_id:string
    date:string
    adapter:string
    reason_dropdown:string
    user_input:string
    user_agent:string
    toplevel_adunit:string
    adunit:string
    _url:string
    layout:string
    adtile:string
    banner_type:string
    size:string
    classification:string
    gam_advertiser_id:string
    gam_lineitem_id:string
    gam_troubleshoot_id:string
    ast_auction_id:string
    ast_tag_id:string
    creative_id:string
    hb_bidder:string
    hb_adid:string
    hb_dealid:string
    [propNames:string]:string
}
export interface BodyTransformConfig {
    unique_adtile_id: ((i:string) => string)
    incident_id:((i:string) => string)
    date:((i:string) => string)
    adapter:((i:string) => string)
    [propNames:string]:((i:string) => string)
}
export interface ISortingObject {
    key:string,
    ascending:boolean
}
export interface IReactTable {
    tableState: TableData
    sortingState: ISortingObject
    setSortingObject: Dispatch<SetStateAction<ISortingObject>>
}