const createCasualFormHandler = async (event) => {
    event.preventDefault();
    console.log("here");
    

    const first_name = document.getElementById("C_first_name").value.trim();
    const last_name = document.getElementById("C_last_name").value.trim();
    const date_of_birth = document.getElementById("C_dob").value.trim();
    const is_casual = true;
    const has_hecs = document.getElementById("C_has_hecs").value;
    const hoursWorked = document.getElementById("hoursWorked").value.trim();
    const hourlyWage = document.getElementById("hourlyRate").value.trim();
    const grossAnnaualPay = ((hoursWorked * hourlyWage) * 1.25) * 52;
    const medicare = grossAnnaualPay * 0.02;
    const hecsRepayment = () => {
    if(has_hecs){
        const repayment = calculateHecs(grossAnnaualPay);
        return repayment;
    }};
    const user_id = await fetch("/api/user/currentId");
    console.log(user_id);
  
    if (first_name && last_name && date_of_birth && medicare && has_hecs && user_id) {
      const response = await fetch('/api/taxpayer/newUser', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, date_of_birth, medicare, has_hecs, user_id}),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);

  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.casualForm')
  .addEventListener('submit', createCasualFormHandler );



  const calculateHecs = (grossAnnaualPay) =>{
    if(wage >= 51550 && wage <= 59518){
        return grossAnnaualPay * 0.01;
    } else if(wage >= 59519 && wage <= 63089){
        return grossAnnaualPay * 0.02;
    } else if(wage >= 63090 && wage <= 66875){
        return grossAnnaualPay * 0.025;
    } else if(wage >= 66876 && wage <= 70888){
        return grossAnnaualPay * 0.03;
    } else if(wage >= 70889 && wage <= 75140){
        return grossAnnaualPay * 0.035;
    } else if(wage >= 75141 && wage <= 79649){
        return grossAnnaualPay * 0.04;
    } else if(wage >= 79650 && wage <= 84249){
        return grossAnnaualPay * 0.045;
    } else if(wage >= 84430 && wage <= 89494){
        return grossAnnaualPay * 0.05;
    } else if(wage >= 89495 && wage <= 94865){
        return grossAnnaualPay * 0.055;
    } else if(wage >= 94866 && wage <= 100557){
        return grossAnnaualPay * 0.06;
    } else if(wage >= 106591 && wage <= 112985){
        return grossAnnaualPay * 0.065;
    } else if(wage >= 106591 && wage <= 112985){
        return grossAnnaualPay * 0.07;
    } else if(wage >= 112986 && wage <= 119764){
        return grossAnnaualPay * 0.075;
    } else if(wage >= 119765 && wage <= 126950){
        return grossAnnaualPay * 0.08;
    } else if(wage >= 126951  && wage <= 134568){
        return grossAnnaualPay * 0.085;
    } else if(wage >= 134569  && wage <= 142642){
        return grossAnnaualPay * 0.09;
    } else if(wage >= 142643  && wage <= 151,200){
        return grossAnnaualPay * 0.095;
    } else if(wage >= 151201){
        return grossAnnaualPay * 0.01;
    } else{
        return grossAnnaualPay * 0;
    }
}