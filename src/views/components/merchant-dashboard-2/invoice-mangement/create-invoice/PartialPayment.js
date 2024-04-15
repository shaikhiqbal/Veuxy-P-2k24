import React, { useState } from "react";
import { Check, Watch, X } from "react-feather";
import { Label, Input, Collapse, Row, Col } from "reactstrap";

import Flatpickr from "react-flatpickr";
import { Controller } from "react-hook-form";

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

export const PartialPaymentDefault = (props) => {
  // ** State
  const [recuringInvioce, setRecuringInvoice] = useState(false);

  // ** Switch Handle

  // ** Recuring Type
  const recurringTypes = [
    { value: "", label: "-- Select Recurring Type --" },
    { value: "weekly", label: "Weekly" },
    { value: "fortnight", label: "Fortnight" },
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
    { value: "quarterly", label: "Quarterly" },
    { value: "halfyearly", label: "Half Yearly" },
  ];

  const recurringTypesOption = recurringTypes.map((ele,index) => (
    <option key={index} value={ele.value}>{ele.label}</option>
  ));

  // ** Recuring Days
  const recurringDays = [
    { value: "", label: "-- Select Recurring Day --" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const recurningField = (value) => {
    if (!value || !value.length) null;

    const week = ["weekly", "fortnight"];
    return week.includes(value) ? (
      <Controller
        control={props.control}
        name={value}
        render={({ field, fieldState }) => (
          <Input {...field} type="select" invalid={fieldState?.error && true}>
            {recurringDays.map((ele) => (
              <option value={ele.value} >{ele.label}</option>
            ))}
          </Input>
        )}
      />
    ) : (
      <Flatpickr
        defaultValue={new Date().toISOString()}
        // value={picker}
        // onChange={(date) => setPicker(date)}
        className="form-control invoice-edit-input date-picker"
      />
    );
  };

  return (
    <div className="d-flex flex-column" style={{ gap: "10px" }}>
      <div className="d-flex justify-content-between align-items-baseline">
        <h5>Cash Received</h5>
        <div>
          <Input />
        </div>
      </div>
      <div className="d-flex align-items-baseline">
        <Label>Recurring Invoice </Label>
        <div className="form-switch form-check-primary">
          <Input
            type="switch"
            id="recuring-type"
            value={recuringInvioce}
            onChange={(e) => setRecuringInvoice(e.target.checked)}
          />
          <CustomLabel htmlFor="recuring-type" />
        </div>
      </div>
      <Collapse isOpen={recuringInvioce}>
        <Row>
          <Col sm="4">
            <Controller
              control={props.control}
              name="recuring_type"
              render={({ field, fieldState }) => (
                <Input {...field} type="select">
                  {recurringTypesOption}
                </Input>
              )}
            />
          </Col>
          <Col sm="4">{recurningField(props.watch("recuring_type"))}</Col>
        </Row>
      </Collapse>
    </div>
  );
};

export const PartialPayment = (props) => {
  // ** States
  const [paymentAutoReminder, setPaymentAutoReminder] = useState(false);

  const paymentModes = [
    { value: "", label: "-- Select Payment Mode --" },
    { value: "1", label: "Virtual Terminal" },
    { value: "2", label: "Card Swipe" },
    { value: "3", label: "LT Wallet" },
    { value: "4", label: "Cash" },
    { value: "5", label: "Cheque" },
    { value: "6", label: "Money Order" },
    { value: "7", label: "Cashier Check" },
  ];

  const reminderTypes = [
    { value: "", label: "-- Select Reminder Type --" },
    { value: "one_time", label: "One Time" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "halfyearly", label: "Half Yearly" },
    { value: "annually", label: "Annually" },
  ];

  const recurringDays = [
    { value: "", label: "-- Select Reminder Day --" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <h5>Advanced Payment Amount:</h5>
        <div>
          <Controller
            control={props.control}
            name="advanced_payment_amount"
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="number"
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mb-1">
        <h5>Minimum Payment</h5>
        <div>
          <Controller
            control={props.control}
            name="min_payment"
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="number"
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mb-1">
        <h5>Payment Mode</h5>
        <div>
          <Controller
            control={props.control}
            name="payment_mode"
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="select"
                  invalid={fieldState?.error && true}
                >
                  {paymentModes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </Input>
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div>
        <div className="d-flex align-items-baseline">
          <Label>Partial Payment Auto Reminder </Label>
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              id="recuring-type"
              value={paymentAutoReminder}
              onChange={(e) => setPaymentAutoReminder(e.target.checked)}
            />
            <CustomLabel htmlFor="recuring-type" />
          </div>
        </div>

        <Collapse isOpen={paymentAutoReminder}>
          <Row>
            <Col sm="4">
              <Controller
                control={props.control}
                name="quarinten"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="select"
                      invalid={fieldState?.error && true}
                    >
                      {reminderTypes.map((type,index) => (
                        <option key={index} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Input>
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="4">
              <Controller
                control={props.control}
                name=""
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="select"
                      invalid={fieldState?.error && true}
                    >
                      {recurringDays.map((ele,index) => (
                        <option key={index} value={ele.value}>{ele.label}</option>
                      ))}
                    </Input>
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
          </Row>
        </Collapse>
      </div>
    </div>
  );
};
