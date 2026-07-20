import { fetchWeather } from "./weatherUtils";

export async function updateWeather(url) {
    const response = await fetchWeather(url);
}
