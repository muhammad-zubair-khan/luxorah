
// Set the base currency (AED)
// fx.base = "AED";

// Set the exchange rates for different currencies
// fx.rates = {
//   AED: 1, // Base currency
//   USD: 0.27, // US Dollar exchange rate to AED
//   GBP: 0.21, // British Pound exchange rate to AED
//   PKR: 77.97, // Pakistani Rupee exchange rate to AED
//   OMR: 0.10, // Omani Rial exchange rate to AED
//   EUR: 0.25, // Euro exchange rate to AED
//   INR: 22.33, // INR exchange rate to AED
//   // Add more exchange rates for other currencies as needed
// };
const fx = require("money");
const axios = require("axios");

// Function to fetch and update exchange rates
async function updateExchangeRates() {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/86eb575c79e2b9d08684bf02/latest/AED`
    );
    const rates = response?.data?.conversion_rates;

    // Set the exchange rates in the fx.rates object
    fx.rates = {
      AED: 1,
      USD: rates.USD,
      GBP: rates.GBP,
      PKR: rates.PKR,
      OMR: rates.OMR,
      EUR: rates.EUR,
      INR: rates.INR,
      // Add more exchange rates for other currencies as needed
    };

    // Set the base currency
    fx.base = "AED";
  } catch (error) {
    console.error("Failed to update exchange rates:", error);
  }
}

// Call the function to update the exchange rates
updateExchangeRates();

// Function to convert price from the base currency to the desired currency
exports.convertPrice = (price, currency) => {
  return fx(price).from(fx.base).to(currency).toFixed(2);
};


exports.getCurrencyByRegion = (region) => {
  switch (region) {
    case "aed":
      return "AED";
    case "usd":
      return "USD";
    case "pound":
      return "GBP";
    case "pkr":
      return "PKR";
    case "omr":
      return "OMR";
    case "euro":
      return "EUR";
    case "inr":
      return "INR";
    // Add more cases for other regions as needed
    default:
      return "AED";
  }
};

// exports.getCurrencyByRegion = (region) => {
//   switch (region) {
//     case "uae":
//       return "AED";
//     case "us":
//       return "USD";
//     case "uk":
//       return "GBP";
//     case "pakistan":
//       return "PKR";
//     case "oman":
//       return "OMR";
//     case "euro":
//       return "EUR";
//     case "indian":
//       return "INR";
//     // Add more cases for other regions as needed
//     default:
//       return "AED";
//   }
// };
