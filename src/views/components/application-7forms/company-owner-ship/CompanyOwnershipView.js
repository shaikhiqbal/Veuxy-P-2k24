// ** React Imports
import { useEffect, useState } from "react";

// ** Custom Components
// import country_code from "../../../../../country_code.json";
import country_code from "../../../../country_code.json";

// ** Icons
import { Trash } from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
  CardFooter,
  Spinner,
} from "reactstrap";

const directorTemplate = {
  application_id: localStorage.getItem("application_id"),
  first_name: "",
  last_name: "",
  date_of_birth: "",
  house_number: "",
  street_address: "",
  zip_code: "",
  city: "",
  country: "",
  telephone_number: "",
  passport: "",
  social_security_number: "",
  cop_type: 1,
};
const uboTemplate = {
  application_id: localStorage.getItem("application_id"),
  first_name: "",
  last_name: "",
  date_of_birth: "",
  house_number: "",
  street_address: "",
  zip_code: "",
  city: "",
  country: "",
  telephone_number: "",
  passport: "",
  social_security_number: "",
  cop_type: 2,
};

const CompanyOwner = (props) => {
  const { setpper, data } = props;

  // ** State
  const [directorFeild, setDirectorFeild] = useState([{ ...directorTemplate }]);
  const [uboFeild, setUboFeild] = useState([{ ...uboTemplate }]);
  const [anyUBO, setAnyUBO] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAccepted, setAccepted] = useState(true);

  // ** Country
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  const setGetData = (data) => {
    if (!data) return;
    setDirectorFeild([]);

    const cp1 = [];
    const cp2 = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].cop_type === 2) {
        setUboFeild([]);
        setAnyUBO(true);
        break;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i]["cop_type"] === 1) {
        cp1.push(data[i]);
      } else if (data[i]["cop_type"] === 2) {
        cp2.push(data[i]);
      }
    }

    if (cp1.length > 0) setDirectorFeild([...cp1]);
    if (cp2.length > 0) setUboFeild([...cp2]);
  };

  useEffect(() => {
    setGetData(data);
  }, [data]);

  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="card-title">Company Ownership</h5>
          <small className="text-muted">Add Owners Details.</small>
        </div>
      </CardHeader>
      <CardBody>
        {/* Director Template  */}
        {directorFeild.map((i, index) => (
          <Row id="director-template" className="dynamic-form-template">
            <div className="content-header dynamic-form-header mb-3">
              <div className="card-form-title">
                <span>{index + 1}:Director</span>
              </div>
            </div>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={i.first_name}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="last_name">
                Last Name
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={i.last_name}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="date_of_birth">
                Date of Birth
              </Label>
              <Input
                readOnly={isAccepted}
                type="date"
                className="form-control"
                id="date_of_birth"
                name="date_of_birth"
                value={i.date_of_birth}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="street_address">
                Street Address
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="street_address"
                name="street_address"
                value={i.street_address}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="house_number">
                Office / House number
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="house_number"
                name="house_number"
                value={i.house_number}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="zip_code">
                Postcode / zip code
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="zip_code"
                name="zip_code"
                value={i.zip_code}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="city">
                City
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={i.city}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="country">
                Country
              </Label>
              <Input
                readOnly={isAccepted}
                type="select"
                className="form-control"
                id="country"
                name="country"
                value={i.country}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              >
                <option>---select---</option>
                {country}
              </Input>
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="telephone_number">
                Telephone Number
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="telephone_number"
                name="telephone_number"
                value={i.telephone_number}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="passport">
                Passport ID/Number
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="passport"
                name="passport"
                value={i.passport}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="social_security_number">
                Social Security Number
              </Label>
              <Input
                readOnly={isAccepted}
                type="text"
                className="form-control"
                id="social_security_number"
                name="social_security_number"
                value={i.social_security_number}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
            </Col>
          </Row>
        ))}
        <CardText className=" fw-bold">
          Are there Ultimate Beneficial Owner owning 10% or more of the company{" "}
          <div className="form-switch form-check-primary">
            <Input
              readOnly={isAccepted}
              type="switch"
              name="icon-primary"
              onChange={() => {
                setAnyUBO(!anyUBO);
              }}
              checked={anyUBO}
            />
          </div>
        </CardText>
        {anyUBO &&
          uboFeild.map((i, index) => (
            <Row id="ubo-template" className="dynamic-form-template">
              <div className="content-header dynamic-form-header mb-3">
                <div className="card-form-title">
                  <span>{index + 1}:Ultimate Beneficial Owner</span>
                </div>
                <button
                  className="trash"
                  onClick={() => removeFeild(index, uboFeild, setUboFeild)}
                >
                  <Trash size={16} />
                </button>
              </div>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" htmlFor="first_name">
                  First Name
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={i.first_name}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" htmlFor="last_name">
                  Last Name
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={i.last_name}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" htmlFor="date_of_birth">
                  Date of Birth
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="date"
                  className="form-control"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={i.date_of_birth}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="street_address">
                  Street Address
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="street_address"
                  name="street_address"
                  value={i.street_address}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="house_number">
                  Office / House number
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="house_number"
                  name="house_number"
                  value={i.house_number}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="zip_code">
                  Postcode / zip code
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="zip_code"
                  name="zip_code"
                  value={i.zip_code}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="city">
                  City
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={i.city}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="select"
                  className="form-control"
                  id="country"
                  name="country"
                  value={i.country}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                >
                  <option>---select---</option>
                  {country}
                </Input>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="telephone_number">
                  Telephone Number
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="telephone_number"
                  name="telephone_number"
                  value={i.telephone_number}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="passport">
                  Passport ID/Number
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="passport"
                  name="passport"
                  value={i.passport}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="social_security_number">
                  Social Security Number
                </Label>
                <Input
                  readOnly={isAccepted}
                  type="text"
                  className="form-control"
                  id="social_security_number"
                  name="social_security_number"
                  value={i.social_security_number}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
              </Col>
            </Row>
          ))}
      </CardBody>
      <CardFooter className="d-flex justify-content-between mt-3">
        <Button
          color="secondry btn-outline-secondary"
          onClick={() => setpper("previous")}
        >
          Previous
        </Button>
        <Button color="primary" onClick={() => setpper("next")}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyOwner;
