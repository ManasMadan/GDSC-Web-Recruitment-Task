const getGradientColor = (currentWeatherCondition) => {
  let gradient;
  switch (currentWeatherCondition) {
    case "Clouds":
      gradient = "#C6E2FF";
      break;
    case "Clear":
      gradient = "#87CEEB";
      break;
    case "Tornado":
      gradient = "#FFE4E1";
      break;
    case "Squall":
      gradient = "#B0C4DE";
      break;
    case "Ash":
      gradient = "#C0C0C0";
      break;
    case "Dust":
      gradient = "#C0C0C0";
      break;
    case "Sand":
      gradient = "#F5DEB3";
      break;
    case "Fog":
      gradient = "#E0E0E0";
      break;
    case "Haze":
      gradient = "#E0E0E0";
      break;
    case "Smoke":
      gradient = "#C0C0C0";
      break;
    case "Snow":
      gradient = "#E0FFFF";
      break;
    case "Mist":
      gradient = "#E0E0E0";
      break;
    case "Rain":
      gradient = "#87CEFA";
      break;
    case "Drizzle":
      gradient = "#B0E0E6";
      break;
    case "Thunderstorm":
      gradient = "#00BFFF";
      break;
    default:
      gradient = "#FFFFFF";
  }
  return gradient;
};
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
export { getGradientColor, shadeColor };
