import { describe, it } from "node:test";
import { getPluralForm, type PluralForms } from "../index.js";
import assert from "node:assert/strict";

describe("getPluralForm", () => {
  const forms: PluralForms = {
    one: "jabłko",
    few: "jabłka",
    many: "jabłek",
  };

  it("should handle normal counts", () => {
    assert.strictEqual(getPluralForm(0, forms), "jabłek");
    assert.strictEqual(getPluralForm(1, forms), "jabłko");
    assert.strictEqual(getPluralForm(2, forms), "jabłka");
    assert.strictEqual(getPluralForm(5, forms), "jabłek");
    assert.strictEqual(getPluralForm(11, forms), "jabłek");
    assert.strictEqual(getPluralForm(21, forms), "jabłek");
    assert.strictEqual(getPluralForm(22, forms), "jabłka");
    assert.strictEqual(getPluralForm(23, forms), "jabłka");
    assert.strictEqual(getPluralForm(24, forms), "jabłka");
  });

  it("should handle negative numbers", () => {
    assert.strictEqual(getPluralForm(-1, forms), "jabłko");
    assert.strictEqual(getPluralForm(-2, forms), "jabłka");
    assert.strictEqual(getPluralForm(-5, forms), "jabłek");
    assert.strictEqual(getPluralForm(-11, forms), "jabłek");
    assert.strictEqual(getPluralForm(-21, forms), "jabłek");
    assert.strictEqual(getPluralForm(-22, forms), "jabłka");
    assert.strictEqual(getPluralForm(-23, forms), "jabłka");
    assert.strictEqual(getPluralForm(-24, forms), "jabłka");
  });

  it("should handle decimal numbers", () => {
    assert.strictEqual(getPluralForm(1.5, forms), "jabłka");
    assert.strictEqual(getPluralForm(2.5, forms), "jabłka");
    assert.strictEqual(getPluralForm(5.5, forms), "jabłka");
  });

  it("should handle signed zero and integer-like decimals", () => {
    assert.strictEqual(getPluralForm(-0, forms), "jabłek");
    assert.strictEqual(getPluralForm(1.0, forms), "jabłko");
    assert.strictEqual(getPluralForm(2.0, forms), "jabłka");
    assert.strictEqual(getPluralForm(5.0, forms), "jabłek");
  });

  it("should handle large values around teen boundaries", () => {
    assert.strictEqual(getPluralForm(1001, forms), "jabłek");
    assert.strictEqual(getPluralForm(1002, forms), "jabłka");
    assert.strictEqual(getPluralForm(1012, forms), "jabłek");
    assert.strictEqual(getPluralForm(1112, forms), "jabłek");
  });

  it("should handle negative decimal numbers", () => {
    assert.strictEqual(getPluralForm(-1.5, forms), "jabłka");
    assert.strictEqual(getPluralForm(-2.5, forms), "jabłka");
    assert.strictEqual(getPluralForm(-12.5, forms), "jabłka");
  });

  it("should handle Infinity and NaN", () => {
    assert.strictEqual(getPluralForm(Infinity, forms), "jabłek");
    assert.strictEqual(getPluralForm(-Infinity, forms), "jabłek");
    assert.strictEqual(getPluralForm(NaN, forms), "jabłek");
  });

  it("should return default plural form for non-numeric counts", () => {
    // @ts-expect-error
    assert.strictEqual(getPluralForm("abc", forms), "jabłek");
    // @ts-expect-error
    assert.strictEqual(getPluralForm(null, forms), "jabłek");
    // @ts-expect-error
    assert.strictEqual(getPluralForm(undefined, forms), "jabłek");
    // @ts-expect-error
    assert.strictEqual(getPluralForm({}, forms), "jabłek");
    // @ts-expect-error
    assert.strictEqual(getPluralForm([], forms), "jabłek");
  });

  it("should throw TypeError for invalid forms object", () => {
    // @ts-expect-error
    assert.throws(() => getPluralForm(1, ["only one form"]), TypeError);
    // @ts-expect-error
    assert.throws(() => getPluralForm(1, ["two", "forms"]), TypeError);
    // @ts-expect-error
    assert.throws(() => getPluralForm(1, ["too", "many", "forms", "extra"]), TypeError);
    assert.throws(() => getPluralForm(1, "not an array" as unknown as PluralForms), TypeError);
  });
});
