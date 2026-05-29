"use client";

import { useEffect, useState } from "react";
import {
  getDocuments,
  createDocument,
  deleteDocument,
} from "@/services/documents";

type DocumentType = {
  id: number;
  title: string;
  file_type: string;
  raw_text: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const loadDocuments = async () => {
    if (!token) return;

    const data = await getDocuments(token);
    setDocuments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

const handleCreate = async () => {
  if (!token || !title || (!file && !rawText)) return;

  const payload = {
    title,
    file_type: file ? "pdf" : "note",
    raw_text: file ? "" : rawText,
  };

  await createDocument(token, payload);

  setTitle("");
  setRawText("");
  setFile(null);

  loadDocuments();
};

  const handleDelete = async (id: number) => {
    if (!token) return;

    await deleteDocument(token, id);

    loadDocuments();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Documents
      </h1>

      <div className="border border-zinc-800 rounded-xl p-6 mb-8">
        <input
          className="w-full mb-4 bg-zinc-900 p-3 rounded"
          placeholder="Document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-4 bg-zinc-900 p-3 rounded"
          placeholder="Write notes..."
          rows={5}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] || null
          )   
        }
        className="mb-4"
        />

        <button
          onClick={handleCreate}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Save Note
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents yet.</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-zinc-800 rounded-xl p-4"
            >
              <h2 className="font-bold text-lg">
                {doc.title}
              </h2>

              <p className="text-zinc-400 mt-2">
                {doc.raw_text}
              </p>

              <button
                onClick={() =>
                  handleDelete(doc.id)
                }
                className="mt-4 bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}