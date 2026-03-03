import { describe, it } from "node:test";
import { type PluralForms, pluralize } from "../src";
import assert from "node:assert/strict";

describe("pluralize", () => {
  const forms: PluralForms = ["samochód", "samochody", "samochodów"];

  describe("should return correct pluralized string for various counts", () => {
    it("should return correct pluralized string for 0", () => {
      const result = pluralize(0, forms);

      assert.strictEqual(result, "0 samochodów");
    });

    it("should return correct pluralized string for 1", () => {
      const result = pluralize(1, forms);

      assert.strictEqual(result, "1 samochód");
    });

    it("should return correct pluralized string for 2", () => {
      const result = pluralize(2, forms);

      assert.strictEqual(result, "2 samochody");
    });

    it("should return correct pluralized string for 5", () => {
      const result = pluralize(5, forms);

      assert.strictEqual(result, "5 samochodów");
    });

    it("should return correct pluralized string for 11", () => {
      const result = pluralize(11, forms);

      assert.strictEqual(result, "11 samochodów");
    });
  });

  describe("should return default plural form for non-numeric counts", () => {
    it("should return default plural form for a string", () => {
      // @ts-expect-error
      const result = pluralize("not a number", forms);

      assert.strictEqual(result, "not a number samochodów");
    });

    it("should return default plural form for BigInt", () => {
      // @ts-expect-error
      const result = pluralize(BigInt(10), forms);

      assert.strictEqual(result, "10 samochodów");
    });
  });
});
