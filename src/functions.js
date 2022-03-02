export function timeConvert(time) {
    const pad = (number) => {
        return number > 9 ? number : `0${number}`;
    };

    const currentDate = new Date(time);

    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${pad(date)}.${pad(month)}.${year}`;
}

export function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// https://stackoverflow.com/a/38578855
const ipRegExp = /^((?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::([0-9]{1,5}))?$/g;

export function declOfNum(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

export function isIP(ip) {
    return ip.match(ipRegExp);
}

export function getRatio(dividend, divider) {
    return divider && dividend ? (dividend / divider).toFixed(2) : 0;
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export function currencyString(value){
    var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
}

export function getUtcTime() { return (new Date().getTime() + new Date().getTimezoneOffset()) }

export function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.src = src;
        image.onload = () => {
            resolve(image);
        };
        image.onerror = reject;
    });
}

export function getRandomElement(array) {
    return array[randomInteger(0, array.length - 1)];
}
