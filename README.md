# Проект: Mesto-React

### Обзор

1. Описание
2. Технологии
3. Figma

**Описание проекта**

* Cервис Mesto - интерактивная страница, куда можно добавлять фотографии, удалять их, ставить лайки и менять аватарку. Все карточки и данные берутся с сервера.

**Использованные технологии**

* Файловая структура по методологии БЭМ.
* HTML, CSS, Java Script.
* Flexbox-верстка, Grid-Layout.
* pop-up - редактирования профиля.
* Медиазапросы и оптимизация под все устройства от 1280 до 320 разрешений.
* Резиновая и адаптивная верстка.
* Использование form.
* Webpack.
* React.
* 10 Спринт: Подключение API, настройка работы попапов, настройка карточек мест
* 11 Спринт: Создание стейта currentUser в корневом компоненте, создайте объекта контекста и использование провайдера,
использование контекста в Main, в Card, добавление поддержки лайков, дизлайков и удаление карточек. Рефакторинг компонента EditProfilePopup,
EditAvatarPopup (использование рефа), AddPlacePopup.
* 12 Спринт: Создание роутов - /sign-up и /sign-in. Верстка необходимов компонентов - Login(компонент авторизации пользователя с необходимыми стейт-переменными), Register(компонент регистрации пользователя с необходимыми стейт-переменными), ProtectedRoute(компонент защиты роута /, чтобы на него не смогли перейти неавторизованные пользователи), InfoTooltip(компонент модального окна, который информирует пользователя об успешной (или не очень) регистрации). Подключение основной функциональности сайта к бэкенду. Реализация аутентификации пользователя а также работы с локальным хранилищем и токеном.

**Figma**
* [Ссылка на макет в Figma 5 спринт](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1)

### Инструкция по развертыванию проекта
#### `npm start`

Запустить проект в режиме разработки
<br>
Для просмотра [откройте](http://localhost:3000/sign-up) в браузере.

#### `npm run build`

Соберет проект в папку `build` для продакшена.
<br />
Сборка минифицирована, имена файлов хэшированы.
<br />
Проект готов к деплою.
