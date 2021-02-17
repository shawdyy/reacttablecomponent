import React, { useState, useEffect} from 'react';
import { transformTable } from "./helper";
import { TableData } from './types';

const ReactTableComponent = () =>{

  const apiUrl = "http://localhost:8000/get.php"
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [transformedTable, setTransformedTable] = useState();

  useEffect(()=>{
      const response:Promise<Response> = fetch(apiUrl, {method: "get"});
      response.then((resolved:Response) =>{
        return resolved.json()
      }) 
      .then((parsed:TableData) =>{
        return transformTable(parsed);
      })
      .then((transformedData:TableData) => {
          setIsFetchingData(false);
          setTransformedTable(transformedData)
      })
      .catch((err:Error) => {
          console.error(err);
          setIsFetchingData(false);
      })
  },[])

  return (
    <div className="ReactTableComponent">
      <table>
        <thead>
          <tr>
            {
              transformedTable?.columns?.map((string:string, index:number) => {
                return(
                  <th key={index}>{string}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              transformedTable?.values?.map((tablerow:any, index:number) => {
                return(
                  <tr key={index}>
                    {transformedTable?.columns.map((value:(number | string), index:number) =>{
                      return(
                        <td key={index}>{tablerow[value]}</td>
                      )
                    })}
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  );
}

export default ReactTableComponent;
