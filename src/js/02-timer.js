import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  input: document.querySelector(`#datetime-picker`),
  startBtn: document.querySelector(`[data-start]`),
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

elements.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      alert('Please choose a date in the future');
    } else {
      elements.startBtn.disabled = false;
      elements.startBtn.addEventListener(`click`, handlerStart);

      function handlerStart() {
        handlerTime();
        elements.startBtn.disabled = true;
        elements.input.disabled = true;
      }
      function handlerTime() {
        const diffTime = selectedDates[0] - new Date();
        elements.days.textContent = addLeadingZero(
          `${convertMs(diffTime).days}`
        );
        elements.hours.textContent = addLeadingZero(
          `${convertMs(diffTime).hours}`
        );
        elements.minutes.textContent = addLeadingZero(
          `${convertMs(diffTime).minutes}`
        );
        elements.seconds.textContent = addLeadingZero(
          `${convertMs(diffTime).seconds}`
        );

        console.log(diffTime);

        if (diffTime <= 1000) {
          clearInterval(timerInterval);
          elements.days.textContent = `00`;
          elements.hours.textContent = `00`;
          elements.minutes.textContent = `00`;
          elements.seconds.textContent = `00`;
        }
      }
    }
  },
};
const timerInterval = setInterval(handlerTime, 1000);

flatpickr(elements.input, options);

function addLeadingZero(value) {
  return value.padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const relTime = new Date();
const secTime = relTime.getTime();
console.log(secTime);
