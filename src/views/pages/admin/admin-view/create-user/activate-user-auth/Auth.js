import { useEffect, useState } from "react";

// ** Reactstrap Imports
import {
    Button,
  Card,
  CardBody,
} from "reactstrap";


// ** Styles
import "@styles/react/pages/page-authentication.scss";

//** Componets
import PasswordCreation from './PasswordCreation'
import VerifyMobile from './VerifyMobile'

const ResetPasswordBasic = () => {

  const [verify ,setVerify]=useState(false)
  const [toggle,setToggle]=useState(false)

  useEffect(()=>{
    const y=document.getElementById('thecard1')
    if(verify)y.style.transform =`perspective(4000px) rotateY(180deg)`
   
  },[verify])



  return(
    <div className="auth-wrapper auth-basic px-2">
      <button onClick={()=>{}}>Toggle</button>
      <div className="auth-inner my-2">
         <div
            className="card-container  position-relative  mb-sm-1"
            style={{ width: "400px", minHeight: "680px", margin: "0 auto",}}
          >
            <div id="thecard1" className="thecard position-absolute   w-100 h-100 " style={{transition:"all 2s ease" ,transformStyle: "preserve-3d",}}>
              <div className="cardfront position-absolute d-flex w-100 h-100" style={{backfaceVisibility:"hidden"}}>
                <VerifyMobile setVerify={setVerify} />
              </div>
              <div className="thecard2 position-absolute w-100 h-100 " style={{backfaceVisibility:"hidden" ,transform:"perspective(4000px) rotateY(180deg)"}}>
                <PasswordCreation/>
              </div>
            </div>
          </div>
          
      </div>
    </div>
  );
};

export default ResetPasswordBasic;



