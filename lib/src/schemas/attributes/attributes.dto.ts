// import {
//   array,
//   boolean,
//   InferInput,
//   integer,
//   minLength,
//   nullable,
//   number,
//   object,
//   omit,
//   optional,
//   partial,
//   pick,
//   pipe,
//   required,
//   string,
// } from 'valibot';

// export const AttributesSchema = object({
//   id: pipe(
//     number('id должен быть числом'),
//     integer('id должен быть целым числом'),
//   ),
//   name: pipe(
//     string('Вы не указали название'),
//     minLength(1, 'Должно состоять минимум из 1 символа'),
//   ),
//   type: object({
//     name: pipe(
//       string('Вы не указали название'),
//       minLength(1, 'Должно состоять минимум из 1 символа'),
//     ),
//     options: array(
//       object({
//         value: pipe(
//           string('Вы не указали название'),
//           minLength(1, 'Должно состоять минимум из 1 символа'),
//         ),
//         isAvailable: boolean('Значение поля должно быть true или false'),
//       }),
//     ),
//   }),
//   unit: nullable(
//     pipe(
//       string('Вы не указали название'),
//       minLength(1, 'Должно состоять минимум из 1 символа'),
//     ),
//   ),
// });

// //Создание нового аттрибута
// export const CreateAttributeSchema = omit(AttributesSchema, ['id']);

// //Изменение ингредиента
// export const UpdateAttributeSchema = required(partial(AttributesSchema), [
//   'id',
// ]);

// //Удаление аттрибута
// export const DeleteAttributeSchema = pick(AttributesSchema, ['id']);

// //types
// export type AttributesDto = InferInput<typeof AttributesSchema>;
// export type CreateAttributeDto = InferInput<typeof CreateAttributeSchema>;
// export type UpdateAttributeDto = InferInput<typeof UpdateAttributeSchema>;
// export type DeleteAttributeDto = InferInput<typeof DeleteAttributeSchema>;
