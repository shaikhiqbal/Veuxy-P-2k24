import React, { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Table, Button, Input } from "reactstrap";


const CardMonthTable = (props) => {
  const { control, fields,name } = props;

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>MONTH</th>
            <th style={{ whiteSpace: "nowrap" }}>Number of transactions</th>
            <th style={{ whiteSpace: "nowrap" }}>Transaction volume</th>
            <th style={{ whiteSpace: "nowrap" }}>Number of chargebacks</th>
            <th style={{ whiteSpace: "nowrap" }}>Chargeback volume</th>
            <th style={{ whiteSpace: "nowrap" }}>Number of refunds</th>
            <th style={{ whiteSpace: "nowrap" }}>Refund volume</th>
          </tr>
        </thead>
        <tbody>
          {fields &&
            fields.map((ele, index) => (
              <tr key={index}>
                <td style={{ whiteSpace: "nowrap" }}></td>
                <td>
                  <Controller
                    control={control}
                    name={`${name}[${index}].number_of_transaction`}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          invalid={fieldState?.error !== undefined}
                        />
                        {fieldState?.error && (
                          <FormFeedback>
                            {fieldState?.error?.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    name={`${name}[${index}].transaction_volume`}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          invalid={fieldState?.error !== undefined}
                        />
                        {fieldState?.error && (
                          <FormFeedback>
                            {fieldState?.error?.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`${name}[${index}].number_of_chargeback`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          invalid={fieldState?.error !== undefined}
                        />
                        {fieldState?.error && (
                          <FormFeedback>
                            {fieldState?.error?.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`${name}[${index}].chargeback_volume`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          invalid={fieldState?.error !== undefined}
                        />
                        {fieldState?.error && (
                          <FormFeedback>
                            {fieldState?.error?.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`${name}[${index}].number_of_refunds`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          invalid={fieldState?.error !== undefined}
                        />
                        {fieldState?.error && (
                          <FormFeedback>
                            {fieldState?.error?.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`${name}[${index}].refund_volume`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          invalid={fieldState?.error !== undefined}
                        />
                        {fieldState?.error && (
                          <FormFeedback>
                            {fieldState?.error?.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CardMonthTable;
