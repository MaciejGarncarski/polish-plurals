/**
 * Polish noun forms used for pluralization.
 *
 * The tuple order is:
 * 1) singular form (e.g. "jabłko")
 * 2) paucal form for counts ending with 2-4 outside teens (e.g. "jabłka")
 * 3) plural/genitive plural form (e.g. "jabłek")
 */
export type PluralForms = [string, string, string];

/**
 * Returns the count with the correct Polish noun form.
 *
 * @param count - Value to pluralize.
 * @param forms - Tuple of three noun forms in the required order.
 * @returns String in format `<count> <form>`.
 */
export function pluralize(count: number, forms: PluralForms): string {
  return `${count} ${getPluralForm(count, forms)}`;
}

/**
 * Selects the correct Polish noun form for a given count.
 *
 * @param count - Value used to determine plural form.
 * @param forms - Tuple of three noun forms in the required order.
 * @returns The selected noun form.
 * @throws {TypeError} If `forms` is not an array of exactly three elements.
 */
export function getPluralForm(count: number, forms: PluralForms): string {
  if (Array.isArray(forms) === false || forms.length !== 3) {
    throw new TypeError("Forms must be an array of three strings");
  }

  if (typeof count !== "number" || !isFinite(count)) {
    return forms[2];
  }

  const [form1, form2, form3] = forms;

  const absCount = Math.abs(count);
  const mod10 = absCount % 10;
  const mod100 = absCount % 100;

  if (absCount === 1) {
    return form1;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return form2;
  }

  return form3;
}
