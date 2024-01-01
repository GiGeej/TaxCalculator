const income = document.querySelector(".income-input");
const results = document.querySelector(".results-input");
const calculate = document.querySelector("#calculate");
const reset = document.querySelector("#reset");
const form = document.querySelector("form");

//Reset page
reset.addEventListener("click", () => {
  setTimeout(() => {
    document.location.reload();
  });
});

//Calculate button
calculate.addEventListener("click", (e) => {
  e.preventDefault;

  if (income.value <= 53359) {
    results.value = income.value * 0.15;
  } else if (income.value > 53359 && income.value < 106717) {
    results.value = income.value * 0.2;
  } else if (income.value > 106717 && income.value < 165430) {
    results.value = income.value * 0.26;
  } else if (income.value > 165430 && income.value < 235675) {
    results.value = income.value * 0.29;
  } else if (income.value >= 235675) {
    results.value = income.value * 0.33;
  }
  numRounded();
});

//Round results

const numRounded = () => {
  (Math.round(results.value * 100) / 100).toFixed(2);
};
//Tax function