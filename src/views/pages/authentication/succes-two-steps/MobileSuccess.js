import {Card,CardBody,CardText} from 'reactstrap'

import image from './svg/mobile-verify.gif'

const Mobile=()=>{
    return <Card className='w-100 h-100'> 
    
    
    <CardBody className='d-flex justify-content-center align-items-cennter border' >
        <div className='d-flex justify-content-center align-items-cennter  flex-column text-center mb-5' >
        <img src={image}  width={200} className='' style={{borderRadius:"50%" , margin:"0 auto"}}/>
        <CardText className='fw-bold fs-1 mb-1 mt-1 text-success'>Success!</CardText>
        <CardText>Your mobile number has been verified</CardText>
        </div>
    </CardBody>
    </Card>
}
export default Mobile;