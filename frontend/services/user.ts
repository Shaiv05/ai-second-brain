import api from "./api";

export const fetchMe = async (token: string) => {
  const res = await api.get("/auth/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};