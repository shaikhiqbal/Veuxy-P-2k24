import React, { useEffect, useState } from "react";
const fs = require("fs");

// ** Reactstrap
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Table,
} from "reactstrap";

// ** Form Hook
import { Controller, useForm, useFieldArray } from "react-hook-form";

// ** Third Party Components
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Dynamic Slide
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

// ** Jwt
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Access Cotrol Class

class AccessControl {
  constructor(name) {
    this.name = name;
    this.add = false;
    this.edit = false;
    this.read = false;
    this.delete = false;
  }
}

const AddUserRoleModal = (props) => {
  // ** Select Aimate
  const animatedComponents = makeAnimated();

  // ** States
  const [loader, setLoader] = useState(false);
  const [userRolePermissionList, setUserRolePermissionList] = useState([]);

  // ** UseForm
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      role_name: "",
      access_control: "",
      access: [],
    },
  });

  // ** Form Feild Array
  const { fields, remove, append } = useFieldArray({
    control,
    name: "access",
  });

  // ** Temp MultiSelect Value
  const colorOptions = [
    {
      value: "merchant_setting",
      label: "Merchant Setting",
    },
    {
      value: "invoice_management",
      label: "Invoice Management",
    },
    {
      value: "inventory_management",
      label: "Inventory Management",
    },
    {
      value: "sales",
      label: "Sales",
    },
  ];

  // ** Handl Multi Select
  const handleMultiSelect = (value) => {
    const selectedAccessHash = new Map();
    value.forEach((element) => {
      selectedAccessHash.set(element.label, element.label);
    });

    const accessControllArray = getValues("access").filter((ele) => {
      if (selectedAccessHash.has(ele.name)) {
        selectedAccessHash.delete(ele.name);
        return ele;
      }
    });
    // const remainAccesee = Array.from(selectedAccessHash.Values())
    const remainAccesee = Array.from(selectedAccessHash.values()).map((ele) => {
      const access = new AccessControl(ele);
      return access;
    });
    setValue("access", [...accessControllArray, ...remainAccesee]);
  };

  const onSubmit = (data) => {
    setLoader(!loader);
    setTimeout(() => {
      setLoader(!loader);
      props.toggle();
      reset();
    }, 3000);
  };

  // ** Fetching user Role Data
  const fetchUserRoleDetails = () =>
    new Promise((resolve, rejected) => {
      useJwt
        // .roleSetting()
        .permissionsList()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejected(err);
        });
    });

  useEffect(() => {
    const requiredField = [
      "merchantsetting",
      "user",
      "user_groups",
      "user_user_permissions",
      "virtualterminal",
    ];

    fetchUserRoleDetails()
      .then((res) => {
        console.log(res);
        // const data = shortRequiredField(res.data);
      }) 
      .catch((err) => {});
  }, []);

  // ** Handle Modal
  return (
    <Modal isOpen={props.open} className={"modal-dialog-centered modal-lg"}>
      <ModalHeader toggle={props.toggle}></ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col sm="12" className="mb-1">
              <Label>
                Role Name <span className="text-danger">*</span>
              </Label>
              <Controller
                name="role_name"
                control={control}
                rules={{
                  required: "Field is required", // Add the required validation rule
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <Input {...field} invalid={fieldState?.error && true} />
                      {fieldState?.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  );
                }}
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label>
                Access Control <span className="text-danger">*</span>
              </Label>
              <Controller
                name="access_control"
                control={control}
                rules={{
                  required: "Field is required", // Add the required validation rule
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <Select
                        {...field}
                        isClearable={false}
                        theme={selectThemeColors}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: fieldState?.error ? "#DC3545" : "#ccc",
                          }),
                        }}
                        // defaultValue={[colorOptions[4], colorOptions[5]]}
                        onChange={(e) => {
                          handleMultiSelect(e);
                          field.onChange(e);
                        }}
                        isMulti
                        options={colorOptions}
                        className="react-select"
                        classNamePrefix="select"
                      />
                      {fieldState?.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  );
                }}
              />
            </Col>
            {fields.length > 0 && (
              <Col sm="12">
                <SlideDown>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Access</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Read</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields &&
                        fields.map((feild, index) => (
                          <tr key={index}>
                            <td>{feild.name}</td>
                            <td>
                              <Controller
                                control={control}
                                name={`access.${index}`}
                                render={({ field, fieldState }) => (
                                  <Input
                                    {...field}
                                    type="checkbox"
                                    className="cursor-pointer"
                                  />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                control={control}
                                name={`access.${index}`}
                                render={({ field, fieldState }) => (
                                  <Input
                                    {...field}
                                    type="checkbox"
                                    className="cursor-pointer"
                                  />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                control={control}
                                name={`access.${index}`}
                                render={({ field, fieldState }) => (
                                  <Input
                                    {...field}
                                    type="checkbox"
                                    className="cursor-pointer"
                                  />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                control={control}
                                name={`access.${index}`}
                                render={({ field, fieldState }) => (
                                  <Input
                                    {...field}
                                    type="checkbox"
                                    className="cursor-pointer"
                                  />
                                )}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </SlideDown>
              </Col>
            )}
          </Row>
        </ModalBody>
        <ModalFooter className="d-felx justify-content-center">
          <Button color="relief-success" type="submit">
            {loader ? (
              <>
                <Spinner color="white" size="sm" type="grow" />
                <span className="ms-50">Loading...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddUserRoleModal;
