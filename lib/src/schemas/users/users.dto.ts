import {
  integer,
  isoTimestamp,
  minLength,
  number,
  object,
  pipe,
  string,
  boolean,
  regex,
  enum_,
  omit,
  InferInput,
  required,
  partial,
  InferOutput,
  pick,
  date,
  transform,
  optional,
  nullable,
} from 'valibot';
import { VKProfileDTO } from './vk-profile.dto';
import { TelegramProfileDTO } from './telegram-profile.dto';

export enum Roles {
  admin = 'admin',
  staff = 'staff',
  user = 'user',
}

export enum RolesNames {
  admin = 'Админ',
  staff = 'Сотрудник',
  user = 'Клиент',
}

export type RoleValues = `${Roles}`;
enum Notifications {
  Telegram = 'telegram',
  Vk = 'vk',
}
type NotificationValues = `${Notifications}`;

export const UserSchema = object({
  id: pipe(
    number('id должен быть числом'),
    integer('id должен быть целым числом'),
  ),
  firstName: optional(
    nullable(
      pipe(
        string('Вы не указали Имя'),
        minLength(1, 'Должно состоять минимум из 1 символа'),
      ),
    ),
  ),
  lastLogin: date(),
  phone: optional(
    nullable(
      pipe(
        string('Логин должно быть строкой'),
        minLength(1, 'Поле не может быть пустым'),
        regex(/^7\d{10}$/, 'Не валидный формат'),
      ),
    ),
  ),
  isActive: boolean(),
  role: enum_(Roles, 'Некорректно указана роль'),
  createdAt: date(),
  updatedAt: date(),
  notification: optional(
    nullable(enum_(Notifications, 'Некорректно указан тип уведомления')),
  ),
});

export const CreateUserSchema = omit(UserSchema, [
  'id',
  'isActive',
  'createdAt',
  'updatedAt',
  'role',
  'lastLogin',
]);
export type CreateUserDto = InferInput<typeof CreateUserSchema>;

export const UpdateUserSchema = omit(required(partial(UserSchema), ['id']), [
  'lastLogin',
  'updatedAt',
  'createdAt',
]);
export type UpdateUserDto = InferInput<typeof UpdateUserSchema>;

export const DeleteUserSchema = pick(UserSchema, ['id']);
export type DeleteUserDto = InferInput<typeof DeleteUserSchema>;

export type User = Omit<
  InferInput<typeof UserSchema>,
  'role' | 'notification'
> & { role: RoleValues; notification: NotificationValues | null };

export type UserWithVKProfile = User & { vkProfile: VKProfileDTO };
export type UserWithTelegramProfile = User & {
  telegramProfile: TelegramProfileDTO;
};

export type StrategyUserData = {
  providerId: string;
  name?: string;
  phone?: string | null;
};

export const getUsersSchema = object({
  searchQuery: optional(string()),
  limit: optional(pipe(number(), integer())),
  page: optional(pipe(number(), integer())),
  isStaff: optional(boolean()),
});

export type getUsersDto = {
  searchQuery?: string;
  limit?: number;
  page?: number;
  isStaff?: boolean;
};
