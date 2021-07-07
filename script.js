"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      map = L.map("map").setView([latitude, longitude], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map).bindPopup("Vous êtes là").openPopup();

      //QUand on clique sur la carte
      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
        // const {lat,lng} = mapEvent.latlng;
        // L.marker([lat, lng])
        // .addTo(map)
        // .bindPopup(L.popup({
        //   maxWidth:250,
        //   minWidth:100,
        //   autoClose:false,
        //   closeOnClick : false,
        //   className:"running-popup"
        // }))
        // .setPopupContent("Workout")
        // .openPopup();
      });
    },
    function () {
      alert("Vous avez refusez la géolocalisation");
    }
  );
} else {
  alert("Votre navigateur ne supporte pas la géolocalisation");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Nettoyage formulaire
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
  //Marqueur
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

inputType.addEventListener("change",function() {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
})