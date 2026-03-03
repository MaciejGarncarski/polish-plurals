import { describe, it } from "node:test";
import { getPluralForm, type PluralForms } from "../src/index.js";
import assert from "node:assert/strict";

describe("getPluralForm", () => {
  const forms: PluralForms = ["jabłko", "jabłka", "jabłek"];

  describe("should return correct plural form for various counts", () => {
    it("should return correct plural form for 0", () => {
      const result = getPluralForm(0, forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return correct plural form for 1", () => {
      const result = getPluralForm(1, forms);
      assert.strictEqual(result, "jabłko");
    });

    it("should return correct plural form for 2", () => {
      const result = getPluralForm(2, forms);
      assert.strictEqual(result, "jabłka");
    });

    it("should return correct plural form for 5", () => {
      const result = getPluralForm(5, forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return correct plural form for 11", () => {
      const result = getPluralForm(11, forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return correct plural form for 21", () => {
      const result = getPluralForm(21, forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return correct plural form for 22", () => {
      const result = getPluralForm(22, forms);
      assert.strictEqual(result, "jabłka");
    });

    it("should return correct plural form for 23", () => {
      const result = getPluralForm(23, forms);
      assert.strictEqual(result, "jabłka");
    });

    it("should return correct plural form for 24", () => {
      const result = getPluralForm(24, forms);
      assert.strictEqual(result, "jabłka");
    });

    it("should return correct plural form for Infinity", () => {
      const result = getPluralForm(Infinity, forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return correct plural form for NaN", () => {
      const result = getPluralForm(NaN, forms);
      assert.strictEqual(result, "jabłek");
    });
  });

  describe("should return default plural form for non-numeric counts", () => {
    it("should return default plural form for a string", () => {
      // @ts-expect-error
      const result = getPluralForm("not a number", forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return default plural form for BigInt", () => {
      // @ts-expect-error
      const result = getPluralForm(BigInt(0), forms);
      assert.strictEqual(result, "jabłek");
    });

    it("should return default plural form for an object", () => {
      // @ts-expect-error
      const result = getPluralForm({}, forms);
      assert.strictEqual(result, "jabłek");
    });
  });

  describe("should handle numeric edge cases", () => {
    it("should return plural form for teen boundaries", () => {
      assert.strictEqual(getPluralForm(12, forms), "jabłek");
      assert.strictEqual(getPluralForm(13, forms), "jabłek");
      assert.strictEqual(getPluralForm(14, forms), "jabłek");
    });

    it("should return genitive plural for counts ending with 1 except 1 itself", () => {
      assert.strictEqual(getPluralForm(21, forms), "jabłek");
      assert.strictEqual(getPluralForm(31, forms), "jabłek");
      assert.strictEqual(getPluralForm(101, forms), "jabłek");
    });

    it("should return plural form for hundreds ending with teen values", () => {
      assert.strictEqual(getPluralForm(111, forms), "jabłek");
      assert.strictEqual(getPluralForm(112, forms), "jabłek");
      assert.strictEqual(getPluralForm(113, forms), "jabłek");
      assert.strictEqual(getPluralForm(114, forms), "jabłek");
    });

    it("should return correct forms for negative numbers", () => {
      assert.strictEqual(getPluralForm(-1, forms), "jabłko");
      assert.strictEqual(getPluralForm(-2, forms), "jabłka");
      assert.strictEqual(getPluralForm(-21, forms), "jabłek");
    });

    it("should return default form for decimal numbers", () => {
      assert.strictEqual(getPluralForm(1.1, forms), "jabłek");
      assert.strictEqual(getPluralForm(2.5, forms), "jabłka");
      assert.strictEqual(getPluralForm(21.01, forms), "jabłek");
    });
  });

  describe("should throw an error for invalid input", () => {
    it("should throw an error for non-array forms", () => {
      // @ts-expect-error
      assert.throws(() => getPluralForm(1, "not an array"), {
        name: "TypeError",
        message: "Forms must be an array of three strings",
      });
    });

    it("should throw an error for forms with incorrect length", () => {
      const invalidForms = ["only one form"] as unknown as PluralForms;

      assert.throws(() => getPluralForm(1, invalidForms), {
        name: "TypeError",
        message: "Forms must be an array of three strings",
      });
    });
  });
});
