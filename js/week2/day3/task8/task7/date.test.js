import { formatDate } from "./date.js";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

test("testing formaDate : dd/mm/yy", () => {
    expect(formatDate(Date.now(), "DD/MM/YYYY")).toBe("20/07/2026");
});
test("testing formatDate : tomorrow", () => {
    expect(formatDate(tomorrow, "DD/MM/YYYY")).toBe("21/07/2026");
});
test("testing formatDate : yyyy-mm-dd", () => {
    expect(formatDate(Date.now(), "YYYY-MM-DD")).toBe("2026-07-20");
});

test("testing formateDate: yyyy-mm-dd tomorrow", () => {
    expect(formatDate(tomorrow, "YYYY-MM-DD")).toBe("2026-07-21");
});

test("formateDate: Month dd yyyy", () => {
    expect(formatDate(Date.now(), "Month DD, YYYY")).toBe("Jul 20, 2026");
});

test("formateDate: Month dd yyyy tomorrow", () => {
    expect(formatDate(tomorrow, "Month DD, YYYY")).toBe("Jul 2 21, 2026");
});

test("formateDate: relative function", () => {
    expect(formatDate(Date.now(), "relative")).toBe("today");
});

test("formateDate: relative function : tomorrow", () => {
    expect(formatDate(tomorrow, "relative")).toBe("1 days later");
});
