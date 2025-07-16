const BASE_URL = "https://exchange-rate-api1.p.rapidapi.com";
   const API_HEADERS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com',
    'X-RapidAPI-Key': 'ce664181f8msh431ddcbeb0c8721p1208b7jsne087c4367aee'
  }
};
 const countryList = {
      AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO",
      ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", BGN: "BG",
      BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS",
      BWP: "BW", BYN: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", CHF: "CH", CLP: "CL",
      CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CZK: "CZ", DKK: "DK",
      DOP: "DO", DZD: "DZ", EGP: "EG", ERN: "ER", ETB: "ET", EUR: "FR", FJD: "FJ",
      FKP: "FK", GBP: "GB", GEL: "GE", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN",
      GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU",
      IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM",
      JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KRW: "KR",
      KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR",
      LSL: "LS", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM",
      MNT: "MN", MOP: "MO", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY",
      MZN: "MZ", NAD: "NA", NGN: "NG", NIO: "NI", NOK: "NO", NPR: "NP", NZD: "NZ",
      OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL",
      PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA",
      SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SLL: "SL", SOS: "SO",
      SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ",
      TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ",
      UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VND: "VN", VUV: "VU",
      YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
    };
let dropdown = document.querySelectorAll("select");
let btn = document.querySelector("button");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let msg = document.querySelector(".msg p");

for (let select of dropdown) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }

    select.appendChild(newOption);
  }

  select.addEventListener("change", (e) => {
    changeflag(e.target);
  });
}

const convert = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}/convert?base=${from.value}&target=${to.value}&amount=${amtval}`;


    let response = await fetch(url,API_HEADERS);
    console.log(response);

    let data = await response.json();
    console.log( data);
     
    let exrate = data.convert_result.rate;
    let finalamt=amtval*exrate;
    msg.innerText = `${amtval} ${from.value} = ${finalamt} ${to.value}`;

  
}
const changeflag = (e) => {
  let currcode = e.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  convert();
});

window.addEventListener("load", () => {
  changeflag(from);
  changeflag(to);
  convert(); 
});