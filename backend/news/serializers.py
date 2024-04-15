from rest_framework import serializers

from .models import Comment, News


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = ['id', 'title', 'rating', 'author', 'date_time', 'comments', 'comments_count']
