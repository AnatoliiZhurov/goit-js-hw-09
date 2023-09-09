const elements = {
  delayInput: document.querySelector(`input[name="delay"]`),
  stepInput: document.querySelector(`input[name="step"]`),
  amountInput: document.querySelector(`input[name="amount"]`),
  form: document.querySelector(`.form`),
};

elements.form.addEventListener(`submit`, handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  // const firstDelay = Number(elements.delayInput.value);
  const step = Number(elements.stepInput.value);
  const amount = Number(elements.amountInput.value);
  let delay = Number(elements.delayInput.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
