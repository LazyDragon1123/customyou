from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin

from .models import Daily, Evaluation

admin.site.register(Evaluation)
admin.site.register(Daily, MarkdownxModelAdmin)