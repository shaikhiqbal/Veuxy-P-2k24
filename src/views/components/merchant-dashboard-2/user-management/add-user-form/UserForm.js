// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  FormFeedback,
} from "reactstrap";

// ** Form Library
import { useForm, Controller } from "react-hook-form";

// ** React Select
import Select from "react-select";

// ** Css For Select
import { selectThemeColors } from "@utils";

//** Jwt  */
import useJwt from "@src/dashboard/jwt/useJwt";

import ReactCountryFlag from "react-country-flag";
import country_code from "../../../../../country_code.json";
import { SkipBack } from "react-feather";
import { useNavigate } from "react-router-dom";

const defaultData = {
  email: "",
  mobile: "",
  first_name: "",
  last_name: "",
  sub_user_type: "",
};

const roleOptions = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
];
const UserForm = () => {
  // ** React-Form-Hook
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({ defaultValues: defaultData });

  const navigate = useNavigate();

  // ** States

  // ** Country Funtion
  const country = country_code.map((data, idx) => {
    return {
      value: data.dial_code,
      label: ` ${data.code}`,
      name: data.name,
      flag: <ReactCountryFlag countryCode={data.code} svg />,
    };
  });

  const formOptionLabel = ({ value, label, name, flag }) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "10px" }}>
          {flag} {label} {value}
        </div>
      </div>
    );
  };
  /*
// ** Merchant User Create **
  createNewMerchantUser(...args) {
    return axios.post(this.jwtConfig.create_merchant_user, ...args);
  }

  // ** Merchant User Update **
  updateMerchantUser(uid, ...args) {
    return axios.put(this.jwtConfig.create_merchant_user + uid, ...args);
  }

  //** Merchant User Get Details **
  getMerchnatUserDetails(uid) {
    return axios.get(this.jwtConfig.create_merchant_user + uid);
  }
*/
  const createUser = (data) =>
    new Promise((resolve, reject) => {
      useJwt
        .createNewMerchantUser(data)
        .then((res) => {
          resolve("Created Successfully");
        })
        .catch((err) => {
          reject("Something went wrong");
        });
    });

  const updateUser = (uid, data) =>
    new Promise((resolve, reject) => {
      useJwt
        .updateMerchantUser(uid, data)
        .then((res) => {
          resolve("Updated Successfully");
        })
        .catch((err) => {
          reject("Oops! Something went wrong");
        });
    });

  // ** Rearange Data;
  const rearangeData = (data) => {
    const { country_code, sub_user_type } = data;
    data["mobile"] = `${country_code}${data["mobile"]}`;
    data["sub_user_type"] = `${sub_user_type.value}`;
    return data;
  };

  const onSubmit = (data) => {
    const updatedData = rearangeData({ ...data });
    console.log(updatedData);
  };

  return (
    <Card>
      <CardHeader className="border-bottom mb-2 d-flex">
        <h3>Enter User details and Role's</h3>

        <SkipBack size={14} onClick={() => navigate(-1)} />
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-1">
            <Label sm="3">First Name</Label>
            <Col sm="9">
              <Controller
                control={control}
                name="first_name"
                rules={{
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "First name should not contain numbers or symbols",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      invalid={fieldState?.error && true}
                      type="text"
                      id="nameIcons"
                      placeholder="First Name"
                    />

                    <small className="text-danger">
                      {fieldState?.error && fieldState?.error?.message}
                    </small>
                  </>
                )}
              />
            </Col>
          </Row>
          <Row className="mb-1">
            <Label sm="3">Last Name</Label>
            <Col sm="9">
              <Controller
                control={control}
                name="last_name"
                rules={{
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Last name should not contain numbers or symbols",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      invalid={fieldState?.error && true}
                      type="text"
                      id="nameIcons"
                      placeholder="Last Name"
                    />

                    <small className="text-danger">
                      {fieldState?.error && fieldState?.error?.message}
                    </small>
                  </>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3">Email</Label>
            <Col sm="9">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      invalid={fieldState?.error && true}
                      type="email"
                      id="EmailIcons"
                      placeholder="Email"
                    />

                    <FormFeedback>
                      {fieldState?.error && fieldState?.error?.message}
                    </FormFeedback>
                  </>
                )}
              />
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3">Mobile</Label>
            <Col sm="9">
              <Row>
                <Col sm="3">
                  <Select
                    options={country}
                    theme={selectThemeColors}
                    defaultValue={country[0]}
                    className="react-select"
                    classNamePrefix="select"
                    formatOptionLabel={formOptionLabel}
                    onChange={(e) => setValue("country_code", e.value)}
                  />
                </Col>

                <Col sm="9">
                  <Controller
                    id="mobile"
                    name="mobile"
                    control={control}
                    rules={{
                      required: "Mobile no is required",
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="88xxxxxxxx"
                        invalid={errors.mobile && true}
                        {...field}
                        onWheel={(event) => event.preventDefault()}
                      />
                    )}
                  />
                  <p id="mobile_id" />
                  {errors.mobile ? (
                    <FormFeedback>{errors.mobile.message}</FormFeedback>
                  ) : null}
                </Col>
              </Row>
              {/* <Controller
                control={control}
                name="mobile"
                render={({ field, fieldState }) => (
                  <>
                      <Input
                        {...field}
                        invalid={fieldState?.error && true}
                        type="number"
                        id="mobileIcons"
                        placeholder="Mobile"
                      />

                    <FormFeedback>
                      {fieldState?.error && fieldState?.error?.message}
                    </FormFeedback>
                  </>
                )}
              /> */}
            </Col>
          </Row>

          <Row className="mb-1">
            <Label sm="3">User Role</Label>
            <Col sm="9">
              <Controller
                control={control}
                name="sub_user_type"
                rules={{
                  required: "Select User Role",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: fieldState?.error ? "red" : "#ccc",
                        }),
                      }}
                      // defaultValue={colourOptions[0]}
                      options={roleOptions}
                      // isClearable={false}
                    />
                    <small className="text-danger">
                      {fieldState?.error && fieldState?.error?.message}
                    </small>
                  </>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col className="d-flex" md={{ size: 9, offset: 3 }}>
              <Button className="me-1" color="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UserForm;

/*

{
    "first_name": "Renuka",
    "last_name": "Kshirsagar",
    "email": "renukshirsagar9426@gmail.com",
    "mobile": "+919970126979",
    "user_type": 5,
    "sub_user_type": 2
}

*/
