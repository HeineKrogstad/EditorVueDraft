# Спецификация REST API

## Endpoints

### 1. Проекты (Projects)

#### 1.1 Получить все проекты
**GET** `/projects`

- **Описание**: Возвращает список всех проектов.
- **Ответ**:
- **Статус**: `200 OK`
- **Тело**: JSON-массив проектов
```json
[
  {
    "id_project": 1,
    "id_category": 1,
    "id_parent_project": null,
    "title": "Car",
    "keywords": "Feil Fall",
    "abbreviation": "UTF8",
    "status": 98910,
    "desc_full": "International",
    "desc_short": "Lead Markets Specialist",
    "category": "2",
    "href_avatar": "https://loremflickr.com/640/480/cats",
    "is_favorites": false,
    "owner": true,
    "name_rev": "88f9b03ed7ee04ec684a61a0fa7adcbf9b3fadb8",
    "dt_start": "2013-06-10T15:27:39.862",
    "dt_end": "1994-02-26T03:46:53.657",
    "last_changed": "2085-09-20T18:16:47.240",
    "last_changed_author": "2014-09-29T06:44:51.954",
    "actions": "Cambridgeshire",
    "tag": {
        "foo": 1941,
        "bar": "LE;$]I&z+?",
        "bike": 70814,
        "a": "*q6|{AZ]Y&",
        "b": "=[dbTQ}\"jX",
        "name": 43481,
        "prop": "EPMGSfYxS`"
    },
    "typeparent": null,
    "onyarmarka": false,
    "goal": "Repellat labore labore aut architecto nulla aspernatur necessitatibus. Quasi similique saepe voluptatum accusantium.",
    "params": {
        "foo": 22674,
        "bar": 4360,
        "bike": 73173,
        "a": 20336,
        "b": "W_,O=qWm>B",
        "name": 87776,
        "prop": "F\\OC&\"=hLR"
    }
  }
]
```

### 2. Посты (Drafts)

#### 2.1 Создать пост
**POST** `/draft`

- **Описание**: Создает новый пост. В процессе создания поста автоматически создаются связанные вложения и узел.
- **Параметры**:
  - **Тело запроса** (JSON):
    ```json
    {
      "content": {},
      "timestamp": "15.07.24",
      "project": 1,
      "channel": "channel_enum_value",  // Значение перечисления, представляющее канал (Личный/Командный/Публичный)
      "user": 1
      "attachments": [
        {
          "path": "/path/to/attachment1",
          "name": "Attachment 1"
        },
        {
          "path": "/path/to/attachment2",
          "name": "Attachment 2"
        }
      ],
      "nodes": [
        {
          "post": 1
        }
      ]
    }
    ```
- **Ответ**:
  - **Статус**: `201 Created`
  - **Тело**: JSON-объект, представляющий созданный пост вместе с вложениями и узлом
  ```json
  {
    "id": 1,
    "content": {},
    "timestamp": "15.07.24",
    "project": 1,
    "channel": "channel_enum_value",  // Значение перечисления, представляющее канал (Личный/Командный/Публичный)
    "user": 1
    "attachments": [
      {
        "id": 1,
        "path": "/path/to/attachment1",
        "name": "Attachment 1"
      },
      {
        "id": 2,
        "path": "/path/to/attachment2",
        "name": "Attachment 2"
      }
    ],
    "nodes": [
      {
        "id": 1,
        "post": 1
      }
    ]
  }
  ```

#### 2.2 Получить все посты
**GET** `/posts`

- **Описание**: Возвращает список всех постов.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив постов
```json
[
    {
        "id": 1,
        "content": {},
        "timestamp": "15.07.24",
        "project": 1,
        "channel": "channel_enum_value",
        "user": 1
    },
    {
        "id": 2,
        "content": {},
        "timestamp": "15.07.24",
        "project": 2,
        "channel": "channel_enum_value",
        "user": 1
    }
]
```

#### 2.3 Получить посты по проекту
**GET** `/projects/{projectId}/posts`

- **Описание**: Возвращает список постов для конкретного проекта.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив постов для указанного проекта
```json
[
    {
        "id": 1,
        "content": {},
        "timestamp": "15.07.24",
        "project": 1,
        "channel": "channel_enum_value",
        "user": 1
    }
]
```

#### 2.4 Получить посты по проекту с пагинацией
**GET** `/projects/{projectId}/posts?limit={limit}&offset={offset}`

- **Описание**: Возвращает список постов для конкретного проекта с поддержкой пагинации.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
  - `limit` (integer, optional): Максимальное количество постов, которое будет возвращено. По умолчанию - 10.
  - `offset` (integer, optional): Количество пропущенных записей перед началом возврата результатов. По умолчанию - 0.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив постов для указанного проекта с поддержкой пагинации.
```json
{
  "posts": [
    {
      "id": 1,
      "content": {},
      "timestamp": "15.07.24",
      "project": 1,
      "channel": "Personal",
      "user": 1
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

#### 2.5 Удалить пост
**DELETE** `/posts/{postId}`

- **Описание**: Удаляет пост по его ID, а также автоматически удаляет все связанные с ним узел и вложения.
- **Параметры**:
  - `postId` (integer, обязательный): ID поста
- **Ответ**:
  - **Статус**: `204 No Content`
  - **Тело**: Нет

#### 2.6 Получить посты проекта по каналу
**GET** `/projects/{projectId}/posts?channel={channel}`

- **Описание**: Возвращает список постов для конкретного проекта, фильтруя их по указанному каналу.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
  - `channel` (string, обязательный): Значение канала. Возможные значения:
    - `Personal` (Личный)
    - `Team` (Командный)
    - `Public` (Публичный)
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив постов для указанного проекта и канала
  ```json
  [
    {
      "id": 1,
      "content": {},
      "timestamp": "15.07.24",
      "project": 1,
      "channel": "Personal",
      "user": 1
    },
    {
      "id": 2,
      "content": {},
      "timestamp": "15.07.24",
      "project": 1,
      "channel": "Personal",
      "user": 1
    }
  ]
  ```

#### 2.7 Получить посты по проекту и каналу с пагинацией
**GET** `/projects/{projectId}/posts?channel={channel}&limit={limit}&offset={offset}`

- **Описание**: Возвращает список постов для конкретного проекта и канала с поддержкой пагинации.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
  - `channel` (string, обязательный): Значение канала. Возможные значения:
    - `Personal` (Личный)
    - `Team` (Командный)
    - `Public` (Публичный)
  - `limit` (integer, optional): Максимальное количество постов, которое будет возвращено. По умолчанию - 10.
  - `offset` (integer, optional): Количество пропущенных записей перед началом возврата результатов. По умолчанию - 0.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив постов для указанного проекта и канала с поддержкой пагинации.
```json
{
  "posts": [
    {
      "id": 1,
      "content": {},
      "timestamp": "15.07.24",
      "project": 1,
      "channel": "channel_enum_value",
      "user": 1
    },
    {
      "id": 2,
      "content": {},
      "timestamp": "15.07.24",
      "project": 1,
      "channel": "channel_enum_value",
      "user": 1
    }
  ],
  "limit": 10,
  "offset": 20,
  "total": 100
}
```

### 3. Вложения (Attachments)

#### 3.1 Получить вложения по посту
**GET** `/posts/{postId}/attachments`

- **Описание**: Возвращает список вложений для конкретного поста.
- **Параметры**:
  - `postId` (integer, обязательный): ID поста
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив вложений для указанного поста
```json
[
    {
        "id": 1,
        "path": "path/to/file",
        "name": "filename.ext",
        "post": 1
    }
]
```

### 4. Узлы (Nodes)

#### 4.1 Получить пост по узлу
**GET** `/nodes/{nodeId}/post`

- **Описание**: Возвращает пост, связанный с конкретным узлом.
- **Параметры**:
  - `nodeId` (integer, обязательный): ID ноды
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-объект, представляющий пост
```json
{
    "id": 1,
    "content": {},
    "timestamp": "15.07.24",
    "project": 1,
    "channel": "channel_enum_value",
    "user": 1
}
```

#### 4.2 Получить все узлы
**GET** `/nodes`

- **Описание**: Возвращает список всех узлов.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив нод
```json
[
    {
        "id": 1,
        "post": 1
    },
    {
        "id": 2,
        "post": 2
    }
]
```

### 5. Пользователи (Users)

#### 5.1 Получить всех пользователей
**GET** `/users`

- **Описание**: Возвращает список всех пользователей.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив всех пользователей.
```json
{
  "users": [
    {
      "id": 1,
      "name": "User 1"
    },
    {
      "id": 2,
      "name": "User 2"
    }
  ]
}
```

### 6. Модели данных

#### Проект (Project)
- **Описание**: Объект проекта.
- **Поля**:
  - `id_project` (integer): Уникальный идентификатор проекта.
  - `id_category` (integer): Идентификатор категории проекта.
  - `id_parent_project` (integer, nullable): Идентификатор родительского проекта (если есть).
  - `title` (string): Название проекта.
  - `keywords` (string): Ключевые слова, связанные с проектом.
  - `abbreviation` (string): Аббревиатура проекта.
  - `status` (integer): Статус проекта.
  - `desc_full` (string): Полное описание проекта.
  - `desc_short` (string): Краткое описание проекта.
  - `category` (string): Категория проекта.
  - `href_avatar` (string): Ссылка на изображение аватара проекта.
  - `is_favorites` (boolean): Признак, является ли проект избранным.
  - `owner` (boolean): Признак, является ли пользователь владельцем проекта.
  - `name_rev` (string): Имя ревизии проекта.
  - `dt_start` (datetime): Дата начала проекта.
  - `dt_end` (datetime): Дата окончания проекта.
  - `last_changed` (datetime): Дата последнего изменения проекта.
  - `last_changed_author` (string): Автор последнего изменения проекта.
  - `actions` (string): Доступные действия для проекта.
  - `tag` (json): JSON-объект с тегами проекта.
  - `typeparent` (integer, nullable): Тип родительского проекта (если есть).
  - `onyarmarka` (boolean): Признак наличия на ярмарке.
  - `goal` (string): Цель проекта.
  - `params` (json): JSON-объект с параметрами проекта.

#### Пользователь (User)
- **Описание**: Объект пользователя.
- **Поля**:
  - `id` (integer): ID пользователя
  - `name` (string): Имя пользователя

#### Пост (Post)
- **Описание**: Объект поста.
- **Поля**:
  - `id` (integer): ID поста
  - `content` (JSON): Содержимое поста
  - `timestamp` (date): Дата создания поста
  - `project` (integer): ID проекта
  - `channel` (enum): Канал. Возможные значения:
    - `Personal` (Личный)
    - `Team` (Командный)
    - `Public` (Публичный)
  - `user` (integer): ID пользователя

#### Вложение (Attachment)
- **Описание**: Объект вложения.
- **Поля**:
  - `id` (integer): ID вложения
  - `path` (string): Путь к файлу
  - `name` (string): Имя файла
  - `post` (integer): ID поста

#### Узел (Node)
- **Описание**: Объект узла.
- **Поля**:
  - `id` (integer): ID узла
  - `post` (integer): ID поста