// ** Third Party Components
import PropTypes from "prop-types";
import { useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Collapse,
  Label,
  Row,
} from "reactstrap";
const documentName = {
  personal_id: "Personal Id",
  cancel_cheque: "Cancel Cheque",
  creditcard_statement: "Creditcard Statement",
  bank_statement: "Bank Statement",
  utility_bill: "Utility Bill",
  corporate_documents: "Corporate Documents",
};
const DocumentViewCard = ({
  icon,
  color,
  stats,
  statTitle,
  className,
  cop,
  pdfHref,
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Card className="text-center">
      <CardBody
        className={className}
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius:"5px"
        }}
      >
        <div
          className={`avatar p-50 m-0 mb-1 ${
            color ? `bg-light-${color}` : "bg-light-primary"
          }`}
        >
          <a href={pdfHref} target="_blank">
            <div className="avatar-content">{icon}</div>
          </a>
        </div>
        <h2 className="fw-bolder text-nowrap text-truncate">
          {documentName[stats]}
        </h2>
        <p className="card-text line-ellipsis">{statTitle}</p>
        {cop && (
          <Button.Ripple
            className="round"
            color="primary"
            outline
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            see user details
          </Button.Ripple>
        )}
        <Collapse isOpen={toggle}>
          <Row>
            <Col
              sm="12"
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <Label>Name:</Label>
              <CardText>
                {cop?.first_name} {cop?.last_name}
              </CardText>
            </Col>
          </Row>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default DocumentViewCard;

// ** PropTypes
DocumentViewCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
};
