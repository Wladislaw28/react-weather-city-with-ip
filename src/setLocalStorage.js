export function setLocalStorage(data, date_name) {
    const dataLocalSt  = JSON.stringify(data);
    localStorage.setItem(date_name, dataLocalSt);
}