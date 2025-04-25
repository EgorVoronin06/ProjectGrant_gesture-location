import { InferInput, integer, minLength, number, object, pipe, string } from "valibot";

export const TelegramProfileSchema = object({
  id: string('id'),
  firstName: pipe(
    string('Вы не указали ваше имя'),
    minLength(2, 'Имя должно состоять минимум из 2-х символов')
  ),
  userId: pipe(
    number('id должен быть числом'),
    integer('id должен быть целым числом')
  )
})

export type TelegramProfileDTO = InferInput<typeof TelegramProfileSchema>