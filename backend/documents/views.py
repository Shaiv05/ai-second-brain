from rest_framework import generics, permissions

from .models import Document
from .serializers import DocumentSerializer

from .utils import extract_pdf_text


class DocumentListCreateView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(owner=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        Document = serializer.save(
            owner=self.request.user
        )

    if Document.file:
        try:
            extracted_text = extract_pdf_text(
                Document.file.path
            )

            Document.raw_text = extracted_text
            Document.save()

        except Exception:
            pass


class DocumentDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(owner=self.request.user)
