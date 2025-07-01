type ValidationRule<T> = {
  validate: (value: T) => boolean,`n  message: string};
type FieldRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[0];};
type FormErrors<T> = {
  [K in keyof T]?: string;};
interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: FieldRules<T>;
  onSubmit?: (values: T) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;}
export declare const useForm: <T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  validateOnChange,
//   validateOnBlur
}: UseFormOptions<T>) => {
  values: T,`n  errors: FormErrors<T>;,`n  touched: Record<keyof T, boolean>;
  isSubmitting: boolean,`n  handleChange: (name: keyof T, value: T[keyof T]) => void,`n  handleBlur: (name: keyof T) => void,`n  handleSubmit: (e?: React.FormEvent) => Promise<void>;,`n  reset: () => void,`n  setFieldValue: (name: keyof T, value: T[keyof T]) => void,`n  setFieldError: (name: keyof T, error: string) => void,`n  validateField: (name: keyof T, value: T[keyof T]) => string | undefined,`n  validateForm: () => FormErrors<T>};
export Record<string, any>;


`
