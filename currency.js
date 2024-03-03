const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const Fromcurr=document.querySelector(".From select");
const Tocurr=document.querySelector(".To select");
const msg=document.querySelector(".msg")



for(let select of dropdowns) {
    for (currcode in countryList) {
     let newOption=document.createElement("option");
     newOption.innerText = currcode;
     newOption.value = currcode;
     if (select.name === "From" && currcode === "INR") {
        newOption.selected = "selected";
      } else if (select.name === "To" && currcode === "USD") {
        newOption.selected = "selected";
      }
     select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    });
}

 

  const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
      amtval=1;
      amount.value="1";
    }
    const URL=`${BASE_URL}/${Fromcurr.value.toLowerCase()}/${Tocurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=response.json();
    let Rate=data[Tocurr.value.toLowerCase()]

    let finalamount=amtval*Rate;
    msg.innerText = `${amtval} ${Fromcurr.value} = ${finalamount} ${Tocurr.value}`;
  };

  const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
  });

  window.addEventListener("load", () => {
    updateExchangeRate();
  });
