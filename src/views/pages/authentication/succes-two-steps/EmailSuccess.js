import {Card,CardBody,CardText} from 'reactstrap'

import image from './svg/email-verify-success.gif'

const Email=()=>{
    return <Card className='w-100 h-100'> 
    
    
    <CardBody className='d-flex justify-content-center align-items-cennter border' >
        <div className='d-flex justify-content-center align-items-cennter  flex-column text-center mb-5' >
        <img src={image}  width={150} className='' style={{borderRadius:"70%" , margin:"0 auto"}}/>
        <CardText className='fw-bold fs-1 mb-1 mt-1 text-success'>Success!</CardText>
        <CardText>Your email address has been verified</CardText>
        </div>
    </CardBody>
    </Card>
}
export default Email;