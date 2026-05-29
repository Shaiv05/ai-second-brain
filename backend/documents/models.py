from django.conf import settings
from django.db import models


class Document(models.Model):
    FILE_TYPE_CHOICES = [
        ("pdf", "PDF"),
        ("txt", "Text"),
        ("docx", "DOCX"),
        ("link", "Link"),
        ("note", "Note"),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="documents",
    )
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="documents/", blank=True, null=True)
    file_type = models.CharField(max_length=20, choices=FILE_TYPE_CHOICES)
    source_url = models.URLField(blank=True, null=True)
    raw_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Document(models.Model):

    user = models.ForeignKey(

        settings.AUTH_USER_MODEL,

        on_delete=models.CASCADE,

        related_name="documents"

    )

    title = models.CharField(max_length=255)

    file = models.FileField(upload_to="documents/")

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.title