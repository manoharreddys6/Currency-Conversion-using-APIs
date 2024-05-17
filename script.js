const BASE="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const selects=document.querySelectorAll(".dropdown select");

let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");

let btn=document.querySelector("button");

let msg=document.querySelector(".msg");


for(let select of selects){
  for(let currCode in countryList){
    let newOpt=document.createElement("option");
    newOpt.innerText=currCode;
    newOpt.value=currCode;
    if(currCode==="INR" && select.name==="to"){
      newOpt.selected="selected";
    }
    else if(currCode==="USD" && select.name==="from"){
      newOpt.selected="selected";
    }
    select.append(newOpt);
  }

  select.addEventListener("change",(evt)=>{
    updateFlags(evt.target);
  })
}

const updateFlags = (element) =>{
  // https://flagsapi.com/US/flat/64.png
  let currCurency=element.value;
  // console.log(currCurency);
  let currCountry=countryList[currCurency];
  // console.log(currCountry);
  let newSrc=`https://flagsapi.com/${currCountry}/flat/64.png`;
  let img=element.parentElement.querySelector("img");

  img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchange();
})

const updateExchange= async ()=>{
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if(amtVal<1 || amtVal===""){
  amtVal=1;
  amount.value=1;
}
const url=`${BASE}/${fromCurr.value.toLowerCase()}.json`;
let response=await fetch(url);
let data=await response.json();
let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

let res=amtVal * exchangeRate;
// console.log(res);
msg.innerText=`${amtVal} ${fromCurr.value} = ${res} ${toCurr.value}`;
}


window.addEventListener("load",()=>{
  updateExchange();
})