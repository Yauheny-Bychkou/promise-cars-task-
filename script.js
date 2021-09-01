document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const select = document.getElementById("cars"),
    output = document.getElementById("output");
  const getData = (url) => {
    return new Promise((resolve, reject) => {
      select.addEventListener("change", () => {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.setRequestHeader("Content-type", "application/json");
        request.addEventListener("readystatechange", () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);

            resolve(data);
          } else {
            reject(request.statusText);
          }
        });
        request.send();
      });
    });
  };

  const outputCars = (data) => {
    data.cars.forEach((item) => {
      if (item.brand === select.value) {
        const { brand, model, price } = item;
        output.innerHTML = `Тачка ${brand} ${model} <br>
         Цена: ${price}$`;
      }
    });
  };

  const urlCars = "./cars.json";
  getData(urlCars)
    .then(outputCars)
    .catch((error) => console.log(error));
});
