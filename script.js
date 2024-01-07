// Location API
const ipdata = {
  key: "f3e0d3f99225435d589cc85afd8846d0b775c6ad7e0b8d1988484cdc",
  baseurl: "https://api.ipdata.co/",
  currency: function () {
    return `${this.baseurl}/currency?api-key=${this.key}`;
  },
};

// Exchange Rate API
const exchangeRates = {
  key: "f8824a1220e807ac23848e4d",
  baseURL: "https://v6.exchangerate-api.com/v6",
  convert: function () {
    return `${this.baseURL}/${this.key}/latest/USD`;
  },
};

// Get User Currency
const getUserCurrency = async () => {
  const response = await fetch(ipdata.currency());
  const userCountry = await response.json();
  return userCountry.currency;
};

// Get Exchange Rate
const convertTo = async (currency) => {
  const response = await fetch(exchangeRates.convert());
  const rate = await response.json();
  return rate.conversion_rates[currency];
};

async function currencyConvert(amount) {
  const userCurrency = await getUserCurrency();
  userCurrencyCode = userCurrency.code;
  userCurrencySymbol = userCurrency.native;
  const exchangeRate = await convertTo(userCurrencyCode);
  return `${userCurrencySymbol}` + Math.ceil(exchangeRate * amount);
}

currencyConvert(3);

// Select All Elements With Class "product-price"
const productPrices = document.querySelectorAll(".product-price");

// Loop Through Each Element And Update Its Value
productPrices.forEach(async (priceElement) => {
    // Get The Price Value
    const price = parseFloat(priceElement.innerText);

    // Convert The Price Value To Local Currency
    const localPrice = await currencyConvert(price);

    // Update The HTML Content With The Manipulated Price
    priceElement.innerText = localPrice;
});
