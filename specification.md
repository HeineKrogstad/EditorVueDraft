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

### 2. Черновики (Drafts)

#### 2.1 Создать черновик
**POST** `/draft`

- **Описание**: Создает новый черновик. В процессе создания черновика автоматически создаются связанные вложения и узел.
- **Параметры**:
  - **Тело запроса** (JSON):
```json
{

}
```
- **Ответ**:
- **Статус**: `201 Created`
- **Тело**: JSON-объект, представляющий созданный черновик вместе с вложениями и узлом
```json

```

#### 2.2 Получить все черновики
**GET** `/drafts`

- **Описание**: Возвращает массив объектов всех черновиков.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив черновиков
```json
[
  {
    "id_draft": "b89d3b5c-ef05-42d1-b169-fe6099098f95",
    "id_node": 2,
    "id_project": 2,
    "id_user_profile": null,
    "jcontent": [
        {
            "type": "heading",
            "attrs": {
                "textAlign": "left",
                "level": 2
            },
            "content": [
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "textStyle",
                            "attrs": {
                                "fontFamily": null,
                                "color": "#5b21b6"
                            }
                        }
                    ],
                    "text": "10.07.24"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Вот что то такое сделал ? Практические примеры и проекты на Go"
                }
            ]
        }
    ],
    "hcontent": "public",
    "rubric": "public",
    "dt_create": "2028-02-06T23:59:31.818Z"
  }
]
```

#### 2.3 Получить черновики по проекту
**GET** `/projects/{projectId}/drafts`

- **Описание**: Возвращает массив объектов черновиков для конкретного проекта.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив черновиков для указанного проекта
```json
[
  {
    "id_draft": "b89d3b5c-ef05-42d1-b169-fe6099098f95",
    "id_node": 2,
    "id_project": 2,
    "id_user_profile": null,
    "jcontent": [
        {
            "type": "heading",
            "attrs": {
                "textAlign": "left",
                "level": 2
            },
            "content": [
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "textStyle",
                            "attrs": {
                                "fontFamily": null,
                                "color": "#5b21b6"
                            }
                        }
                    ],
                    "text": "10.07.24"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Вот что то такое сделал ? Практические примеры и проекты на Go"
                }
            ]
        }
    ],
    "hcontent": "public",
    "rubric": "public",
    "dt_create": "2028-02-06T23:59:31.818Z"
  }
]
```

#### 2.4 Получить черновики по проекту с пагинацией
**GET** `/projects/{projectId}/drafts?limit={limit}&offset={offset}`

- **Описание**: Возвращает список черновиков для конкретного проекта с поддержкой пагинации.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
  - `limit` (integer, optional): Максимальное количество черновиков, которое будет возвращено. По умолчанию - 10.
  - `offset` (integer, optional): Количество пропущенных записей перед началом возврата результатов. По умолчанию - 0.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив черновиков для указанного проекта с поддержкой пагинации.
```json
{
  "drafts": [
    {
      "id_draft": "b89d3b5c-ef05-42d1-b169-fe6099098f95",
      "id_node": 2,
      "id_project": 2,
      "id_user_profile": null,
      "jcontent": [
          {
              "type": "heading",
              "attrs": {
                  "textAlign": "left",
                  "level": 2
              },
              "content": [
                  {
                      "type": "text",
                      "marks": [
                          {
                              "type": "textStyle",
                              "attrs": {
                                  "fontFamily": null,
                                  "color": "#5b21b6"
                              }
                          }
                      ],
                      "text": "10.07.24"
                  }
              ]
          },
          {
              "type": "paragraph",
              "attrs": {
                  "textAlign": "left"
              },
              "content": [
                  {
                      "type": "text",
                      "text": "Вот что то такое сделал ? Практические примеры и проекты на Go"
                  }
              ]
          }
      ],
      "hcontent": "public",
      "rubric": "public",
      "dt_create": "2028-02-06T23:59:31.818Z"
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

#### 2.5 Удалить черновик
**DELETE** `/draft/{draftId}`

- **Описание**: Удаляет черновик по его UUID, а также автоматически удаляет все связанные с ним узел и вложения.
- **Параметры**:
  - `draftId` (UUID, обязательный): UUID черновика
- **Ответ**:
  - **Статус**: `204 No Content`
  - **Тело**: Нет

#### 2.6 Получить черновики проекта по рубрике
**GET** `/projects/{projectId}/drafts?rubric={rubric}`

- **Описание**: Возвращает список черновиков для конкретного проекта, фильтруя их по указанной рубрике.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
  - `rubric` (string, обязательный): Значение рубрики. Возможные значения:
    - `private` (Личный)
    - `protected` (Командный)
    - `public` (Публичный)
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив черновиков для указанного проекта и рубрики
```json
[
  {
    "id_draft": "b89d3b5c-ef05-42d1-b169-fe6099098f95",
    "id_node": 2,
    "id_project": 2,
    "id_user_profile": null,
    "jcontent": [
        {
            "type": "heading",
            "attrs": {
                "textAlign": "left",
                "level": 2
            },
            "content": [
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "textStyle",
                            "attrs": {
                                "fontFamily": null,
                                "color": "#5b21b6"
                            }
                        }
                    ],
                    "text": "10.07.24"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Вот что то такое сделал ? Практические примеры и проекты на Go"
                }
            ]
        }
    ],
    "hcontent": "public",
    "rubric": "public",
    "dt_create": "2028-02-06T23:59:31.818Z"
  }
]
```

#### 2.7 Получить черновики по проекту и рубрике с пагинацией
**GET** `/projects/{projectId}/drafts?rubric={rubric}&limit={limit}&offset={offset}`

- **Описание**: Возвращает список черновиков для конкретного проекта и рубрики с поддержкой пагинации.
- **Параметры**:
  - `projectId` (integer, обязательный): ID проекта
  - `rubric` (string, обязательный): Значение рубрики. Возможные значения:
    - `private` (Личный)
    - `protected` (Командный)
    - `public` (Публичный)
  - `limit` (integer, optional): Максимальное количество черновиков, которое будет возвращено. По умолчанию - 10.
  - `offset` (integer, optional): Количество пропущенных записей перед началом возврата результатов. По умолчанию - 0.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив черновиков для указанного проекта и рубрики с поддержкой пагинации.
```json
{
  "drafts": [
    {
      "id_draft": "b89d3b5c-ef05-42d1-b169-fe6099098f95",
      "id_node": 2,
      "id_project": 2,
      "id_user_profile": null,
      "jcontent": [
        {
          "type": "heading",
          "attrs": {
              "textAlign": "left",
              "level": 2
          },
          "content": [
              {
                "type": "text",
                "marks": [
                {
                  "type": "textStyle",
                  "attrs": {
                    "fontFamily": null,
                    "color": "#5b21b6"
                  }
                }
              ],
              "text": "10.07.24"
            }
          ]
        },
        {
          "type": "paragraph",
          "attrs": {
              "textAlign": "left"
          },
          "content": [
              {
                  "type": "text",
                  "text": "Вот что то такое сделал ? Практические примеры и проекты на Go"
              }
          ]
        }
      ],
      "hcontent": "public",
      "rubric": "public",
      "dt_create": "2028-02-06T23:59:31.818Z"
    }
  ],
  "limit": 10,
  "offset": 20,
  "total": 100
}
```

### 3. Вложения (Attachments)

#### 3.1 Получить вложения по черновику
**GET** `/drafts/{draftId}/attachments`

- **Описание**: Возвращает список вложений для конкретного черновика.
- **Параметры**:
  - `draftId` (UUID, обязательный): UUID черновика
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив вложений для указанного черновика
```json
[
  {
    "id_attachment": 1,
    "id_draft": "de3fc379-f932-4629-b0ec-1fe33b29839c",
    "id_tp_attachment": 1,
    "amount": 3
  },
  {
    "id_attachment": 3,
    "id_draft": "de3fc379-f932-4629-b0ec-1fe33b29839c",
    "id_tp_attachment": 2,
    "amount": 5
  }
]
```

### 4. Узлы (Nodes)

#### 4.1 Получить черновик по узлу
**GET** `/nodes/{nodeId}/draft`

- **Описание**: Возвращает черновик, связанный с конкретным узлом.
- **Параметры**:
  - `nodeId` (integer, обязательный): ID узла
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-объект, представляющий черновик
```json
{
    "id_draft": "b89d3b5c-ef05-42d1-b169-fe6099098f95",
    "id_node": 2,
    "id_project": 2,
    "id_user_profile": null,
    "jcontent": [
        {
            "type": "heading",
            "attrs": {
                "textAlign": "left",
                "level": 2
            },
            "content": [
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "textStyle",
                            "attrs": {
                                "fontFamily": null,
                                "color": "#5b21b6"
                            }
                        }
                    ],
                    "text": "10.07.24"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Вот что то такое сделал ? Практические примеры и проекты на Go"
                }
            ]
        }
    ],
    "hcontent": "public",
    "rubric": "public",
    "dt_create": "2028-02-06T23:59:31.818Z"
  }
```

#### 4.2 Получить все узлы
**GET** `/nodes`

- **Описание**: Возвращает список всех узлов.
- **Ответ**:
  - **Статус**: `200 OK`
  - **Тело**: JSON-массив узлов
```json
[
  {
    "id_node": 1,
    "id_tp_node": 2,
    "name": "Узел START",
    "dt_create": null
  },
  {
    "id_node": 2,
    "id_tp_node": 3,
    "name": "Узел FINISH",
    "dt_create": null
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
[
  {
      "id_user_profile": 1,
      "login": "exampleLogin",
      "password": "examplePassword",
      "refresh_token": "exampleRefreshToken",
      "access_token": "exampleAccessToken",
      "dt_reg": "2023-01-01T00:00:00Z",
      "name": "John",
      "suname": "Doe",
      "patronymic": "MiddleName",
      "dt_birth": "1980-01-01",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "sn_links": {
          "facebook": "https://facebook.com/johndoe",
          "twitter": "https://twitter.com/johndoe"
      },
      "href_avatar": "https://example.com/avatar.jpg",
      "is_active": true,
      "is_staff": false,
      "skill": {
          "programming": ["Python", "Go"],
          "languages": ["English", "Spanish"]
      },
      "educations": [],
      "members": [],
      "member_in_projects": [],
      "drafts": [],
      "activities": [],
      "participation_channels": []
  }
]
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
  - `id_user_profile` (integer): Уникальный идентификатор профиля пользователя.
  - `login` (string): Логин пользователя (уникальный).
  - `password` (string): Пароль пользователя.
  - `refresh_token` (string): Токен для обновления сессии.
  - `access_token` (string): Токен доступа.
  - `dt_reg` (datetime): Дата и время регистрации пользователя.
  - `name` (string): Имя пользователя.
  - `suname` (string): Фамилия пользователя.
  - `patronymic` (string): Отчество пользователя.
  - `dt_birth` (date): Дата рождения пользователя.
  - `email` (string): Электронная почта пользователя.
  - `phone` (string): Телефонный номер пользователя.
  - `sn_links` (json): JSON-объект со ссылками на социальные сети.
  - `href_avatar` (string): Ссылка на аватар пользователя.
  - `is_active` (boolean): Признак активности пользователя.
  - `is_staff` (boolean): Признак, является ли пользователь сотрудником.
  - `skill` (json): JSON-объект с компетенциями пользователя.
  - `educations` (array): Список объектов образования пользователя.
  - `members` (array): Список объектов участия пользователя.
  - `member_in_projects` (array): Список объектов участия пользователя в проектах.
  - `drafts` (array): Список черновиков пользователя.
  - `activities` (array): Список активностей пользователя.
  - `participation_channels` (array): Список рубрик участия пользователя.

#### Черновик (Draft)
- **Описание**: Объект черновика.
- **Поля**:
  - `id_draft` (UUID): Уникальный идентификатор черновика.
  - `id_node` (integer): Идентификатор узла, к которому относится черновик.
  - `id_project` (integer): Идентификатор проекта, к которому относится черновик.
  - `id_user_profile` (integer, nullable): Идентификатор профиля пользователя, создавшего черновик.
  - `jcontent` (jsonb): JSON-объект с содержимым черновика.
  - `hcontent` (text): HTML-содержимое черновика.
  - `rubric` (string): Рубрика черновика.
  - `dt_create` (timestamp): Дата и время создания черновика.

#### Вложение (Attachment)
- **Описание**: Объект вложения.
- **Поля**:
  - `id_attachment` (integer): Уникальный идентификатор вложения.
  - `draft` (integer): Идентификатор черновика, к которому относится вложение.
  - `tp_attachment` (integer): Идентификатор типа вложения.
  - `amount` (integer, nullable): Количество вложений, значение по умолчанию `0`.

#### Узел (Node)
- **Описание**: Объект узла.
- **Поля**:
  - `id_node` (integer): Уникальный идентификатор узла.
  - `id_tp_node` (integer): Идентификатор типа узла. Не может быть NULL.
  - `id_parent_node` (integer, nullable): Идентификатор родительского узла. Может быть NULL.
  - `name` (string): Название узла. Не может быть NULL. Максимальная длина - 255 символов.
  - `dt_create` (timestamp, nullable): Дата и время создания узла. Может быть NULL.