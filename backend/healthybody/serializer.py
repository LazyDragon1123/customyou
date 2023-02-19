from rest_framework import serializers

from .models import Daily, Macho


class DailySerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily
        fields = ("date", "weight", "section", "isOpen")


class DailyListSerializer(serializers.ListSerializer):
    child = DailySerializer()

class MachoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Macho
        fields = ("id", "section")

class MachoListSerializer(serializers.ListSerializer):
    child = MachoSerializer()