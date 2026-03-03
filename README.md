# polish-plurals

Small TypeScript helpers for Polish noun pluralization.

## Install

```bash
pnpm add @maciekdev/polish-plurals
```

## Usage

```ts
import { pluralize, getPluralForm } from "@maciekdev/polish-plurals";

const forms = ["jabłko", "jabłka", "jabłek"] as const;

pluralize(1, forms); // "1 jabłko"
pluralize(2, forms); // "2 jabłka"
pluralize(5, forms); // "5 jabłek"

getPluralForm(22, forms); // "jabłka"
```

## API

### `type PluralForms = [string, string, string]`

Tuple of forms in order:

1. singular (e.g. `jabłko`)
2. paucal (e.g. `jabłka`)
3. plural/genitive plural (e.g. `jabłek`)

### `getPluralForm(count: number, forms: PluralForms): string`

Returns the correct noun form for Polish counting rules.

### `pluralize(count: number, forms: PluralForms): string`

Returns a full string in format `<count> <form>`.

## Behavior notes

- Throws `TypeError` if `forms` is not an array of exactly 3 strings.
- Uses absolute value for negative numbers (e.g. `-2` behaves like `2`).
- For non-finite / non-number values, falls back to the third form.

## Development

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```
