from django.contrib import admin

from .models import Daily, Evaluation

admin.site.register(Evaluation)
admin.site.register(Daily)