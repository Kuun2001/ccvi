// supported_code
const API_KEY = "361105cff5551106065022bf";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
async function getSupportedCodes() {
  try {
    const response = await fetch(`${BASE_URL}/codes`);
    if (response.ok) {
      const data = await response.json();
      const codes = data["supported_codes"];
      return codes;
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}
//
async function getConversionCodes(baseCode, targetCode) {
  try {
    const response = await fetch(`${BASE_URL}/pair/${baseCode}/${targetCode}`);
    if (response.ok) {
      const data = await response.json();
      const rate = data["converted_rate"];
      return rate;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
const baseUnit = document.querySelector("#base-unit");
const targetUnit = document.querySelector("#target-rate");

const inputBaseAmount = document.querySelector("#base-anmout");
const selectBaseCode = doc.querySelector("#base-code");
const inputTargetAmount = document.querySelector("#target-anmout");
const selectTargetCode = document.querySelector("#target-code");

const errorMsg = document.querySelector("#error-message");

let supportedCodes = [];
let conversionRate = 0;
const initialize = async () => {
  // get supported_code
  errorMsg.textContent = "Loading data ...";
  supportedCodes = await getSupportedCodes();
  if (!supportedCodes.length) {
    errorMsg.textContent = "No supported codes";
    return;
  }
  errorMsg.textContent = "";
  console.log(supportedCodes);
  // put option into selectbox
  supportedCodes.forEach((code) => {
    const baseOption = document.createElement("option");
    baseOption.value = code[0];
    baseOption.textContent = code[1];
    selectBaseCode.appendChild(baseOption);

    const targetOption = document.createElement("option");
    targetOption.value = code[0];
    targetOption.textContent = code[1];
    selectTargetCode.appendChild(targetOption);
  });
};
initialize();
