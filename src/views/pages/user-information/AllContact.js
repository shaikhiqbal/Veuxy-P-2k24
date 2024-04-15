import { Label, Button, Form, Input, FormGroup, Card } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import useJwt from "@src/dashboard/jwt/useJwt";

import { useEffect, useState } from "react";

const AllContact = ({ stepper, setCounter, counter }) => {
  const [defaultData, setDefaultData] = useState({});

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: defaultData });

  useEffect(() => {
    useJwt.getmerchantcontact().then((res) => {
      if (res.status === 200) {
        setDefaultData((defaultData) => ({ ...defaultData, mc: res.data }));
        reset({ mc: res.data });
      }
    });
  }, [reset]);

  const onSubmit = (data) => {
    data.mc[0].application_id = localStorage.getItem("application_id");
    data.mc[1].application_id = localStorage.getItem("application_id");
    data.mc[2].application_id = localStorage.getItem("application_id");
    data.mc[3].application_id = localStorage.getItem("application_id");
    if (!data.mc[0].uid) {
      useJwt
        .postmerchantcontact(data)
        .then((res) => {
          if (res.status === 201) {
            stepper.next();
            setCounter(counter + 1);
            stepper.next();
          }
        })
        .catch((err) => console.log(err.massage));
    } else {
      useJwt.putmerchantcontact(data.mc[0].uid, data).then((res) => {
        if (res.status === 200) {
          stepper.next();
          setCounter(counter + 1);
        }
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-none">
        <div className="text-center fw-bold ">
          <h1 className="text-primary">Merchant Contacts</h1>
        </div>
        <div className="row p-2 gx-3">
          <div id="General_contact" className="col-12   p-2">
            <h1> GENERAL CONTACT (PRIMARY)</h1>
            <div hidden>
              <Controller
                id="uid1"
                name="mc[0].uid"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].uid"
                      type="text"
                      invalid={errors.uid && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 me-1 ">
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[0].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].first_name"
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[0].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].last_name"
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[0].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].email_address"
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[0].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].telephone_number"
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="fax_number">
                Fax number
              </Label>
              <Controller
                id="fax_number"
                name="mc[0].fax_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].fax_number"
                      type="text"
                      invalid={errors.fax_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div id="Technical_contact" className="col-12   p-2">
            <h1> TECHNICAL CONTACT</h1>
            <div className="col-lg-12 me-1 ">
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[1].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[1].first_name"
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[1].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[1].last_name"
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[1].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[1].email_address"
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[1].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[1].telephone_number"
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div id="Financial_contact" className="col-12   p-2">
            <h1> FINANCIAL CONTACT</h1>
            <div className="col-lg-12 me-1 ">
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[2].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[2].first_name"
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[2].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[].last_name"
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[2].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[2].email_address"
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[2].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[2].telephone_number"
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div id="chargback_contact" className="col-12   p-2">
            <h1> CHARGEBACK CONTACT</h1>
            <div className="col-lg-12 me-1 ">
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[3].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].first_name"
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[3].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].last_name"
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[3].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].email_address"
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="col-lg-12 mt-1 ">
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[3].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].telephone_number"
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-2 mb-b  d-flex justify-content-end  "
        style={{ width: "90%", alignContent: "end" }}
      >
        <Button
          onClick={() => {
            stepper.previous();
          }}
          color="secondry btn-outline-secondary "
        >
          Previouse
        </Button>

        <Button type="submit" color="primary ms-2">
          Next
        </Button>
      </div>
    </Form>
  );
};
export default AllContact;
