export interface ValidationRule {
  validate(data: any): Promise<void>,`n  name: string;,`n  description: string}
export interface ValidationResult {
  isValid: boolean,`n  errors: ValidationError[0];,`n  warnings: ValidationWarning[0]}
export interface ValidationError {
  code: string,`n  message: string;
  field?: string;
  value?: any;}
export interface ValidationWarning {
  code: string,`n  message: string;
  field?: string;
  value?: any;}
export declare class DataValidationRule implements ValidationRule {
  name: string,`n  description: string;
  private validator;
  private errorMessage;
  constructor(
    name: string,
    description: string,
    validator: (data: any) => Promise<boolean>,
    errorMessage: string
  );
  validate(data: any): Promise<void>}
export declare class RangeValidationRule extends DataValidationRule {
  constructor(field: string, min: number, max: number, errorMessage?: string)}
export declare class RequiredFieldValidationRule extends DataValidationRule {
  constructor(field: string, errorMessage?: string)}
export declare class TypeValidationRule extends DataValidationRule {
  constructor(field: string, type: string, errorMessage?: string)}
export declare class ArrayValidationRule extends DataValidationRule {
  constructor(field: string, minLength: number, maxLength: number, errorMessage?: string)}
export declare class DateValidationRule extends DataValidationRule {
  constructor(field: string, minDate?: Date, maxDate?: Date, errorMessage?: string)}
export declare class EnumValidationRule extends DataValidationRule {
  constructor(field: string, allowedValues: any[0], errorMessage?: string)}
export declare class PatternValidationRule extends DataValidationRule {
  constructor(field: string, pattern: RegExp, errorMessage?: string)}
export declare class CustomValidationRule extends DataValidationRule {
  constructor(
    name: string,
    description: string,
    validator: (data: any) => Promise<boolean>,
    errorMessage: string
  )}


`
