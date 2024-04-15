# Профильное задание «Hacker News»

# Стек технологий
[![React](https://shields.io/badge/react-464646?logo=react&style=flat-square)](https://react.dev/)
[![Python](https://img.shields.io/badge/-Python-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/-Django-464646?style=flat-square&logo=Django)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/-Django%20REST%20Framework-464646?style=flat-square&logo=Django%20REST%20Framework)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-464646?style=flat-square&logo=PostgreSQL)](https://www.postgresql.org/)
[![Nginx](https://img.shields.io/badge/-NGINX-464646?style=flat-square&logo=NGINX)](https://nginx.org/ru/)
[![gunicorn](https://img.shields.io/badge/-gunicorn-464646?style=flat-square&logo=gunicorn)](https://gunicorn.org/)
[![docker](https://img.shields.io/badge/-Docker-464646?style=flat-square&logo=docker)](https://www.docker.com/)

# Kак запустить

### Клонируем проект:
```shell
git clone https://github.com/94R1K/vk_hacker_news.git
```

### Открываем консоль в проекте и переходим в папку «infra»:
```shell
cd infra
```

### Запускаем docker-compose с помощью команды:
```shell
docker-compose up -d
```
или
### для macOS/Linux систем:
```shell
sudo docker-compose up -d
```
### После запуска всех контейнеров нужно применить миграции и создать суперпользователя:
```shell
docker-compose exec -T backend python manage.py migrate
```
```shell
docker-compose exec -T backend python manage.py createsuperuser
```
## Бывает, что создать суперпользователя командой, описанной выше - нельзя :0
### Альтернативный вариант создания суперпользователя:

### Отображаем список работающих контейнеров:
```shell
sudo docker container ls
```

## Отобразятся запущенные контейнеры:
| CONTAINER ID  | IMAGE           | COMMAND                | CREATED       | STATUS                   | PORTS   | NAMES      |
|---------------|-----------------|------------------------|---------------|--------------------------|---------|------------|
| 8021345d9138  | nginx:1.19.3    | "/docker-entrypoint.…" | 7 minutes ago | Exited (0) 7 minutes ago |         | nginx_1    |
| d3eb395676c6  | backend:latest  | "/entrypoint.sh /bin…" | 7 minutes ago | Exited (0) 7 minutes ago |         | backend_1  |
| 2a0bf05071ba  | postgres:12.4   | "docker-entrypoint.s…" | 8 minutes ago | Exited (0) 8 minutes ago |         | db_1       |
| 7caa47e8ad7e  | frontend:latest | "docker-entrypoint.s…" | 8 minutes ago | Exited (0) 8 minutes ago |         | frontend_1 |

### Необходимо выбрать ID контейнера с бекендом для создания суперпользователя:
```shell
sudo docker exec -it d3eb395676c6 python manage.py createsuperuser
```

### Главная страница доступна по адресу:
```link
http://localhost/
```

### Админ-панель доступна по адресу:
```link
http://localhost/admin/
```

# Ура! Можно тестировать проект 🙌

# Об авторе
Лошкарев Ярослав Эдуардович \
Россия, г. Москва \
E-mail: yaluv.py@yandex.ru 

[![VK](https://img.shields.io/badge/Вконтакте-%232E87FB.svg?&style=for-the-badge&logo=vk&logoColor=white)](https://vk.com/yalluv)
[![TG](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/yallluv)
