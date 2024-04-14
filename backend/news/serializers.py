from rest_framework import serializers
from .models import News, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = ['id', 'title', 'rating', 'author', 'pub_date', 'comments']