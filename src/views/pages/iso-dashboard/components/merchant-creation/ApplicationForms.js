import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Application from '../../../application-form'
const ApplicationForms = () => {

  const [uid,setUid]=useState('')

  const location=useLocation()
  // console.log(location)
    useEffect(()=>setUid(location.state),[])


  return <><Application application_id={uid}/></>;
};

export default ApplicationForms;
