import { BodyRowData } from "./types";

export const tableHeadTransformations = {
    unique_adtile_id: "Unique Alert ID",
    incident_id: "Alert ID",
    date: "Datum",
    reason_dropdown: "Grund",
    user_input: "Nutzer Freitext",
    user_agent: "User Agent",
    toplevel_adunit: "Adunit Toplevel",
    adunit: "Adunit Gesamt",
    _url: "URL",
    layout: "Layout",
    adtile: "Adtile",
    banner_type: "Werbeform",
    size: "Slotgröße",
    adapter: "Adserver",
    classification: "Klassifikation",
    gam_advertiser_id: "GAM Advertiser ID",
    gam_lineitem_id: "GAM Lineitem ID",
    gam_troubleshoot_id: "GAM Troubleshoot ID",
    ast_auction_id: "AST Auction ID",
    ast_tag_id: "AST Tag ID",
    creative_id: "Creative ID",
    hb_bidder: "HB Bidder",
    hb_adid: "HB Ad ID",
    hb_dealid: "HB Deal ID",
};
export const tableBodyTransformations = {
    unique_adtile_id: (input:number):string => "#"+input,
    incident_id: (input:number):string => "#" + input,
    date: (input:string):string => new Date(input).toLocaleDateString("de"),
    adapter: (input:string):string => (input === "GPT") ? "Google Admanager" : (input === "AST") ? "Xandr" : "-",
}
export const valueToLinkConfig = {
    _url: (bodyRow:BodyRowData):string => bodyRow._url,
    gam_lineitem_id: (bodyRow:BodyRowData):string => "https://admanager.google.com/183#delivery/line_item/detail/line_item_id=" + bodyRow.gam_lineitem_id,
    creative_id: (bodyRow:BodyRowData):string => "https://admanager.google.com/183#delivery/line_item/detail/line_item_id=" + bodyRow.gam_lineitem_id + "&creative_id=" + bodyRow.creative_id,
    gam_troubleshoot_id: (bodyRow:BodyRowData):string => "https://admanager.google.com/183#troubleshooting/screenshot/query_id=" + bodyRow.gam_troubleshoot_id,
    
}
export const tableBodyTypeTransform = {
    unique_adtile_id: "number",
    incident_id: "number",
}
export const styleConfig = {
    unique_adtile_id: {textAlign: "center", fontSize: 14, fontWeight: 700, color: "#7e57c2"},
    incident_id: {textAlign: "center", fontSize: 14},
    user_input: {minWidth: 200},
    user_agent: {minWidth: 300},
    toplevel_adunit: {},
    layout: {textTransform: "capitalize"},
    hb_bidder: {textTransform: "capitalize"},
}