const form = document.querySelector("#loan-form");

form.addEventListener("submit", calculateResults);

const error = document.querySelector(".error");
error.style.cssText = `
    display: none;
    height: 30px;
    font-size: 25px;
    color: red;
    text-align: center;
`

const output = document.querySelector("#output");
output.style.display = "none";

const loader = document.querySelector("#loader");
loader.style.cssText = `
    display: none;
    position: relative;
`

function calculateResults(e) {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    loader.style.display="inline";
    error.style.display="none";
    output.style.display="none";
    function result () {
      loader.style.display="none";
      output.style.display="inline";
      error.style.display="none";
    }
    setTimeout(result, 600);
  } else {
   error.style.display="inline";
   output.style.display="none";
  }
  e.preventDefault();
    
  }
  

