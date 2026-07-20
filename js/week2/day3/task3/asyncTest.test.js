/*
task 3 Async Tests and Timer Mocks
1. write async tests with async/await : fetchJSON resolves with data , rejects with HttpError on non-200
2. use jest.useFakeTimers() to test debounce : call 10 times rapidlly , verify underlying function called once after the delay 
3. test memoize: verify wrapped function called once for repeated input , twice for two different inputs ,
4. test AbortController timeout fires after configured duration using jest.advanceTimersByTime()
*/

import { debounce, fetchJson, memoize } from "./fetch.js";

beforeEach(() => {
    fetchSpy = jest.spyOn(global, "fetch");
});
afterEach(() => {
    fetchSpy.mockRestore();
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
    await expect(fetchJson()).resolves.toEqual({ data: "success" });
});
test("fetch : handle Http error successfully  ", async () => {
    fetchSpy.mockRejectedValue({
        ok: false,
        status: 500,
        json: async () => {
            return {
                error: "HttpError",
            };
        },
    });
    await expect(fetchJson()).rejects.toThrow("HttpError");
});

//jest useFakeTimers

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("Use  fake timer", () => {
    const func = jest.fn(() => {
        console.log("hello");
    });
    const debounceFn = debounce(func);
    for (let i = 0; i < 10; i++) {
        debounceFn();
    }
    jest.runAllTimers();
    expect(func).toHaveBeenCalled();
});

const add = (...args) => {
    return args.reduce((s, e) => {
        return (s += e);
    }, 0);
};
const func = jest.fn(add);
const memoizeAddFunction = memoize(func);

test("memoize : successfully perform caching", () => {
    memoizeAddFunction(1, 2, 3);
    memoizeAddFunction(1, 2, 3);
    expect(func).toHaveBeenCalledTimes(1);
});
test("memoize : have been called twice for different inputs", () => {
    func.mockRestore();
    memoizeAddFunction(2, 3, 4);
    memoizeAddFunction(1, 5, 74);
    expect(func).toHaveBeenCalledTimes(2);
});
test("abortController : fires after configured duration ", async () => {
    const controller = new AbortController();
    const delay = 2000;
    const url = `https://mock.httpstatus.io/500`;
    const response = fetchJson(url, { signal: controller.signal });
    setTimeout(() => {
        controller.abort();
    }, delay);
    jest.advanceTimersByTime(delay);
    await expect(response).rejects.toThrow();
});
