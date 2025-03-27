// Type definitions for csv-string
declare module 'csv-string' {
  type CsvDelimiter = string;
  
  interface ParseOptions {
    separator?: string;
    quote?: string;
    escape?: string;
    columns?: boolean | string[];
    output?: "objects" | "tuples";
  }

  // Parse function overloads
  export function parse(input: string): string[][];
  export function parse(input: string, delimiter: CsvDelimiter): string[][];
  export function parse(input: string, options: Partial<ParseOptions>): string[][];
  export function parse(input: string, options: Partial<ParseOptions> & { output: "objects" }): { [key: string]: string }[];

  // Stringify function
  export function stringify(data: any[][], delimiter?: CsvDelimiter): string;
  export function stringify(data: any[][], options?: { separator?: string }): string;
  
  // Other functions
  export function detect(input: string): string;
  export function forEach(input: string, callback: (record: string[], index: number) => void, delimiter?: CsvDelimiter): void;
  export function createFormatter(delimiter?: CsvDelimiter): (record: any[]) => string;
}