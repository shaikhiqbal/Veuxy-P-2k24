// ** country JSON
import country_code from "../../../../country_code.json";

const paidCurrencyList = [
  "Pounds SterLing",
  "US Dollar",
  "Australian Dollar",
  "Canadian Dollar",
  "Danish Krone",
  "Euro",
  "Hong Kong Dollar",
  "Japenese Yen",
  "New Zealand Dollar",
  "Norwegian Krone",
  "Singapore Dollar",
  "South African Rand",
  "Swedish Krona",
];
const currencyList = paidCurrencyList.map((e, i) => {
  return <option key={i}>{e}</option>;
});

// ** Country
const countryList = country_code.map((e, i) => {
  return <option key={i}>{e.name}</option>;
});

export { currencyList, countryList };
