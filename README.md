# polish-plurals

Small TypeScript helpers for Polish noun pluralization.

## Install

```bash
pnpm add @maciekdev/polish-plurals
```

## Usage

```ts
import { pluralize, getPluralForm } from "@maciekdev/polish-plurals";

const forms = {
  one: "jabłko",
  few: "jabłka",
  many: "jabłek",
} as const;

pluralize(1, forms); // "1 jabłko"
pluralize(2, forms); // "2 jabłka"
pluralize(5, forms); // "5 jabłek"
pluralize(1.5, forms); // "1.5 jabłka"

getPluralForm(22, forms); // "jabłka"
getPluralForm(Infinity, forms); // "jabłek"
```

## API

### `type PluralForms = { one: string; few: string; many: string }`

Object of forms:

1. `one`: singular form, used with `1` (e.g. `jabłko`)
2. `few`: paucal form, used with numbers ending in `2` to `4` outside `12` to `14`, and with fractional numbers (e.g. `jabłka`)
3. `many`: plural / genitive plural form, used with `0`, `5+`, teen endings, and invalid or non-finite counts (e.g. `jabłek`)

### `getPluralForm(count: number, forms: PluralForms): string`

Returns the correct noun form for Polish counting rules.

### `pluralize(count: number, forms: PluralForms): string`

Returns a full string in format `<count> <form>`.

## Behavior notes

- Throws `TypeError` if `forms` is not an object with string properties `one`, `few`, and `many`.
- Uses absolute value for negative numbers (e.g. `-2` behaves like `2`).
- Fractional numbers use the `few` form.
- For non-finite or non-number values, falls back to the `many` form.

## Why not `Intl`?

This package uses explicit Polish rules instead of `Intl.PluralRules` because its behavior for fractional numbers differs from the rules implemented here. For example, `Intl.PluralRules("pl")` classifies `1.5` as `other`, while this package returns the `few` form.

## Development

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```
