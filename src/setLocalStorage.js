export function setLocalStorage(city, continent_name) {
    const cityLocSt = JSON.stringify(city);
    const continentLocSt = JSON.stringify(continent_name);

    localStorage.setItem("cityLocSt", cityLocSt);
    localStorage.setItem("continentLocSt", continentLocSt);
}