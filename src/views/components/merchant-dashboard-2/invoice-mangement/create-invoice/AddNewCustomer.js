import React, { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import { Button, Collapse, Form, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, X } from "react-feather";

// ** Country List JSOM
import country_list from "../../../../../country_code.json";

const AddNewCustomer = (props) => {
  const [addAddressed, setAddAddressed] = useState(false);
  const [addGst, setGst] = useState(false);

  const { control, handleSubmit, watch } = useForm();

  // ** Country Option;
  const option = country_list.map((country,index) => (
    <option
      key={index}
      value={country.name}
    >{`${country.code}-${country.name}`}</option>
  ));

  return (
    <Sidebar
      size="lg"
      open={props.open}
      title="Add New Customer"
      headerClassName="mb-1"
      contentClassName="p-0"
      toggleSidebar={props.toggleSidebar}
    >
      <Form>
        <div className="mb-2">
          <Label for="customer-name" className="form-label text-uppercase">
            party name
          </Label>
          {/* <Input id="customer-name" placeholder="John Doe" /> */}
          <Controller
            name="party_name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required.",
              },
            }}
            render={({ field, fieldState }) => (
              <Input {...field} invalid={fieldState.error && true} />
            )}
          />
        </div>
        <div className="mb-2">
          <Label for="customer-name" className="form-label text-uppercase">
            party Email
          </Label>
          <Controller
            name="party_email"
            control={control}
            render={({ feild, fieldState }) => (
              <Input
                {...feild}
                type="email"
                invalid={fieldState.error && true}
                placeholder="example@domain.com"
              />
            )}
          />
        </div>
        <div className="mb-2">
          <Button.Ripple
            outline
            color={!addAddressed ? "info" : "danger"}
            className="btn-sm"
            onClick={() => setAddAddressed(!addAddressed)}
          >
            {!addAddressed ? (
              <>
                <Plus size={14} />
                <span className="align-middle ms-25">
                  Add Address (Optional)
                </span>
              </>
            ) : (
              <>
                <X size={14} />
                <span className="align-middle ms-25">Remove Address</span>
              </>
            )}
          </Button.Ripple>
        </div>
        <div className="mb-2">
          <Collapse isOpen={addAddressed}>
            <div className="mb-2">
              <Label className="form-label text-uppercase">
                billing Address
              </Label>
              <Controller
                name="billing_address"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    invalid={fieldState.error && true}
                    type="textarea"
                    cols="2"
                    rows="2"
                    placeholder="1307 Lady Bug Drive New York"
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Controller
                name="shiping_address_same"
                control={control}
                render={({ field, fieldState }) => (
                  <Input {...field} type="checkbox" />
                )}
              />
              <Label className="form-label ">
                Shipping Address same as billing address
              </Label>
            </div>
            {!watch("shiping_address_same") && (
              <div className="mb-2">
                <Label className="form-label text-uppercase">
                  Shipping Address
                </Label>
                <Controller
                  name="shiping_address"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      invalid={fieldState.error && true}
                      type="textarea"
                      cols="2"
                      rows="2"
                      placeholder="1307 Lady Bug Drive New York"
                    />
                  )}
                />
              </div>
            )}
            <div className="mb-2">
              <Label className="form-label text-uppercase">
                Place of supply (Country)
              </Label>
              <Controller
                name="place_of_supply"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="select"
                    invalid={fieldState.error && true}
                  >
                    <option value="">--Please choose an option--</option>
                    {option}
                  </Input>
                )}
              />
            </div>
          </Collapse>
        </div>
        <div className="mb-2">
          <Button.Ripple
            outline
            color={!addGst ? "info" : "danger"}
            className="btn-sm"
            onClick={() => setGst(!addGst)}
          >
            {!addGst ? (
              <>
                <Plus size={14} />
                <span className="align-middle ms-25">Add GSTIN (Optional)</span>
              </>
            ) : (
              <>
                <X size={14} />
                <span className="align-middle ms-25">Remove GSTIN</span>
              </>
            )}
          </Button.Ripple>
        </div>
        <div className="mb-2">
          <Collapse isOpen={addGst}>
            <Label className="form-label text-uppercase">GSTIN</Label>
            <Controller
              name=""
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Collapse>
        </div>
        <div className="d-flex flex-wrap my-2">
          <Button
            className="me-1"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Add
          </Button>
          <Button color="secondary" onClick={() => setOpen(false)} outline>
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default AddNewCustomer;
