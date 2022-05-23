export const toObject = (arr, key, value) => arr.reduce((previous, item) => ({
  ...previous,
  ...(item !== null && item !== undefined && { [item[key]]: item[value] }),
}), {})

export const getBase64 = (fileBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const isDevelopmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const openJsonInNewTab = (json) => {
  var myjson = JSON.stringify(json, null, 2);
  var x = window.open();
  x?.document.open();
  x?.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
  x?.document.close();
}

export const toQueryString = (obj, prefix) => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        toQueryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

export const getCurrentDate = (date) => {
  var d = new Date(date ?? Date.now()),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('-');
}