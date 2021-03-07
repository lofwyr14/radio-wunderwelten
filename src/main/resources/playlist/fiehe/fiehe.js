  let result = "";
  document.querySelectorAll("tr").forEach(
  row => result += `<div>{
  "title": "${row.querySelector("td:nth-child(2)")?.textContent}",
  "performer": "${row.querySelector("td:nth-child(1)")?.textContent}"},
</div>`);
  document.querySelector("body").insertAdjacentHTML("afterbegin", result);