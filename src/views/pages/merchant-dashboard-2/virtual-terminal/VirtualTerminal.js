import React, { useEffect, useState } from "react";
import VertualTerminalForm from "../../../components/merchant-dashboard-2/virtual-terminal-form/VertualTerminalForm";
const VirtualTerminal = () => {
// ** state
  const [data,setData]=useState(null);
  const getData = (data) => {
    const validate=Object.keys(data).every(key=>data[key])
    console.log(validate)
  }


  // Post vertualTerminal
  // get Active card` acitveCard

useEffect(()=>{
  if(data)postData(data)
},[data])

  return (
    <div>
      <VertualTerminalForm onPassData={getData} />
    </div>
  );[]
};

export default VirtualTerminal;
