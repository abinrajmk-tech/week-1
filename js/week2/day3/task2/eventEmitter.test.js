import { UserStore } from "./eventEmitter.js";
import { fetchJson } from "./fetch.js";

beforeEach(() => {
    fetchSpy = jest.spyOn(global, "fetch");
});
afterEach(() => {
    fetchSpy.mockRestore();
});
let fetchSpy;

const users = new UserStore();

test("Event Emitter: emit calls each with correct args", () => {
    const mockCallback = jest.fn();
    users.on("userAdded", mockCallback);
    users.add(1, "user1");
    expect(mockCallback).toHaveBeenCalledWith(1);
});

test("Fetch Json  successfully  from API", async () => {
    fetchSpy.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: "success" }),
    });
    const result = await fetchJson(
        "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await result.json();
    expect(fetchSpy).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts"
    );
    expect(data.data).toBe("success");
});
test("Fetch Json: Handle HTTP error", async () => {
    fetchSpy.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
    });
    const result = await fetchJson("https://a.com");
    const data = await result.json();

    expect(data.error).toBe("Server error");
});
test("Fetch JSON: Handle network failure", async () => {
    fetchSpy.mockRejectedValue(new Error("Network timeout"));

    await expect(fetchJson("a.com")).rejects.toThrow("Network timeout");
});
test("mockImplementationOnce", async () => {
    const mockFn = jest
        .fn()
        .mockImplementationOnce(() =>
            Promise.reject(new Error("Network Error"))
        )
        .mockImplementationOnce(() => Promise.resolve({ data: "success" }));
    await expect(mockFn()).rejects.toThrow("Network Error");
    await expect(mockFn()).resolves.toEqual({ data: "success" });
});
