const form = document.querySelector("#form");
const phone = document.querySelector("#phone");
const countryCode = document.querySelector("#countryCode");
const loadingIndicator = document.getElementById("loadingIndicator");
const contactList = document.getElementById("contactList");
const contactData = document.getElementById("contactData");

contactList.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const phoneNumbers = phone.value;
  const code = countryCode.value;
  if (!phoneNumbers || !code) {
    return;
  }
  loadingIndicator.style.display = "block";
  fetch(
    `https://tel-eye-api.vercel.app/api/contacts?q=${phoneNumbers}&code=${code}`
  )
    .then((response) => response.json())
    .then((data) => {
      const contactData = document.getElementById("contactData");
      contactData.innerHTML = "";

      data.data.forEach((contact) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.phone}</td>
        `;
        contactData.appendChild(tr);
      });
      contactList.style.display = "table";
      loadingIndicator.style.display = "none";
    })
    .catch((error) => {
      console.error(error);
      loadingIndicator.style.display = "none";
    });
});
