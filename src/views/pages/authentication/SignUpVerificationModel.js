import { ReactComponentElement, useState, useEffect } from "react";

//**  Verfication Component
import MobileVerify from "./tow-step-sign-up/MobileVerify";
import EmailVerify from "./tow-step-sign-up/EmailVerify";

//**  verificatio Done
import SuccessEmail from './succes-two-steps/EmailSuccess'
import SuccessMobile from './succes-two-steps/MobileSuccess'

//** Third Party
import { Modal, ModalBody, Row, Col, ModalHeader } from "reactstrap";

//** Custom CSS
import './Auth.css'

const SignUpVerificationModel = ({ open, checkData }) => {
  //** Basice Modal Opne
  const [basicModal, setBasicModal] = useState(false);

  //** Check Email is Updata
  const [isEmailUpdate, setIsEmailUpdate] = useState(
    checkData && checkData.email
  );

  //** Is Email Verify
  const [isEmailVerify, setIsEmailVerify] = useState(false);

  //** Is Mobile Verify
  const [isMobileVerify, setIsMobileVerify] = useState(false);


  //** Temp togle
  const [rotateEmail,setRotateEmail]=useState(false)
  const [rotateMobile, setRotateMobile]=useState(false)

useEffect(()=>{
 
const y=document.getElementById('thecard1')
if(y) y.style.transform=`perspective(4000px) rotateY(180deg)`
  
},[isEmailVerify])

useEffect(()=>{
const y=document.getElementById('thecard2')
if(y) y.style.transform=`perspective(4000px) rotateY(180deg)`
},[isMobileVerify])



useEffect(()=>{
isEmailVerify && isMobileVerify && setTimeout(()=>window.location='/login',5000)

},[isEmailVerify,isMobileVerify])

  useEffect(() => {
    setBasicModal(open);
  }, [open]);
  return (
    <div>
      <Modal  
        isOpen={basicModal}
        className="modal-dialog-centered modal-lg"
        toggle={() => setBasicModal(!basicModal)}
      >
        <ModalBody className="d-flex justify-content-between flex-md-row flex-sm-column">
          <div
            className="card-container  position-relative  mb-sm-1"
            style={{ width: "364px", height: "750px", margin: "0 auto",order:isEmailVerify ? '2':'0' }}
          >
            <div id="thecard1" className="thecard position-absolute w-100 h-100 " style={{transition:"all 2s ease" ,transformStyle: "preserve-3d"}}>
              <div className="cardfront position-absolute  w-100 h-100" style={{backfaceVisibility:"hidden"}}>
              <EmailVerify
                  user={checkData}
                  setUserEmail={setIsEmailUpdate}
                  setIsEmailVerify={setIsEmailVerify}
                />
              </div>
              <div className="cardback position-absolute w-100 h-100 " style={{backfaceVisibility:"hidden" ,transform:"perspective(4000px) rotateY(180deg)"}}>
                <SuccessEmail/>
               
              </div>
            </div>
          </div>
          <div
            className="card-container  position-relative   mb-sm-1"
            style={{ width: "364px", height: "750px", margin: "0 auto" }}
            >
            <div id="thecard2" className="thecard position-absolute w-100 h-100 " style={{transition:"all 2s ease" ,transformStyle: "preserve-3d"}}>
            <div className="cardfront position-absolute  w-100 h-100" style={{backfaceVisibility:"hidden"}}>

                <MobileVerify user={checkData} userEmail={isEmailUpdate} setIsMobileVerify={setIsMobileVerify}/>
              </div>
              <div className="cardback position-absolute w-100 h-100 bg-warning"  style={{backfaceVisibility:"hidden" ,transform:"perspective(4000px) rotateY(180deg)"}}>
                <SuccessMobile/>
              </div>
            </div>
          </div>


        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignUpVerificationModel;

