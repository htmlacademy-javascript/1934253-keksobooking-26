function getCoordinates(min, max, point) {
  if(min>=0&&min<max) {
  let coordinate =  ((Math.random() * (max - min + 1) + min).toFixed(point));
} else {
  console.log('Задан неверный диапазон');
}

  return coordinate
}

getCoordinates(1,2,2);
