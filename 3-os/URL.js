
import { URL } from "url"
const myUrl = new URL("https://example.com:8000/path/name?id=100&status=active");
console.log("Хост: ", myUrl.host);
console.log("Имя хоста: ", myUrl.hostname);
console.log("Порт: ", myUrl.port);
console.log("путь: ", myUrl.pathname);
console.log("Параметры: ", myUrl.searchParams);

