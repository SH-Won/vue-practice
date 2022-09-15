import AxiosClient from "."

export const getArticles = async () =>{
    const response = await AxiosClient.get('api/posts/article');
    return response.data;
}
export const getDetailArticle = async (articleId) =>{
    const response = await AxiosClient.get(`/api/posts/detailArticle?articleId=${articleId}`);
    return response.data;
}