async function calculate() {
  const response = await fetch("/api/taxpayer/count");
  console.log(response);
  const count = await response.json();
  console.log("count = " + count);

  for (i = 0; i < count; i++) {
    let ga = document.getElementsByClassName("gross-annual")[i].id;
    let medi = document.getElementsByClassName("medicare-payment")[i].id;
    let tax = document.getElementsByClassName("tax-payment")[i].id;
    let na = document.getElementsByClassName("net-annual")[i].id;
    console.log(ga);
    console.log(medi);
    console.log(tax);
    console.log(na);

    const gaEl = document.getElementById(ga).innerHTML;
    const mediEl = document.getElementById(medi);
    const taxEl = document.getElementById(tax);
    const naEl = document.getElementById(na);

    mediEl.innerHTML = gaEl * 0.02;
    taxEl.innerHTML = taxOwed(gaEl);
    naEl.innerHTML =
      gaEl - mediEl.innerHTML - mediEl.innerHTML - taxEl.innerHTML;
  }
}

const bracket = (grossAnnual) => {
  if (grossAnnual >= 18201 && grossAnnual <= 45000) {
    tax = [
      {
        taxPercent: 0.19,
        taxLump: 0,
        threshold: 18200,
      },
    ];
  } else if (grossAnnual >= 45001 && grossAnnual <= 120000) {
    tax = [
      {
        taxPercent: 0.325,
        taxLump: 5092,
        threshold: 45000,
      },
    ];
  } else if (grossAnnual >= 120001 && grossAnnual <= 180000) {
    tax = [
      {
        taxPercent: 0.37,
        taxLump: 29467,
        threshold: 120000,
      },
    ];
  } else if (grossAnnual >= 180001) {
    tax = [
      {
        taxPercent: 0.45,
        taxLump: 51667,
        threshold: 180000,
      },
    ];
  } else {
    tax = [
      {
        taxPercent: 0,
        taxLump: 0,
        threshold: 0,
      },
    ];
  }
  // console.log("Tax Percent: %", tax[0].taxPercent * 100);
  return tax;
};

const taxOwed = (grossAnnual) => {
  const tax = bracket(grossAnnual);
  const taxOwed =
    (grossAnnual - tax[0].threshold) * tax[0].taxPercent + tax[0].taxLump;
  return taxOwed;
};

// window.onload(calculate());
