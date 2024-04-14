from django.contrib import admin

from .models import News, Comment


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'rating', 'pub_date')
    search_fields = ('title', 'author')
    list_filter = ('pub_date', 'author', 'rating')
    date_hierarchy = 'pub_date'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('news', 'author', 'content_preview', 'pub_date', 'parent')
    search_fields = ('news__title', 'author', 'content')
    list_filter = ('pub_date', 'author', 'news')
    raw_id_fields = ('news', 'parent')

    def content_preview(self, obj):
        return obj.content[:30] + '...'
    content_preview.short_description = 'Content'
