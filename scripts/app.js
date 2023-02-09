const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  // Destructure Properties
  const { cityDets, weather } = data;

  // Update Details Template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // Update Night/Day & Icon Images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  let timeSrc = null;
  if(weather.IsDayTime){
    timeSrc = 'img/day.png';
  } else {
    timeSrc = 'img/night.png';
  }
  time.setAttribute('src', timeSrc);

  // Remove d-none Class If Present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };

};

cityForm.addEventListener('submit', e => {
  // Prevent Default Action
  e.preventDefault();
  
  // Get City Value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update UI With New City
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});