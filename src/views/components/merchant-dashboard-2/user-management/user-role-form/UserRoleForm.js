import React, { useEffect, useState } from "react";

// ** default Data for List
import formList from "./formList";

// ** CSS Library
import { Row, Col, Table, Label, Input } from "reactstrap";

// ** Handle Form
import { Controller, useForm, useFieldArray } from "react-hook-form";

// ** CRUD
import useJwt from "@src/dashboard/jwt/useJwt";

const UserRoleForm = () => {
  // ** React Form Hook
  const { control, handleSubmit } = useForm({
    defaultValues: { role: [...formList] },
  });

  // ** use form hook array
  const { fields } = useFieldArray({
    control,
    name: "role",
  });

  // ** State
  const [formFieldList, setFormFieldList] = useState([...formList]);

  // ** Get Role Setting Data;

  const fetchRoleSetting = () =>
    new Promise((resolve, rejected) => {
      useJwt
        .permissionsList()
        .then((res) => resolve(res))
        .catch((err) => rejected(err));
    });

  useEffect(() => {
    fetchRoleSetting()
      .then((res) => console.log(`Fetch ${res}`))
      .catch((err) => console.log(`Error  ${res}`));
  }, []);
  return (
    <Row>
      <Col sm="12" md="12" lg="12">
        <Label>Role Name</Label>
        <Controller
          control={control}
          name=""
          render={({ field }) => <Input {...field} type="text" />}
        />
      </Col>
      <Col sm="12" md="12" lg="12">
        <Table striped responsive>
          <thead>
            <tr>
              <th>MENU NAME</th>
              <th>SELECT ALL</th>
              <th>ADD</th>
              <th>EDIT</th>
              <th>VIEW</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td>{field.menuName}</td>
                <td>
                  <Controller
                    control={control}
                    name={`role.${[index]}.select_all`}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          className="cursor-pointer"
                          type="checkbox"
                          onInvalid={fieldState?.error && true}
                        />
                        <small>
                          {fieldState?.error && fieldState?.error?.message}
                        </small>
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    name={`role.${[index]}.add`}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          className="cursor-pointer"
                          type="checkbox"
                          onInvalid={fieldState?.error && true}
                        />
                        <small>
                          {fieldState?.error && fieldState?.error?.message}
                        </small>
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    name={`role.${[index]}.edit`}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          className="cursor-pointer"
                          type="checkbox"
                          onInvalid={fieldState?.error && true}
                        />
                        <small>
                          {fieldState?.error && fieldState?.error?.message}
                        </small>
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    name={`role.${[index]}.view`}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          className="cursor-pointer"
                          type="checkbox"
                          onInvalid={fieldState?.error && true}
                        />
                        <small>
                          {fieldState?.error && fieldState?.error?.message}
                        </small>
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    name={`role.${[index]}.delete`}
                    render={({ field, fieldState }) => (
                      <>
                        <input
                          {...field}
                          className="cursor-pointer"
                          type="checkbox"
                          onInvalid={fieldState?.error && true}
                        />
                        <small>
                          {fieldState?.error && fieldState?.error?.message}
                        </small>
                      </>
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserRoleForm;
