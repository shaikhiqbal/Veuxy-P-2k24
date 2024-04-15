import { ReactComponentElement, useState, useEffect } from "react";

//**  Verfication Component
import MobileVerify from './two-step-verification/MobileVerify'
import EmailVerify from './two-step-verification/EmailVerify'

//**  verificatio Done
import SuccessEmail from './succes-two-steps/EmailSuccess'
import SuccessMobile from './succes-two-steps/MobileSuccess'

//** Third Party
import { Modal, ModalBody, Row, Col, ModalHeader } from "reactstrap";

//** Custom CSS
import './Auth.css'

const SignUpVerificationModel = ({ isOpen, user }) => {
  console.log(user);
  //** Basice Modal Opne
  const [basicModal, setBasicModal] = useState(false);


  //** Is Email Verify
  const [isEmailVerificationDone, setIsEmailVerificationDone] = useState(false);

  //** Is Mobile Verify
  const [isMobileVerificationDone, setIsMobileVerificationDone] = useState(false);


  //** Is Email Verified
  const [isEmailVerified,setIsEmailVerified]=useState(false)

  //** Is Mobile Mobile Verified
  const[isMobileVerified,setIsMobileVerified]=useState(false)


useEffect(()=>{
  if(user?.email && user?.phone_no){
    setIsEmailVerified(true)
    setIsMobileVerified(true)
  }
  if(user?.email)setIsEmailVerified(true)
  if(user?.phone_no)setIsMobileVerified(true)
},[])


useEffect(()=>{
 
const y=document.getElementById('thecard1')
if(y && isEmailVerificationDone) y.style.transform=`perspective(4000px) rotateY(180deg)`
  
},[isEmailVerificationDone])

useEffect(()=>{
const y=document.getElementById('thecard2')
if(y && isMobileVerificationDone) y.style.transform=`perspective(4000px) rotateY(180deg)`
},[isMobileVerificationDone])



useEffect(()=>{
if((isEmailVerified && isEmailVerificationDone ) && (isMobileVerified && isMobileVerificationDone)) setTimeout(()=>window.location='/login',5000)
if((isEmailVerified && isEmailVerificationDone) && !isMobileVerified) setTimeout(()=>window.location='/login',5000)
if(!isEmailVerified && (isMobileVerified && isMobileVerificationDone)) setTimeout(()=>window.location='/login',5000)
},[isEmailVerificationDone,isMobileVerificationDone])

useEffect(() => {
    setBasicModal(isOpen);
  }, [isOpen]);
  console.log({isEmailVerified:isEmailVerified})
  return (
    <div>
      <Modal  
        isOpen={basicModal}
        className="modal-dialog-centered modal-lg"
        style={{width:"max-content  "}} 
        toggle={() => setBasicModal(!basicModal)}
      >

        <ModalBody className="d-flex justify-content-between flex-md-row flex-sm-column">
         {isEmailVerified &&  <div
            className="card-container  position-relative m-2  mb-sm-1"
            style={{ width: "364px", height: "630px", margin: "0 auto",order:isEmailVerificationDone ? '2':'0' }}
          >
            <div id="thecard1" className="thecard position-absolute w-100 h-100 " style={{transition:"all 2s ease" ,transformStyle: "preserve-3d"}}>
              <div className="cardfront position-absolute  w-100 h-100" style={{backfaceVisibility:"hidden"}}>
              <EmailVerify
                  user={user}
                  setIsEmailVerificationDone={setIsEmailVerificationDone}
                />
              </div>
              <div className="cardback position-absolute w-100 h-100 " style={{backfaceVisibility:"hidden" ,transform:"perspective(4000px) rotateY(180deg)"}}>
                <SuccessEmail/>
                
              </div>
            </div>
          </div>}
         {isMobileVerified &&  <div
            className="card-container  position-relative m-2   mb-sm-1"
            style={{ width: "364px", height: "630px", margin: "0 auto" }}
            >
            <div id="thecard2" className="thecard position-absolute w-100 h-100 " style={{transition:"all 2s ease" ,transformStyle: "preserve-3d"}}>
            <div className="cardfront position-absolute  w-100 h-100" style={{backfaceVisibility:"hidden"}}>

                <MobileVerify user={user}  setIsMobileVerificationDone={setIsMobileVerificationDone}/>
              </div>
              <div className="cardback position-absolute w-100 h-100 "  style={{backfaceVisibility:"hidden" ,transform:"perspective(4000px) rotateY(180deg)"}}>
                <SuccessMobile/>
              </div>
            </div>
          </div>}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignUpVerificationModel;

