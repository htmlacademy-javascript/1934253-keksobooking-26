const getCoordinates = function (min, max, point) {
  if(min<0&&min<max) {
    return ('Задан неверный диапазон');
  }
  const coordinate =  Math.floor((Math.random() * (max - min + 1) + min).toFixed(point));
  return coordinate;
};
getCoordinates(1,6,2);
