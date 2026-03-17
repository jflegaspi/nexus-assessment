(() => {

const widget = document.querySelector(".eta-widget");
if (!widget) return;

const regionSelect = widget.querySelector(".region");
const dateOutput = widget.querySelector(".delivery-date");
const messageOutput = widget.querySelector(".delivery-message");

const productData = JSON.parse(
  widget.querySelector(".product-json").textContent
);

const baseLead = parseInt(widget.dataset.baseTime);
const preorderLead = parseInt(widget.dataset.orderTime);
const cutoffHour = parseInt(widget.dataset.cutoffTime);

async function loadRegionRules() {
  const url = document.currentScript.src.replace(
    "delivery.js",
    "region-rules.json"
  );

  const res = await fetch(url);
  return await res.json();
}

function formatDate(date) {
  return date.toLocaleDateString(undefined,{
    day:"numeric",
    month:"short"
  });
}

function calculateETA(days) {

  const now = new Date();

  if(now.getHours() > cutoffHour){
    days += 1;
  }

  const start = new Date();
  start.setDate(start.getDate()+days);

  const end = new Date();
  end.setDate(end.getDate()+days+2);

  return `Arrives between ${formatDate(start)}–${formatDate(end)}`;
}

async function updateETA(region){

  const rules = await loadRegionRules();

  if(!rules[region]){
    dateOutput.textContent = "Delivery estimate unavailable";
    messageOutput.textContent = "";
    return;
  }

  let lead = baseLead;

  if(!productData.available){
    lead = preorderLead;
  }

  const shippingDays = rules[region].shipping_days;

  const eta = calculateETA(lead + shippingDays);

  dateOutput.textContent = eta;
  messageOutput.textContent = rules[region].message;
}

regionSelect.addEventListener("change",(e)=>{
  const region = e.target.value;

  if(!region){
    dateOutput.textContent = "";
    messageOutput.textContent = "";
    return;
  }

  updateETA(region);
});

})();