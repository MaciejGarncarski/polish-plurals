export type PluralForms = [string, string, string];

export function pluralize(count: number, forms: PluralForms): string {
  return `${count} ${getPluralForm(count, forms)}`;
}

export function getPluralForm(count: number, forms: PluralForms): string {
  if (Array.isArray(forms) === false || forms.length !== 3) {
    throw new TypeError("Forms must be an array of three strings");
  }

  if (typeof count !== "number" || !isFinite(count)) {
    return forms[2];
  }

  const [form1, form2, form3] = forms;

  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return form1;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return form2;
  }

  return form3;
}
