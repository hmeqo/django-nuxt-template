from rest_framework import serializers


class MediaQuery(serializers.Serializer):
    size = serializers.IntegerField(min_value=1, required=False)
