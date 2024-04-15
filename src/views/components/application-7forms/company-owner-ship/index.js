import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { Trash } from "react-feather";

const defaultValue = {
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
};

const label = {
  first_name: "First Name",
  last_name: "Last Name",
  date_of_birth: "Date Of Birth",
  house_number: "House Number",
  street_address: "Street Address",
  zip_code: "Zip Code",
  city: "City",
  country: "Country",
  telephone_number: "Telephone Number",
  passport: "Passport",
  social_security_number: "Social Security Number",
};

const CompanyOwner = () => {
  const [defaultData, setDefaultData] = useState({
    owners: [{ ...defaultValue }],
  });

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues: defaultData });

  const addMoreForm = () => {
    const values = [...defaultData.owners];
    values.push(defaultValue);
    setDefaultData({ owners: [...values] });
  };

  const deleteForm=(index) =>{
    const values = [...defaultData.owners].filter((data, i) => i !== index);
    setDefaultData({ owners: [...values] });
  }

  const sendData = handleSubmit((data) => {
    console.log(data);
  });

  const FormInputs = ({ data, id }) => (
    <>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["first_name"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].first_name`}
          defaultValue={data.first_name}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.first_name && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["last_name"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].last_name`}
          defaultValue={data.last_name}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.last_name && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["date_of_birth"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].date_of_birth`}
          defaultValue={data.date_of_birth}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.date_of_birth && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["house_number"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].house_number`}
          defaultValue={data.house_number}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.house_number && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["street_address"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].street_address`}
          defaultValue={data.street_address}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.street_address && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["zip_code"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].zip_code`}
          defaultValue={data.zip_code}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.zip_code && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["city"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].city`}
          defaultValue={data.city}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.city && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["country"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].country`}
          defaultValue={data.country}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.country && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["telephone_number"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].telephone_number`}
          defaultValue={data.telephone_number}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.telephone_number && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["passport"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].passport`}
          defaultValue={data.passport}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.passport && true}
            />
          )}
        />
      </Col>
      <Col sm="12" md="6" className="mb-1">
        <Label>{label["social_security_number"]}</Label>
        <Controller
          control={control}
          name={`owners[${id}].social_security_number`}
          defaultValue={data.social_security_number}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              invalid={errors?.owners?.[id]?.social_security_number && true}
            />
          )}
        />
      </Col>
    </>
  );

  return (
    <Row>
      <Col sm="12" className="border-bottom">
        {defaultData &&
          defaultData?.owners?.map((data, id) => (
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <CardText tag={"h4"}></CardText>
                <Button.Ripple
                  className="btn-icon"
                  outline
                  color="danger"
                  onClick={() => deleteForm(id)}
                >
                  <Trash size={16} />
                </Button.Ripple>
              </CardHeader>
              <CardBody>
                <Row className=" my-1">
                  <FormInputs data={data} id={id} />
                </Row>
              </CardBody>
            </Card>
          ))}
      </Col>
      <Col sm="12" className="d-flex justify-content-end">
        <Button className="btn-success" onClick={addMoreForm}>
          Add More
        </Button>
      </Col>
    </Row>
  );
};

export default CompanyOwner;
