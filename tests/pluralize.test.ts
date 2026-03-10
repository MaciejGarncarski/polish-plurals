import { describe, it } from "node:test";
import { type PluralForms, pluralize } from "../index.js";
import assert from "node:assert/strict";

describe("pluralize", () => {
  const forms: PluralForms = {
    one: "samochód",
    few: "samochody",
    many: "samochodów",
  };

  it("should handle normal counts", () => {
    assert.strictEqual(pluralize(0, forms), "0 samochodów");
    assert.strictEqual(pluralize(1, forms), "1 samochód");
    assert.strictEqual(pluralize(2, forms), "2 samochody");
    assert.strictEqual(pluralize(5, forms), "5 samochodów");
    assert.strictEqual(pluralize(11, forms), "11 samochodów");
    assert.strictEqual(pluralize(22, forms), "22 samochody");
    assert.strictEqual(pluralize(23, forms), "23 samochody");
    assert.strictEqual(pluralize(24, forms), "24 samochody");
  });

  it("should handle negative numbers", () => {
    assert.strictEqual(pluralize(-1, forms), "-1 samochód");
    assert.strictEqual(pluralize(-2, forms), "-2 samochody");
    assert.strictEqual(pluralize(-5, forms), "-5 samochodów");
  });

  it("should handle decimal numbers", () => {
    assert.strictEqual(pluralize(1.5, forms), "1.5 samochody");
    assert.strictEqual(pluralize(2.5, forms), "2.5 samochody");
    assert.strictEqual(pluralize(5.5, forms), "5.5 samochody");
  });

  it("should handle signed zero and integer-like decimals", () => {
    assert.strictEqual(pluralize(-0, forms), "0 samochodów");
    assert.strictEqual(pluralize(1.0, forms), "1 samochód");
    assert.strictEqual(pluralize(2.0, forms), "2 samochody");
    assert.strictEqual(pluralize(5.0, forms), "5 samochodów");
  });

  it("should handle large values around teen boundaries", () => {
    assert.strictEqual(pluralize(1001, forms), "1001 samochodów");
    assert.strictEqual(pluralize(1002, forms), "1002 samochody");
    assert.strictEqual(pluralize(1012, forms), "1012 samochodów");
    assert.strictEqual(pluralize(1112, forms), "1112 samochodów");
  });

  it("should handle negative decimal numbers", () => {
    assert.strictEqual(pluralize(-1.5, forms), "-1.5 samochody");
    assert.strictEqual(pluralize(-2.5, forms), "-2.5 samochody");
    assert.strictEqual(pluralize(-12.5, forms), "-12.5 samochody");
  });

  it("should handle Infinity and NaN", () => {
    assert.strictEqual(pluralize(Infinity, forms), "Infinity samochodów");
    assert.strictEqual(pluralize(-Infinity, forms), "-Infinity samochodów");
    assert.strictEqual(pluralize(NaN, forms), "NaN samochodów");
  });

  it("should return default plural form for non-numeric counts", () => {
    // @ts-expect-error
    assert.strictEqual(pluralize("not a number", forms), "not a number samochodów");
    // @ts-expect-error
    assert.strictEqual(pluralize(BigInt(10), forms), "10 samochodów");
    // @ts-expect-error
    assert.strictEqual(pluralize(null, forms), "null samochodów");
    // @ts-expect-error
    assert.strictEqual(pluralize(undefined, forms), "undefined samochodów");
  });

  it("should throw TypeError for invalid forms object", () => {
    // @ts-expect-error
    assert.throws(() => pluralize(1, ["only one form"]), TypeError);
    // @ts-expect-error
    assert.throws(() => pluralize(1, ["two", "forms"]), TypeError);
    // @ts-expect-error
    assert.throws(() => pluralize(1, ["too", "many", "forms", "extra"]), TypeError);
    assert.throws(() => pluralize(1, "not an array" as unknown as PluralForms), TypeError);
  });
});
