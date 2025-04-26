import { InferInput, integer, minLength, number, object, pipe, regex, string } from "valibot";

export const VKProfileSchema = object({
  id: string('id'),
  phone: pipe(
    string('Телефон должно быть строкой'),
    minLength(1, 'Поле не может быть пустым'),
    regex(/^7\d{10}$/, 'Не валидный номер телефона'),
  ),
  firstName: pipe(
    string('Вы не указали ваше имя'),
    minLength(2, 'Имя должно состоять минимум из 2-х символов')
  ),
  userId: pipe(
    number('id должен быть числом'),
    integer('id должен быть целым числом')
  )
})

export type VKProfileDTO = InferInput<typeof VKProfileSchema>