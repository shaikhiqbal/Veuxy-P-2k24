const temp = {
  acquiring_bank: "Authorized.net",
  acquiring_bank_field: {
    name: "Authorized.net",
    fields: {
      bank_merchant_name: "ICICI",
      login_id: "user@33",
      transaction_key: "ALE3IO3",
    },
  },
  application_id: "5062ac9e-6deb-49ad-9296-0b1bcda9bd7c",
  batch_upload: "89",
  block_type: "2",
  chargeback_charge_0_2: "78",
  chargeback_charge_2_5: "78",
  chargeback_charge_5_10: "7",
  chargeback_percent: "2",
  currency: ["CAD"],
  declined_percent: "10",
  fraud_scrub_fees: "89",
  maximum_ticket_size: "19",
  merchant_category_code: "1799",
  merchant_type: "Ecommerce",
  minimum_ticket_size: "14",
  monthly_fees: "898",
  payment_services: ["SEPA", "Invoicing", "Card Type"],
  payment_services_field: [
    {
      name: "SEPA",
      fields: {
        sepa_merchant_discount_rate: "12",
        sepa_transaction_fees: "32",
      },
    },
    {
      name: "Invoicing",
      fields: {
        invoicing_merchant_discount_rate: "43",
        invoicing_transaction_fees: "23",
      },
    },
    {
      name: "Card Type",
      fields: [
        {
          active_card: "Visa",
          fields: {
            discount_rate: "32",
            transaction_fees: "31",
          },
        },
        {
          active_card: "Amex",
          fields: {
            discount_rate: "32",
            transaction_fees: "21",
          },
        },
        {
          active_card: "Rupay",
          fields: {
            discount_rate: "33",
            transaction_fees: "23",
          },
        },
        {
          active_card: "Union",
          fields: {
            discount_rate: "23",
            transaction_fees: "13",
          },
        },
      ],
    },
  ],
  refund_charge: "887",
  refund_percent: "10",
  reject_percent: "10",
  reserve_rate: "9",
  return_charges: "87",
  settlement: "72 hours",
  setup_charges: "1",
  transaction_fees: "989",
  verification_fees: "87",
  virtual_terminal: "active",
  wire_domestic_fees: "787",
  wire_international: "878",
};

function bankSettingData(data) {
  if (!Object.keys(data)?.length) return;

  const staticField = {
    acquiring_bank: "Authorized.net",
    maximum_ticket_size: "15",
    merchant_category_code: "1731",
    merchant_type: "Telephone Order",
    minimum_ticket_size: "12",
    settlement: "48 hours",
  };

  const lable = (data) => data.map((value) => ({ value: value, label: value }));

  let copyData = { ...data };

  const fieldAcquiring_bank = JSON.parse(copyData.acquiring_bank_field);
  const { fields } = fieldAcquiring_bank;
  for (const key in staticField) {
    staticField[key] = data[key];
  }
  staticField.currency = lable(JSON.parse(copyData.currency));
  staticField.payment_services = lable(JSON.parse(copyData.payment_services));
  // console.log(staticField)
  return { ...staticField, ...fields, uid: data?.uid };
}

function merchantServicesData(data) {
  if (!Object.keys(data)?.length) return;
  const staticField = {
    block_type: "",
    chargeback_percent: "",
    declined_percent: "",
    refund_percent: "",
    reject_percent: "",
    virtual_terminal: "",
  };

  const { payment_services_field } = { ...data };

  const card_type = [];
  let card_details = [];

  const cardTypeData = (data) => {
    data = JSON.parse(data);
    card_details = [...data];
    const cardType = data.map((ele) => ele.active_card);
    card_type.push(...cardType);
  };

  for (const key in staticField) {
    staticField[key] = data[key];
  }

  const fields = JSON.parse(payment_services_field).reduce((acc, element) => {
    const { fields } = element;
    if (element.name === "Card Type") {
      cardTypeData(fields);
    } else {
      acc = { ...acc, ...fields };
    }
    return acc;
  }, {});

  return { ...staticField, ...fields, card_type, card_details };
}

const defaultValue = {
  cash_discount: false,
  gateway_fees: "",
  load_balancing: false,
  split_rates: 0,
};
function rates(data) {
  const staticData = {
    batch_upload: "",
    chargeback_charge_0_2: "",
    chargeback_charge_2_5: "",
    chargeback_charge_5_10: "",
    fraud_scrub_fees: "",
    monthly_fees: "",
    refund_charge: "",
    reserve_rate: "",
    return_charges: "",
    setup_charge: "",
    transaction_fees: "",
    verification_fees: "",
    wire_domestic_fees: "",
    wire_international: "",
    uid: "",
  };
  for (const key in staticData) {
    staticData[key] = data[key];
  }
  return staticData;
}

function gateWayData(data) {
  const staticData = {
    cash_discount: false,
    gateway_monthly_fees: "",
    gateway_fees: "",
    load_balancing: false,
    split_rates: 0,
    value: "",
  };
  for (const key in staticData) {
    if (data[key]) staticData[key] = data[key];
    else delete staticData[key];
  }
  return staticData;
}

const extractDate = (data = {}, setGotData) => {
  const { getBuyRate, getSaleRate } = data;

  if (!(getBuyRate && getBuyRate[0] && getSaleRate && getSaleRate[0]))
    return {};

  const bankSetting = bankSettingData(getBuyRate[0]);
  const merchantServices = merchantServicesData(getBuyRate[0]);
  const buyRates = rates(getBuyRate[0]);
  const saleRates = rates(getSaleRate[0]);
  const gateWay = gateWayData(getSaleRate[0]);

  setGotData({
    bankSetting,
    merchantServices,
    gateWay,
    rates: { buyRates, saleRates },
  });

  return null;
};

export default extractDate;
