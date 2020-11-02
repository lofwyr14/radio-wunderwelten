let result = "";
document.querySelectorAll("tbody>tr").forEach(
    row => result += `<div>{
"time":"${row.querySelector("td:nth-child(1)").textContent}",
"title": "${row.querySelector("td:nth-child(3)").textContent}",
"performer": "${row.querySelector("td:nth-child(2)").textContent}"},
</div>`);
document.querySelector("table").insertAdjacentHTML("beforebegin", result);
