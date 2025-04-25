import { InferInput, minLength, object, pipe, regex, strictObject, string } from "valibot";

export const PhoneAuthSchema = object({
  phone: pipe(
    string('Логин должно быть строкой'),
    minLength(1, 'Поле не может быть пустым'),
    regex(/^7\d{10}$/, 'Не валидный формат'),
  ),
})

export type PhoneAuthDTO = InferInput<typeof PhoneAuthSchema>

export const PhoneAuthConfirmSchema = object({
  phone: string(),
  code: string()
})

export type PhoneAuthConfirmDTO = InferInput<typeof PhoneAuthConfirmSchema>