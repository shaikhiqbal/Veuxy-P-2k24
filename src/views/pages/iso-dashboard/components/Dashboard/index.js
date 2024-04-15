import React from "react";

//** Fake Db
import data from "../../fakedb/dashboard_db";

//**  Third Party
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardBody,
} from "reactstrap";
import { ChevronUp, ChevronDown } from "react-feather";

//** styles
import '../../styles/index.css'

const Dashboard = () => {
  //   console.log(data);
  return (
    <Container
      id="dashboardContainer"
      className="d-flex justify-content-center"
    >
      <Row className="gx-5">
        {data &&
          data.map((card, idx) => {
            return (
              <Col  lg={3} md={4} sm={6} xs={12} key={idx}>
                <Card
                  body
                  className="my-2 dashboard-iso-card"
                  style={{
                    width: "18rem",
                  }}
                >
                 <CardBody >
                 <CardTitle tag="h5" id="d-card-title">
                    <div>{card.icon}</div>
                    <div className="">
                      <span id="rating">
                        {card.process}%
                        {card.process > 30 ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        )}
                      </span>
                    </div>
                  </CardTitle>

                  <CardText className="card-text">{card.count}</CardText>
                  <CardText className="card-text">{card.title}</CardText>
                 </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Dashboard;
