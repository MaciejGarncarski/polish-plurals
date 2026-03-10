/**
 * Polish noun forms used for pluralization.
 *
 * Properties:
 * - `one`  – singular form used with 1 (e.g. "jabłko")
 * - `few`  – paucal form used with numbers ending in 2–4 except 12–14 (e.g. "jabłka")
 * - `many` – plural/genitive plural form used with 0, 5–21, etc. (e.g. "jabłek")
 */
export type PluralForms = {
  one: string;
  few: string;
  many: string;
};

/**
 * Returns the number with the correct Polish noun form.
 *
 * @param count - Number used for pluralization.
 * @param forms - Object containing the three Polish plural forms.
 * @returns String formatted as `<count> <form>`.
 */
export function pluralize(count: number, forms: PluralForms): string {
  return `${count} ${getPluralForm(count, forms)}`;
}

/**
 * Selects the correct Polish noun form for a given number.
 *
 * Rules:
 * - 1 → `one`
 * - numbers ending in 2–4 except 12–14 → `few`
 * - all other integers → `many`
 * - fractional numbers (e.g. 1.5, 2.3) → `few`
 *
 * @param count - Number used to determine the plural form.
 * @param forms - Object containing the three Polish plural forms.
 * @returns The appropriate noun form.
 */
export function getPluralForm(count: number, forms: PluralForms): string {
  if (
    typeof forms !== "object" ||
    forms === null ||
    typeof forms.one !== "string" ||
    typeof forms.few !== "string" ||
    typeof forms.many !== "string"
  ) {
    throw new TypeError("Forms must be an object with one, few, many strings");
  }

  const { one, few, many } = forms;

  if (typeof count !== "number" || !isFinite(count)) {
    return many;
  }

  const absCount = Math.abs(count);

  if (!Number.isInteger(absCount)) {
    return few;
  }

  const mod10 = absCount % 10;
  const mod100 = absCount % 100;

  if (absCount === 1) {
    return one;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }

  return many;
}
