(() => {

const widget = document.querySelector(".eta-widget");
if (!widget) {
  return;
}
const regionSelect = widget.querySelector(".region");
const dateOutput = widget.querySelector(".delivery-date");
const messageOutput = widget.querySelector(".delivery-message");
const productData = JSON.parse(
  widget.querySelector(".product-json").textContent
);
const baseLead = parseInt(widget.dataset.baseTime);
const preorderLead = parseInt(widget.dataset.orderTime);
const cutoffHour = parseInt(widget.dataset.cutoffTime);

//Load Country Rules
async function loadRegionRules() {
  const rulesScript = widget.querySelector(".region-rules-json");
  if (rulesScript) {
    return JSON.parse(rulesScript.textContent);
  }
  throw new Error("Region rules not found in page");
}

//Set date format for the block
function dateformat(date) {
  return date.toLocaleDateString(undefined,{
    day:"numeric",
    month:"short"
  });
}

//Calculate ETA based on base time, order time and cutoff
function getestimate(days) {
  const now = new Date();
  if(now.getHours() > cutoffHour){
    days += 1;
  }

  const start = new Date();
  start.setDate(start.getDate()+days);

  const end = new Date();
  end.setDate(end.getDate()+days+2);

  return `ETA: ${dateformat(start)}–${dateformat(end)}`;
}
  
//Update ETA based on selected region on the dropdown
async function updateestimate(region){

  try {
    const rules = await loadRegionRules();
    if(!rules || !rules[region]){
      dateOutput.textContent = "Estimate unavailable for selected region";
      messageOutput.textContent = "";
      return;
    }

    let lead = baseLead;

    if(!productData.available){
      lead = preorderLead;
    }

    const shippingDays = rules[region].shipping_days;

    const eta = getestimate(lead + shippingDays);

    dateOutput.textContent = eta;
    messageOutput.textContent = rules[region].message;
  } catch (error) {
    dateOutput.textContent = "Error loading delivery info";
    messageOutput.textContent = error.message;
  }
}

// Listen for dropdown changes
regionSelect.addEventListener("change", (e) => {
  const region = e.target.value;

  if (!region) {
    dateOutput.textContent = "";
    messageOutput.textContent = "";
    return;
  }

  updateestimate(region);
});

})();