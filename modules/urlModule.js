const myUrl = "https://www.youtube.com/watch?v=RNVk_aV0i3s"

const urlObj = new URL(myUrl);

console.log(urlObj);
console.log(urlObj.host);
console.log(urlObj.search);
console.log(urlObj.searchParams);