let data = [];

document.querySelector("input").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      processData(content);
    };
    reader.readAsText(file);
  }
});

function processData(content) {
  const tdata = content.split("\n");
  for (let i of tdata) {
    const [name, surname, mail, number] = i.trim().split(",");
    console.log(i.trim().split("."));
    const newData = {
      name: name,
      surname: surname,
      mail: mail,
      number: number,
    };
    data.push(newData);
  }
  uploadTable();
}

function uploadTable() {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
    const jsonData = []; 
    data.forEach((newData) => {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      const surname = document.createElement("td");
      const mail = document.createElement("td");
      const number = document.createElement("td");
      name.innerText = newData.name;
      surname.innerText = newData.surname;
      mail.innerText = newData.mail;
      number.innerText = newData.number;
      row.append(name, surname, mail, number);
      tbody.appendChild(row);
  
      const jsonRow = {}; 
      jsonRow.name = newData.name;
      jsonRow.surname = newData.surname;
      jsonRow.mail = newData.mail;
      jsonRow.number = newData.number;
      jsonData.push(jsonRow); 
    });
  
    const inputs = document.querySelector(".input-group");
    const saveBtn = document.createElement("button");
    inputs.appendChild(saveBtn);
    saveBtn.classList.add("btn", "btn-success");
    saveBtn.innerHTML = "Save";
    saveBtn.addEventListener("click", function () {
      fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Data saved!!!");
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    });
  }
  






