const getCoordinates = function (min, max, point) {
  if(max > min && min > 0) {
    return ((Math.random() * (max - min + 1) + min).toFixed(point));
  }
  return ('Задан неверный диапазон');
};
getCoordinates(7, 6, 2);

