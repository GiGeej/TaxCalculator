const createCasualFormHandler = async (event) => {
  window.open(URL, "google.com");
  event.preventDefault();

  const first_name = document.getElementById("C_first_name").value.trim();
  const last_name = document.getElementById("C_last_name").value.trim();
  const date_of_birth = document.getElementById("C_dob").value.trim();
  const is_casual = true;
  const has_hecs = document.getElementById("C_has_hecs").value;
  const hoursWorked = document.getElementById("hoursWorked").value.trim();
  const hourlyWage = document.getElementById("hourlyRate").value.trim();
  const grossAnnualPay = hoursWorked * hourlyWage * 1.25 * 52;
  const medicare = grossAnnualPay * 0.02;

  const getId = await fetch("/api/user/currentId");
  if (getId.ok) {
    const get_user_id = await getId.json();
    if (first_name && last_name && date_of_birth && medicare && get_user_id) {
      try {
        const response = await fetch("/api/taxpayer/newUser", {
          method: "POST",
          body: JSON.stringify({
            first_name,
            last_name,
            date_of_birth,
            medicare,
            user_id: get_user_id,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          location.reload;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log(document.querySelector(".casualForm"));
  console.log("hello world");

  document
    .querySelector(".casualForm")
  .addEventListener("submit", createCasualFormHandler);
  // document
  //   .getElementById("newCasualSubmit")
  //   .addEventListener("click", createCasualFormHandler);
};
//   let calculateHecs = (grossAnnualPay) =>{
//     if(wage >= 51550 && wage <= 59518){
//         return grossAnnualPay * 0.01;
//     } else if(wage >= 59519 && wage <= 63089){
//         return grossAnnualPay * 0.02;
//     } else if(wage >= 63090 && wage <= 66875){
//         return grossAnnualPay * 0.025;
//     } else if(wage >= 66876 && wage <= 70888){
//         return grossAnnualPay * 0.03;
//     } else if(wage >= 70889 && wage <= 75140){
//         return grossAnnualPay * 0.035;
//     } else if(wage >= 75141 && wage <= 79649){
//         return grossAnnualPay * 0.04;
//     } else if(wage >= 79650 && wage <= 84249){
//         return grossAnnualPay * 0.045;
//     } else if(wage >= 84430 && wage <= 89494){
//         return grossAnnualPay * 0.05;
//     } else if(wage >= 89495 && wage <= 94865){
//         return grossAnnualPay * 0.055;
//     } else if(wage >= 94866 && wage <= 100557){
//         return grossAnnualPay * 0.06;
//     } else if(wage >= 106591 && wage <= 112985){
//         return grossAnnualPay * 0.065;
//     } else if(wage >= 106591 && wage <= 112985){
//         return grossAnnualPay * 0.07;
//     } else if(wage >= 112986 && wage <= 119764){
//         return grossAnnualPay * 0.075;
//     } else if(wage >= 119765 && wage <= 126950){
//         return grossAnnualPay * 0.08;
//     } else if(wage >= 126951  && wage <= 134568){
//         return grossAnnualPay * 0.085;
//     } else if(wage >= 134569  && wage <= 142642){
//         return grossAnnualPay * 0.09;
//     } else if(wage >= 142643  && wage <= 151,200){
//         return grossAnnualPay * 0.095;
//     } else if(wage >= 151201){
//         return grossAnnualPay * 0.01;
//     } else{
//         return grossAnnualPay * 0;
//     }
// }
