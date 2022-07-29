# Документация по API

## Модели

UserModel:
```sh
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: '/avatar/default.png'
    }
```
PostModel:
```sh
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String
    }],
    previewUrl: String,
    commentCount: {
        type: Number,
        default: 0
    },
    viewsCount: {
        type: Number,
        default: 0
    }
```
CommentModel:
```sh
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
```

## Пути и медоты
#### _UserRoutes:_
```sh
    Post:
        /login
            Body: {
                email: {
                    type: String,
                    unique: true,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                }
            }
        /register
            Body: {
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    unique: true,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
                avatarUrl: String,
            }
    Get:
        /me
            Header: {
                authorization: {
                    token,
                    required: true
                }
            }
```
/login - используется для аутентификации пользователя путем введения адреса электронный почты и пароля, возвращает объект с данными пользователя и полем "token" с токеном;
/register - используется для регистрации пользователя путем заполнения пользователем формы регистрации, возвращает объект с данными пользователя и полем "token" с токеном;
/me - используется для аутентификации пользователя по токену, токен передается в заголовке в поле "authorization". Возвращает объект с данными пользователя.

#### _PostRoutes:_
```sh
    Post
        /posts
            Header: {
                authorization: {
                    token,
                    required: true
                }
            }
            Body: {
                title: {
                    type: String,
                    required: true
                },
                text: {
                    type: String,
                    required: true,
                    unique: true
                },
                tags: [String],
                previewUrl: String
            }
    Put
        /posts/:id
            Header: {
                authorization: {
                    token,
                    required: true
                }
            }
            Body: {
                title: String,
                text: String,
                tags: [String],
                previewUrl: String
            }
    Delete
        /posts/:id
            Header: {
                authorization: {
                    token,
                    required: true
                }
            }
    Get
        /posts?lastPost=5&limit=5
        /posts/:id
        /posts/tags/:tag
```
Get запросы:
/posts?lastpost=5&limit=5 - limit (количество выводимых статей на страницу), lastpost (порядковый номер последней выведенной статьи). Возвращает массив объектов с данными статьей.
/posts/:id - Возвращает объект с данными статьи.
/posts/tags/:tag - Вывод статей по тегу статьи. Возвращает массив объектов с данными статьей.

Post запрос:
/posts - создание статьи. Возвращает объект с данными статьи.

Put запрос:
/posts/:id - изменение статьи. Возвращает объект:
```sh
{
    success: 'Статья успешно обновлена!'
}
```
Delete запрос:
/posts/:id - удаление статьи. Возвращает объект:
```sh
{
    success: 'Статья успешно удалена!'
}
```
#### _CommentRoutes:_
```sh
Post
    /comments/:postId
        Header: {
            authorization: {
                token,
                required: true
            }
        }
        Body: {
            text: {
                type: String,
                required: true
            }
        }
Delete
    /comments/:id
        Header: {
            authorization: {
                token,
                required: true
            }
        }
Get
    /comments/:postId
    /comments?limit=5
```
Post запрос:
/comments/:postId - создание комментария к статье. Возвращает объект с данными комментария.

Get запросы:
/comments/:postId - Возвращает массив объектов с данными комментариев.
/comments?limit=5 - Возвращает массив с 5 объектами последних комментариев.

Delete запрос:
/comments/:id - Возвращает объект:
```sh
{
    success: 'Комментарий успешно удален!'
}
```

## Используемые библиотеки

- bcrypt
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- nodemon
