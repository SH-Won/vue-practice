import AxiosClient from ".";

export const getArticles = async () => {
  const response = await AxiosClient.get("api/posts/article");
  return response.data;
};
export const getDetailArticle = async (articleId) => {
  const response = await AxiosClient.get(
    `/api/posts/detailArticle?articleId=${articleId}`
  );
  return response.data;
};
export const uploadImageMulter = async (data) => {
  const response = await AxiosClient.post("/api/posts/uploadfiles", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
      refreshtoken: localStorage.getItem("refreshToken"),
    },
  });
  return response.data;
};
export const uploadCloudinary = async (data) => {
  const response = await AxiosClient.post("/api/posts/upload", data);
  return response.data;
};

export const uploadArticle = async (data) => {
  const response = await AxiosClient.post("/api/posts/uploadArticle", data);
  return response.data;
};
export const updateArticle = async (data) => {
  const response = await AxiosClient.post("/api/posts/updateArticle", data);
  return response.data;
};
export const deleteArticle = async (data) => {
  const response = await AxiosClient.post("/api/posts/deleteArticle", data);
  return response.data;
};
