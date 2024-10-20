import { expect, it, test } from "vitest";

it("return true", () => {
  expect(true).toBe(true);
});

test.fails("should be able to expect a test to fail", () => {
  expect(false).toBe(true);
});

test("turn to string", () => {
  expect(String(11)).toBe("11");
});
