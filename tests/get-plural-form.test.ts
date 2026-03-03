import { describe, it } from "node:test";
import { getPluralForm, type PluralForms } from "../src";
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
