import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('form'),
  btn: document.querySelector('button'),
};

refs.input.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const delay = e.target.elements.delay.value;
  const step = e.target.elements.step.value;
  const amount = e.target.elements.amount.value;

  for (let position = 1; position <= amount; position++) {
    const promiseDelay = position * delay;

    createPromise(position, promiseDelay)
      .then(({ position, promiseDelay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${promiseDelay}ms`);
      })
      .catch(({ position, promiseDelay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${promiseDelay}ms`);
      });

    setTimeout(() => {}, step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, promiseDelay: delay });
      } else {
        // Reject
        reject({ position, promiseDelay: delay });
      }
    }, delay);
  });
}