export interface DateConverter {
  parse(date: any, pattern?: string, locale?: string): Date ;
  format(date: Date, pattern?: string, locale?: string): string ;
}
