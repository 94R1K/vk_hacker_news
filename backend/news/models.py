from django.db import models


class News(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name='Название'
    )
    rating = models.IntegerField(
        default=0,
        verbose_name='Рейтинг'
    )
    author = models.CharField(
        max_length=100,
        verbose_name='Автор'
    )
    date_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата и время публикации'
    )
    comments_count = models.IntegerField(
        default=0,
        verbose_name='Количество комментариев'
    )

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ('-date_time',)

    def __str__(self):
        return self.title

    def update_comments_count(self):
        self.comments_count = self.comments.all().count()
        self.save()


class Comment(models.Model):
    news = models.ForeignKey(
        News,
        related_name='comments',
        on_delete=models.CASCADE,
        verbose_name='Новость'
    )
    author = models.CharField(
        max_length=100,
        verbose_name='Автор'
    )
    content = models.TextField(
        verbose_name='Текст комментария'
    )
    date_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата и время публикации'
    )
    children = models.ManyToManyField(
        'self',
        blank=True,
        verbose_name='Ответы на комментарий'
    )

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        ordering = ('-date_time',)

    def __str__(self):
        return f"{self.author}: {self.content[:30]}..."

    def save(self, *args, **kwargs):
        super(Comment, self).save(*args, **kwargs)
        self.news.update_comments_count()

    def delete(self, *args, **kwargs):
        super(Comment, self).delete(*args, **kwargs)
        self.news.update_comments_count()
