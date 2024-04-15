// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Input,
  Form,
  Button,
  Label,
  Row,
} from "reactstrap";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";

//** Country Code Data
import country_code from "../../../../country_code.json";
import ReactCountryFlag from "react-country-flag";

import useJwt from "@src/dashboard/jwt/useJwt";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

const defaultValue = {
  first_name: "",
  last_name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zip_code: "",
  contact_number: "",
  email_address: "",
  product: "",
  amount: "",
};

const formOptionLabel = ({ value, label, name, flag }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "10px" }}>
        {flag} {label} {value}
      </div>
    </div>
  );
};

const country = country_code.map((data, idx) => {
  return {
    value: data.dial_code,
    label: ` ${data.code}`,
    name: data.name,
    flag: <ReactCountryFlag countryCode={data.code} svg />,
  };
});

const VertualTerminalForm = (props) => {
  // ** Props
  const { onPassData } = props;

  // ** State
  const [defaultData, setDefaultData] = useState({ ...defaultValue });

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: defaultData });

  const onSubmit = (data) => {
    onPassData(data);
  };
  useEffect(() => {
    useJwt.merchantSetting().then((res) => console.log(res?.data));
  }, []);
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-1">
            <Label sm="3" for="first_name">
              First Name
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.first_name && true}
                    type="text"
                    id="first_name"
                  />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="last_name">
              Last Name
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.last_name && true}
                    type="text"
                    id="last_name"
                  />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="address">
              Address
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <Input {...field} type="text" id="address" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="city">
              City
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Input {...field} type="text" id="city" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="city">
              State/Province
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Input {...field} type="text" id="state" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="country">
              Country
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <Input {...field} type="select" id="country" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="zip_code">
              Zip/Post Code
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="zip_code"
                render={({ field }) => (
                  <Input {...field} type="text" id="zip_code" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="contact_number">
              Contact Number
            </Label>
            <Col sm="9">
              <Row>
                <Col xs="4" sm="3">
                  <Select
                    options={country}
                    defaultValue={country[0]}
                    formatOptionLabel={formOptionLabel}
                    onChange={(e) => setValue("country_code", e.value)}
                  />
                </Col>
                <Col xs="8" sm="9">
                  <Controller
                    control={control}
                    name="contact_number"
                    render={({ field }) => (
                      <Input {...field} type="number" id="contact_number" />
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="email_address">
              Email
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="email_address"
                render={({ field }) => (
                  <Input {...field} type="email" id="email_address" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="product">
              Product
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="product"
                render={({ field }) => (
                  <Input {...field} type="text" id="product" />
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3" for="city">
              Amount
            </Label>
            <Col sm="9">
              <Controller
                control={control}
                name="amount"
                render={({ field }) => (
                  <Input {...field} type="number" id="amount" />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex" md={{ size: 9, offset: 3 }}>
              <Button className="me-1" color="primary" type="submit">
                Submit
              </Button>
              <Button outline color="secondary" type="reset">
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default VertualTerminalForm;
