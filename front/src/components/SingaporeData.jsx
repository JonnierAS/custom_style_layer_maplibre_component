import React, { useEffect } from 'react'
import * as h3 from 'h3-js';

import singaporeHexagonsObj from "./data.json"
export default function SingaporeData({setDataURl}) {
    useEffect(()=>{
        const onLoad = () => {
          const sgHexagonsArr = [];
    
          for (const hexagon in singaporeHexagonsObj) {
              sgHexagonsArr.push({
                hexindex7: hexagon,
                bookingCount: singaporeHexagonsObj[hexagon]
              });
          }
          
          const rs = sgHexagonsArr.map((row) => {
              const style = getStyle(row);
              return {
                type: "Feature",
                properties: {
                  color: style.color,
                  opacity: style.opacity,
                  id: row.hexindex7,
                },
                geometry: {
                  type: "Polygon",
                  coordinates: [h3.cellToBoundary(row.hexindex7, true)],
                },
              };
          });
          setDataURl(rs);
          
      };
      onLoad()
       },[])
       const getStyle = (row) => {
    
        const styles = [
          {
            color: '#FEDD87',
            opacity: 0.2
          },
          {
            color: '#FED976',
            opacity: 0.4
          },
          {
            color: "#FC9653",
            opacity: 0.6,
          },
          {
            color: "#F77645",
            opacity: 0.7
          },
          {
            color: "#E14C48",
            opacity: 0.8
          }
        ];
    
    
        if (Number(row.bookingCount) === 0) {
          return {opacity: 0};
        }
    
        if (Number(row.bookingCount) < 250) {
          return styles[0];
        }
        if (Number(row.bookingCount) < 500) {
          return styles[1];
        }
        if (Number(row.bookingCount) < 1000) {
          return styles[2];
        }
        if (Number(row.bookingCount) < 1500) {
          return styles[3];
        }
        return styles[4];
    };
  return;
}
