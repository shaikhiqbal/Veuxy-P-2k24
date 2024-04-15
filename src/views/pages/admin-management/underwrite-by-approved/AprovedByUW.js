import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

import Preview from "../../../components/merchant-rates-form/merchant-rates-management/Preview";



//** /admin/preview */
const AprovedByUW = () => {
const [data,setData]=useState({})

const location=useLocation();
const {userId}=location.state;

useEffect(()=>{
// do
// getData


},[])


  return (
    <Card>
      <CardBody>
        <Preview data={data} userId={userId} />
      </CardBody>
    </Card>
  );
};

export default AprovedByUW;
