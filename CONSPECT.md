## Структура проекта и назначение файлов

Проект представляет собой **SvelteKit‑приложение** для интерактивного обучения языку жестов с использованием камеры и ИИ. Ниже перечислены основные директории и файлы с пояснениями.

---

## Корень репозитория

- **`README.md`**: общее описание проекта и кейса, требования к результату, команды для запуска и миграций.
- **`.gitignore`**: список файлов и директорий, которые не должны попадать в git (сборки, временные файлы и т.п.).
- **`frontend/`**: основной фронтенд‑проект на SvelteKit (вся клиентская логика, маршруты, стили и статика).

---

## Папка `frontend` (фронтенд‑приложение)

### Конфигурация и инфраструктура

- **`frontend/package.json`**: метаданные фронтенд‑проекта, список зависимостей, npm‑скрипты (`dev`, `build`, `check`, миграции БД и т.д.).
- **`frontend/tsconfig.json`**: общие настройки TypeScript для фронтенда (таргет, пути, строгий режим и т.п.).
- **`frontend/vite.config.ts`**: конфигурация Vite (сборщик, плагины SvelteKit/Tailwind, алиасы путей).
- **`frontend/svelte.config.js`**: конфигурация SvelteKit (адаптер, папка `src`, настройки препроцессоров и т.п.).
- **`frontend/eslint.config.js`**: правила линтинга кода (ESLint + интеграция со Svelte/TypeScript).
- **`frontend/.svelte-kit/`**: служебная директория SvelteKit с **сгенерированным кодом и типами**:
  - `types/src/routes/**/$types.d.ts`, `ambient.d.ts`, `non-ambient.d.ts`, `route_meta_data.json` — типы и метаданные маршрутов, генерируемые фреймворком.
  - `generated/client/**`, `generated/server/internal.js`, `generated/root.js`, `generated/root.svelte` — собранные клиентские и серверные модули приложения.
  - `tsconfig.json` (внутри `.svelte-kit`) — локальные TS‑настройки для сгенерированного кода.  
  > Эти файлы **не редактируются вручную**, а обновляются командой `npm run dev` / `npm run build` / `npm run check`.

---

## Папка `frontend/src` — исходный код приложения

### Общие файлы

- **`src/app.html`**: базовый HTML‑шаблон приложения SvelteKit (корневой `<body>`, подключение сборки).
- **`src/app.d.ts`**: глобальные типы TypeScript для проекта (расширение `App`‑namespace и др.).
- **`src/lib/index.ts`**: центральная точка экспорта общих утилит/компонентов/типов из `lib` (упрощение импорта по коротким путям).

---

## Маршруты SvelteKit (`frontend/src/routes`)

### Общий layout

- **`src/routes/+layout.ts`**: корневой layout‑контроллер (загрузка общих данных, настройка layout для всех страниц).
- **`src/routes/(app)/+layout.svelte`**: визуальный layout для группы маршрутов `(app)` (общий каркас публичной части: шапка, подвал, контейнеры).
- **`src/routes/lk/+layout.svelte`**: layout личного кабинета (`lk`), задаёт общий вид и структуру страниц кабинета.

### Публичные страницы `(app)`

- **`src/routes/(app)/+page.svelte`**: главная маркетинговая/публичная страница приложения (лендинг с описанием платформы).
- **`src/routes/(app)/login/+page.svelte`**: страница авторизации пользователя (форма логина).
- **`src/routes/(app)/auth/+page.server.ts`**: серверная логика для авторизации (проверка учетных данных, выдача токенов/сессий).
- **`src/routes/(app)/logout/+page.ts`**: клиентский обработчик выхода (редиректы, очистка клиентского состояния).
- **`src/routes/(app)/logout/+page.server.ts`**: серверная часть выхода из системы (очистка cookie/сессии).
- **`src/routes/(app)/decoder/+page.svelte`**: страница «декодера» жестов (отображение и расшифровка распознанных жестов).
- **`src/routes/(app)/recognizer/+page.svelte`**: страница‑распознаватель жестов (интерфейс с камерой, тренажёр распознавания).

### Личный кабинет `lk`

- **`src/routes/lk/courses/+page.svelte`**: страница списка курсов (каталог учебных курсов по языку жестов).
- **`src/routes/lk/dict/+page.svelte`**: страница словаря жестов для пользователя (интерфейс поиска и просмотра жестов).
- **`src/routes/lk/dict/+page.server.ts`**: серверная логика словаря (загрузка списка жестов, фильтрация, подготовка данных).

#### Раздел уроков `lk/lessons`

- **`src/routes/lk/lessons/+page.svelte`**: страница общего списка уроков (каталог всех доступных уроков).
- **`src/routes/lk/lessons/+page.server.ts`**: серверная логика загрузки уроков (получение списка из БД/API).
- **`src/routes/lk/lessons/page.ts`**: кастомный обработчик переходов/пагинации по урокам (например, параметры запроса, пагинация).
- **`src/routes/lk/lessons/[slug]/+page.svelte`**: детальная страница одного урока (контент конкретного урока по `slug`).

#### Раздел тренажёров `lk/train`

- **`src/routes/lk/train/+page.svelte`**: список/меню тренажёров в личном кабинете.
- **`src/routes/lk/train/rain/+page.svelte`**: тренажёр формата «дождь из символов» (игровой режим отработки жестов/символов).
- **`src/routes/lk/train/sprint/+page.svelte`**: спринт‑тренировка (быстрая серия заданий по жестам/символам).
- **`src/routes/lk/train/sprint-time/+page.svelte`**: спринт по времени (ограничение по таймеру, оценка скорости и точности).

### Камера

- **`src/routes/camera/+page.svelte`**: отдельная страница работы с камерой (предпросмотр, настройка, тест съёмки для распознавания).

### API‑маршруты

- **`src/routes/api/guests/+server.ts`**: REST‑эндпоинт для работы с гостями (создание/чтение списка гостей).
- **`src/routes/api/guests/[id]/+server.ts`**: эндпоинт для операций над конкретным гостем по `id` (получение/обновление/удаление).
- **`src/routes/api/cources/+server.ts`**: эндпоинт для работы с курсами (список/создание курсов); опечатка в названии (`cources` вместо `courses`), но это часть текущего API.

---

## Папка `frontend/src/lib` — общие модули и библиотека

### Действия (actions)

- **`src/lib/actions/clickOutside.ts`**: Svelte‑action для обработки клика вне элемента (закрытие модалок, дропдаунов и т.п.).

### Хранилища (stores)

- **`src/lib/stores/authStore.ts`**: состояние авторизации пользователя (токен, данные пользователя, статус входа).
- **`src/lib/stores/settingsStore.ts`**: пользовательские настройки (тема, язык, параметры обучения и др.).
- **`src/lib/stores/notifyStore.ts`**: хранилище уведомлений (уведомления, ошибки, статусы операций).
- **`src/lib/stores/categoryStore.ts`**: состояние категорий/разделов (например, категории товаров/курсов).
- **`src/lib/stores/attributesStore.ts`**: хранилище атрибутов (характеристики сущностей: фильтры, опции и т.п.).

### Интерфейсы и типы

- **`src/lib/interfaces/frame-data.interface.ts`**: интерфейс данных кадра с камеры/ИИ (координаты точек, результаты распознавания и т.д.).

### Работа с БД (Drizzle / PostgreSQL)

- **`src/lib/db/drizzle.config.ts`**: конфигурация Drizzle‑ORM (подключение к БД, пути миграций).
- **`src/lib/db/db-config.ts`**: общая конфигурация подключения к базе данных (строка подключения, параметры PG‑клиента).
- **`src/lib/db/connection.provider.ts`**: провайдер соединения с БД (создание и переиспользование подключений).
- **`src/lib/db/entities/guest.entity.ts`**: описание таблицы/сущности гостя (структура полей, типы).
- **`src/lib/db/repositories/guests.repository.ts`**: репозиторий для работы с гостями (запросы к БД, CRUD‑операции).
- **`src/lib/db/migration.ts`**: скрипт применения миграций Drizzle (запуск `migration:push` и управление схемой).

### Плагины API‑клиента

- **`src/lib/plugins/api/index.ts`**: базовая настройка API‑клиента (общий инстанс, базовый URL, interceptors).
- **`src/lib/plugins/api/modules/index.ts`**: агрегатор/реестр модулей API (собирает все модули в один объект для удобства импорта).
- **`src/lib/plugins/api/modules/auth.ts`**: функции для авторизации (логин, логаут, обновление токена).
- **`src/lib/plugins/api/modules/users.ts`**: методы работы с пользователями (профиль, список, обновление).
- **`src/lib/plugins/api/modules/feedback.ts`**: отправка и получение отзывов пользователей.
- **`src/lib/plugins/api/modules/settings.ts`**: работа с настройками приложения через API.
- **`src/lib/plugins/api/modules/categories.ts`**: запросы к категориям (получение/создание/изменение категорий).
- **`src/lib/plugins/api/modules/attributes.ts`**: работа с атрибутами сущностей (фильтры, теги, характеристики).
- **`src/lib/plugins/api/modules/ingredients.ts`**: API для ингредиентов (если используется контекст питания/рецептов).
- **`src/lib/plugins/api/modules/orders.ts`**: операции с заказами (создание, получение, изменение).
- **`src/lib/plugins/api/modules/combos.ts`**: работа с комбо‑предложениями (составные продукты/наборы).
- **`src/lib/plugins/api/modules/coupons.ts`**: управление купонами/промокодами.
- **`src/lib/plugins/api/modules/promos.ts`**: промо‑акции и маркетинговые активности.
- **`src/lib/plugins/api/modules/pick-points.ts`**: пункты самовывоза (адреса, список, детали).
- **`src/lib/plugins/api/modules/positions.ts`**: позиции (товары/услуги) в системе.
- **`src/lib/plugins/api/modules/supplements.ts`**: дополнительные продукты/добавки.
- **`src/lib/plugins/api/modules/uploads.ts`**: загрузка файлов (медиа, документы).

> Модули API структурированы по доменам и оборачивают HTTP‑запросы к backend‑сервису.

### Утилиты и вспомогательные данные

- **`src/lib/assets/data/lessons.js`**: статические данные/описания уроков (метаданные для раздела `lessons`).
- **`src/lib/assets/ts/weekdays.ts`**: список/утилита для работы с днями недели.
- **`src/lib/assets/utils/colored-log.ts`**: логирование в консоль с цветами (более наглядные логи).
- **`src/lib/assets/utils/debounce.ts`**: утилита `debounce` (ограничение частоты вызовов функций).
- **`src/lib/assets/utils/formatDateTime.js`**: форматирование даты и времени для UI.
- **`src/lib/assets/utils/maskedPhone.ts`**: утилита маскированного ввода телефона.
- **`src/lib/assets/utils/pagination.ts`**: вычисления для пагинации (страницы, лимиты, смещения).
- **`src/lib/assets/utils/searchParams.ts`**: работа с параметрами URL (чтение/запись строк запроса).
- **`src/lib/assets/css/app.css`**: специфические стили приложения (компонентные/страничные стили).
- **`src/lib/assets/css/global.css`**: глобальные CSS‑стили (ресеты, базовая типографика, общие классы).

### Общие UI‑компоненты

- **`src/lib/components/Header.svelte`**: верхняя панель/шапка сайта (логотип, навигация).
- **`src/lib/components/Footer.svelte`**: футер сайта (копирайт, ссылки, контакты).
- **`src/lib/components/Pagination.svelte`**: компонент пагинации (кнопки перехода по страницам).
- **`src/lib/components/general/NCIconSvg.svelte`**: универсальный компонент для вывода SVG‑иконок.
- **`src/lib/components/general/NCLoading.svelte`**: индикатор загрузки (спиннер/скелетон).
- **`src/lib/components/general/select/NCSelect.svelte`**: универсальный селект (выпадающий список).
- **`src/lib/components/general/dropdown/NCDropdown.svelte`**: дропдаун‑меню (контекстные списки действий).
- **`src/lib/components/general/tabs/NCTabs.svelte`**: контейнер вкладок (панель табов).
- **`src/lib/components/general/tabs/NCTabItem.svelte`**: отдельный элемент вкладки.

### Формы и элементы ввода

- **`src/lib/components/form/Button.svelte`**: универсальная кнопка (варианты, размеры, состояния).
- **`src/lib/components/form/Alert.svelte`**: компонент оповещений/сообщений.
- **`src/lib/components/form/NCInput.svelte`**: текстовый инпут.
- **`src/lib/components/form/NCErrorInput.svelte`**: инпут с отображением ошибок валидации.
- **`src/lib/components/form/NCTextArea.svelte`**: многострочное текстовое поле.
- **`src/lib/components/form/NCSearch.svelte`**: поисковое поле с доп. функциональностью.
- **`src/lib/components/form/NCCheckbox.svelte`**: чекбокс.
- **`src/lib/components/form/NCCodeInput.svelte`**: ввод кода/OTP (несколько ячеек).
- **`src/lib/components/form/NCDropdown.svelte`**: dropdown‑компонент для выбора значения.
- **`src/lib/components/form/NCTimePicker.svelte`**: выбор времени (часы/минуты).
- **`src/lib/components/form/NCTimeScroll.svelte`**: скролл‑список выбора времени.
- **`src/lib/components/form/NumberInput.svelte`**: числовой инпут.
- **`src/lib/components/form/Switch.svelte`**: переключатель (toggle).
- **`src/lib/components/form/StatusNotification.svelte`**: отображение статуса операции (успех/ошибка/информация).

### Модальные окна

- **`src/lib/components/modals/UserModal.svelte`**: модалка профиля пользователя (просмотр/изменение данных).
- **`src/lib/components/modals/UserEditModal.svelte`**: модальное окно редактирования пользователя.
- **`src/lib/components/modals/AuthModal.svelte`**: модальное окно авторизации/регистрации.
- **`src/lib/components/modals/AdminModal.svelte`**: административная модалка (доп. настройки/операции).

### Контентные блоки лендинга

- **`src/lib/components/about/About.svelte`**: блок «О проекте/команде» на лендинге.
- **`src/lib/components/platform/Platform.svelte`**: секция с описанием платформы и её функций.
- **`src/lib/components/benefit/Benefit.svelte`**: блок преимуществ/выгод использования платформы.
- **`src/lib/components/learningTools/LearningTools.svelte`**: секция «инструменты обучения».
- **`src/lib/components/learningTools/ToolCard.svelte`**: карточка отдельного инструмента/модуля.
- **`src/lib/components/courses/CourseCard.svelte`**: карточка курса (название, описание, статус).
- **`src/lib/components/feedback/Feedback.svelte`**: блок отзывов пользователей.
- **`src/lib/components/faq/FAQ.svelte`**: секция «Часто задаваемые вопросы».
- **`src/lib/components/faq/AccordionItem.svelte`**: отдельный элемент аккордеона в FAQ.
- **`src/lib/components/team/Team.svelte`**: блок команды (участники проекта).
- **`src/lib/components/team/StatisticCard.svelte`**: карточка статистики/достижений команды или платформы.

### AI‑компоненты и работа с жестами

- **`src/lib/components/ai/AICamera.svelte`**: компонент камеры с интеграцией ИИ‑моделей (захват кадра, передача в модель).
- **`src/lib/components/ai/Recognizer.svelte`**: компонент распознавания жестов (взаимодействует с моделью, показывает результаты).
- **`src/lib/components/ai/DactilGame.svelte`**: игра по отработке дактильной азбуки (буквы руками).
- **`src/lib/components/ai/RainGame.svelte`**: игровой режим «дождь» (летящие символы/жесты, которые нужно успеть «считать»).
- **`src/lib/components/ai/SprintGame.svelte`**: спринт‑игра на скорость распознавания/выполнения жестов.
- **`src/lib/components/ai/Drawer.svelte`**: компонент отрисовки/оверлея поверх видео (подсветка скелета, зон, подсказок).
- **`src/lib/components/ai/DemoTree.svelte`**: демонстрационный компонент/сценарий работы дерева решений или пайплайна ИИ.

---

## Папка `frontend/static` — статические ресурсы

- **`static/dactyls/*.svg`**: изображения дактильной азбуки (буквы руками), используются в играх/уроках.
- **`static/icons/*.svg`**: набор иконок интерфейса (логотипы, иконки разделов, соцсети, кнопки, управление).
  - Например: `logo.svg`, `light-logo.svg`, `courses.svg`, `tests.svg`, `dict.svg`, `books.svg`, `interactive.svg`, `literature.svg`, `motivation.svg`, `vk.svg`, `telegram.svg`, `sign-lang-logo.svg`, `plus.svg`, `minus.svg`, `play.svg`, `exit.svg`, `remove.svg`, `cup.svg` и др.
- **`static/images/*.svg`**: фоновые и иллюстративные изображения для лендинга и разделов (`bg-feedback.svg`, `background-team.svg`, `background-cloud.svg`, `bg_platform.svg` и т.п.).
- **`static/models/vision_wasm_internal.js`**: вспомогательный скрипт для vision‑модели в браузере (взаимодействие с WASM‑моделью компьютерного зрения).
- **`static/ort/*`**: набор бандлов `onnxruntime-web`:
  - файлы `ort.wasm*`, `ort.webgpu*`, `ort.webgl*`, `ort.node*`, `ort.all*`, `ort.mjs/js`, `*.bundle.min.mjs(.map)` — разные сборки и backends ONNX Runtime для работы ИИ‑моделей (CPU, WebGL, WebGPU, WASM).  
  Эти файлы предоставляют низкоуровневую инфраструктуру выполнения моделей в браузере.

---

## Итог

Данный конспект отражает **текущую структуру фронтенд‑проекта**: маршруты SvelteKit, общие компоненты, игровую/ИИ‑логику, работу с БД и статикой.  
Если нужно, можно дополнительно углубиться в **какой‑то конкретный модуль** (например, игру или API‑модуль) и расписать уже внутреннюю структуру и ключевые функции.

