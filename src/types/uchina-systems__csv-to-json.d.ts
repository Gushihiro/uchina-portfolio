declare module "@uchina-systems/csv-to-json" {
  export type CaseStyle =
    | "pascal"
    | "camel"
    | "snake"
    | "kebab"
    | "title"
    | "lower"
    | "upper";

  export interface ParseOptions {
    headers?: boolean; // default: true
    delimiter?: number; // default: 44 (",")
    caseStyle?: CaseStyle; // optional key normalization (headers only)
  }

  // Returns JSON string of an array of objects
  export function parse(bytes: Uint8Array, options?: ParseOptions): string;

  // Returns parsed objects directly
  export function parseToArray(
    bytes: Uint8Array,
    options?: ParseOptions
  ): Array<Record<string, string>>;

  // Optionally provided: generate TypeScript types from parsed rows
  export function generateTypes(
    rows: Array<Record<string, string>>,
    rootName?: string
  ): string;
}


