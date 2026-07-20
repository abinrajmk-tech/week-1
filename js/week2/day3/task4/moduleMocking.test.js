/**
 * @jest-environment jsdom
 */
import { getTheme } from "./darkTheme.js";
import { updateWeather } from "./weather.js";
import { fetchWeather } from "./weatherUtils.js";
jest.mock("./weatherUtils.js");
let storageSpy;
beforeEach(() => {
    storageSpy = jest.spyOn(Storage.prototype, "getItem");
    document.body.innerHTML = `<div id="app"></div>`;

    fetchSpy = jest.spyOn(global, "fetch");
});
afterEach(() => {
    storageSpy.mockRestore();
    jest.restoreAllMocks();

    fetchSpy.mockRestore();
});

test("dark mode reads preference on init", () => {
    const localStorageMock = storageSpy.mockImplementation((data) => {
        if (data === "theme") return "dark";
    });
    getTheme();
    expect(localStorageMock).toHaveBeenCalledWith("theme");
});
test("weather API : correct url is called", () => {
    const url = "";
    updateWeather(url);
    expect(fetchWeather).toHaveBeenCalledWith(url);
});

let fetchSpy;
test("fetch : resolves data successfully ", async () => {
    fetchSpy.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
            return {
                data: "success",
            };
        },
    });
    await expect(fetchWeather()).resolves.toEqual({ data: "success" });
});
