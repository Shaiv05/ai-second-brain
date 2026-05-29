from django.contrib import admin

from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "file_type", "created_at", "updated_at")
    list_filter = ("file_type", "created_at")
    search_fields = ("title", "owner__username", "source_url")
