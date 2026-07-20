export async function fetchWeather(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error("error while fetching");
    }
    return data;
}
