import React, { useState, useEffect, Fragment } from "react";
import { Label, Button, Form, Input, FormGroup } from "reactstrap";
import country_code from "../../../country_code.json";
import { Controller, useForm } from "react-hook-form";
import * as Icon from "react-feather";
import useJwt from "@src/dashboard/jwt/useJwt";

import { ArrowLeft, ArrowRight } from "react-feather";
import { object } from "prop-types";

const CompanyOwnershipProfile = ({ stepper, counter, setCounter }) => {
  const [anyUBO, setAnyUBO] = useState(false);
  const [directorInputFeilds, setDirectorInputFeild] = useState([
    {
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
    },
  ]);

  const addDirectorFeild = () => {
    const values = [...directorInputFeilds];
    values.push({
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
    });
    setDirectorInputFeild(values);
  };

  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  const removeDirectorFeild = (index) => {
    const values = [...directorInputFeilds];
    values.splice(index, 1);
    setDirectorInputFeild(values);
  };

  const handleDirectorValues = (index, event) => {
    const values = [...directorInputFeilds];
    values[index][event.target.name] = event.target.value;
    setDirectorInputFeild(values);
  };
  /* Director All function end up*/

  /* UBO All function start from below */

  const [uboInputFeild, setUBOInputFeild] = useState([
    {
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
    },
  ]);

  const addUBOFeild = () => {
    const values = [...uboInputFeild];
    values.push({
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
    });
    setUBOInputFeild(values);
  };

  const removeUBOFeild = (index) => {
    const values = [...uboInputFeild];
    values.splice(index, 1);
    setUBOInputFeild(values);
  };

  const handleUBOValues = (index, event) => {
    const values = [...uboInputFeild];
    values[index][event.target.name] = event.target.value;
    setUBOInputFeild(values);
  };

  useEffect(() => {
    useJwt.cop_get_view().then((res) => {
      if (res?.status === 200 && res.data.length > 0) {
        setUBOInputFeild([]);
        setDirectorInputFeild([]);
        res?.data.map((data, i) => {
          if (data.uid) {
            setAnyUBO(true);
          }
          if (data.cop_type === 1) {
            setDirectorInputFeild((directorInputFeilds) => [
              ...directorInputFeilds,
              data,
            ]);
          } else {
            setUBOInputFeild((uboInputFeild) => [...uboInputFeild, data]);
          }
        });
      }
    });
  }, [counter]);

  //** post data
  const postData = (data) => {
    useJwt
      .postcompanyownershipprofile(data)
      .then((res) => {
        if (res.status === 201) {
          setCounter(counter + 1);
          stepper.next();
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
          console.log(err.response);
        }
      });
  };

  //** updata data
  const updateData = (uid, data) => {
    useJwt.putCompanyownershipprofile(uid, data).then((res) => {
      if (res.status === 200) {
        setCounter(counter + 1);
        stepper.next();
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let data;
    anyUBO
      ? (data = directorInputFeilds.concat(uboInputFeild))
      : (data = directorInputFeilds);
    let post = [];
    let put = [];
    data &&
      data.filter((ele) => {
        if (ele.date_of_birth.length == 0) {
          delete ele.date_of_birth;
        }

        if (!ele.uid) {
          post.push(ele);
        } else {
          put.push({
            ...ele,
            application_id: localStorage.getItem("application_id"),
          });
        }
      });
    let posted = false;
    let updated = false;
    if (post.length > 0) {
      posted = postData({ cop: post });
    }
    if (put.length > 0) {
      updated = updateData(put[0].uid, { cop: put });
    }
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div id="DirectorFeild" className="p-3 ">
          <div className="d-flex justify-content-center">
            <h1
              className="mb-1 d-flex justify-content-centar text-primary "
              style={{
                fontWeight: "bold",
              }}
            >
              Company Ownership Profile:
            </h1>
          </div>
          <div
            className="container-none m-2"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              padding: "1rem",
              backgroundColor: "transparent",
            }}
          >
            <div className="row  p-3  gy-1 gx-1">
              {directorInputFeilds &&
                directorInputFeilds.map((inputField, index) => (
                  <Fragment key={`${inputField}${index}`}>
                    <div className="border d-flex justify-content-between bg-primary ">
                      <h2 className="text-white p-1">Director#{index + 1}</h2>
                      <span className="align-self-center">
                        {" "}
                        <Button
                          disabled={index === 0}
                          onClick={() => removeDirectorFeild(index)}
                          color="primary"
                        >
                          <Icon.Trash color="white" />
                        </Button>
                      </span>
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" htmlFor="first_name">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={inputField.first_name}
                        onChange={(event) => handleDirectorValues(index, event)}
                        required
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" htmlFor="last_name">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={inputField.last_name}
                        onChange={(event) => handleDirectorValues(index, event)}
                        required
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" htmlFor="date_of_birth">
                        Date of Birth
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={inputField.date_of_birth}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="street_address">
                        Street Address
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="street_address"
                        name="street_address"
                        value={inputField.street_address}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="house_number">
                        Office / House number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="house_number"
                        name="house_number"
                        value={inputField.house_number}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="zip_code">
                        Postcode / zip code
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="zip_code"
                        name="zip_code"
                        value={inputField.zip_code}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="city">
                        City
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={inputField.city}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="country">
                        Country
                      </Label>
                      <Input
                        type="select"
                        className="form-control"
                        id="country"
                        name="country"
                        value={inputField.country}
                        onChange={(event) => handleDirectorValues(index, event)}
                      >
                        <option>---select---</option>
                        {country}
                      </Input>
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="telephone_number">
                        Telephone Number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="telephone_number"
                        name="telephone_number"
                        value={inputField.telephone_number}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label className="form-label" for="passport">
                        Passport ID/Number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="passport"
                        name="passport"
                        value={inputField.passport}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-sm-6">
                      <Label
                        className="form-label"
                        for="social_security_number"
                      >
                        Social Security Number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="social_security_number"
                        name="social_security_number"
                        value={inputField.social_security_number}
                        onChange={(event) => handleDirectorValues(index, event)}
                      />
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
          <div className="" style={{ display: "flex", justifyContent: "end" }}>
            <Button.Ripple
              className="btn-icon"
              outline
              color="primary"
              onClick={() => addDirectorFeild()}
            >
              Add more Director <Icon.Plus />
            </Button.Ripple>
          </div>
        </div>

        <div id="UBOFeild" className="mt-3 p-3">
          <div className="d-flex justify-content-center">
            <h1 className="mb-2 text-primary" style={{ fontWeight: "bold" }}>
              Ultimate Beneficial Owner(s) (UBO)
            </h1>
          </div>

          <div
            className="container-none m-3"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              padding: "1rem",
            }}
          >
            <div onChange={(e) => {}} className="m-4">
              <h3>
                Are there Ultimate Beneficial Owner owning 10% or more of the
                company
              </h3>
              <div className="form-switch form-check-primary">
                <Input
                  type="switch"
                  name="icon-primary"
                  onChange={() => {
                    setAnyUBO(!anyUBO);
                  }}
                  checked={anyUBO}
                />
              </div>
            </div>
            <div style={{ display: anyUBO ? "block" : "none" }}>
              <div className="row  p-3  gy-1 gx-1">
                {uboInputFeild &&
                  uboInputFeild.map((inputField, index) => (
                    <Fragment key={`${inputField}${index}`}>
                      <div className=" d-flex justify-content-between bg-primary ">
                        <h2 className="text-white p-1">UBO#{index + 1}</h2>
                        <span className="align-self-center">
                          {" "}
                          <Button
                            disabled={index === 0}
                            onClick={() => removeUBOFeild(index)}
                            color="primary"
                          >
                            <Icon.Trash color="white" />
                          </Button>
                        </span>
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="first_name">
                          First Name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          value={inputField.first_name}
                          onChange={(event) => handleUBOValues(index, event)}
                          required
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="last_name">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          value={inputField.last_name}
                          onChange={(event) => handleUBOValues(index, event)}
                          required
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="date_of_birth">
                          Date of Birth
                        </Label>
                        <Input
                          type="date"
                          defaultValue={2022 - 10 - 12}
                          className="form-control"
                          id="date_of_birth"
                          name="date_of_birth"
                          value={inputField.date_of_birth}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="ownership">
                          Ownership%
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="ownership"
                          name="ownership"
                          value={inputField.Ownership}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="street_address">
                          Street Address
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="street_address"
                          name="street_address"
                          value={inputField.street_address}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="house_number">
                          Office / House number
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="house_number"
                          name="house_number"
                          value={inputField.house_number}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="zip_code">
                          Postcode / zip code
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="zip_code"
                          name="zip_code"
                          value={inputField.zip_code}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="city">
                          City
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={inputField.city}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="country">
                          Country
                        </Label>
                        <Input
                          type="select"
                          className="form-control"
                          id="country"
                          name="country"
                          value={inputField.country}
                          onChange={(event) => handleUBOValues(index, event)}
                        >
                          <option>---select---</option>
                          {country}
                        </Input>
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="telephone_number">
                          Telephone Number
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="telephone_number"
                          name="telephone_number"
                          value={inputField.telephone_number}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" for="passport">
                          Passport ID/Number
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="passport"
                          name="passport"
                          value={inputField.passport}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label
                          className="form-label"
                          for="social_security_number"
                        >
                          Social Security Number
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="social_security_number"
                          name="social_security_number"
                          value={inputField.social_security_number}
                          onChange={(event) => handleUBOValues(index, event)}
                        />
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button.Ripple
              style={{ display: anyUBO ? "block" : "none" }}
              className="btn-icon"
              outline
              color="primary"
              onClick={() => addUBOFeild()}
            >
              Add more UBO <Icon.Plus />
            </Button.Ripple>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev"
            onClick={() => {
              stepper.previous();
              setCounter(counter + 1);
            }}
            outline
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default CompanyOwnershipProfile;
