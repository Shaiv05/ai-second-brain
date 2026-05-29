import api from "./api";

export const getDocuments = async (token: string) => {
  const res = await api.get("/documents/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createDocument = async (
  token: string,
  data: {
    title: string;
    file_type: string;
    raw_text: string;
  }
) => {
  const res = await api.post("/documents/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteDocument = async (
  token: string,
  id: number
) => {
  return api.delete(`/documents/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const uploadDocument = async (
  token: string,
  formData: FormData
) => {
  const res = await api.post(
    "/documents/",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};