from django.contrib import admin
from django.contrib.auth.models import User, Group

from .models import News, Comment


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'rating', 'date_time')
    search_fields = ('title', 'author')
    list_filter = ('date_time', 'author', 'rating')
    date_hierarchy = 'date_time'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('news', 'author', 'content_preview', 'date_time')
    search_fields = ('news__title', 'author', 'content')
    list_filter = ('date_time', 'author', 'news')
    raw_id_fields = ('news',)

    def content_preview(self, obj):
        return obj.content[:30] + '...'
    content_preview.short_description = 'Предварительный просмотр контента'


admin.site.unregister(User)
admin.site.unregister(Group)
