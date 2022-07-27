const Url = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  POST: 'https://26.javascript.pages.academy/keksobooking',
};

const ErrorMessage = {
  BAD_GET: 'Oшибка загрузки данных',
  BAD_POST: 'Ошибка размещения объявления',
};

const getData = (onSuccess, onFail) => {
  fetch(Url.GET)
    .then((response) => response.json())
    .then((bookings) => {
      onSuccess(bookings);
    })
    .catch(() => {
      onFail(ErrorMessage.BAD_GET);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ErrorMessage.BAD_POST);
      }
    })
    .catch(() => {
      onFail(ErrorMessage.BAD_POST);
    });
};

export { getData, sendData };
