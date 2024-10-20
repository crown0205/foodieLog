import { ImageUrl, Post } from '@/types/domain';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id'> & { imageUrls: ImageUrl[] };

type ResponsePost = Post & { images: ImageUrl[] };

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const { data } = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = ResponsePost & { isFavorite: boolean };

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

const getPosts = async (page: number = 1): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

const deletePost = async (id: number): Promise<void> => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUrls: ImageUrl[];
  };
};

const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

const getFavoritePosts = async (page = 1): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(`/favorites/my?page=${page}`);

  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const { data } = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

const getSearchPosts = async (
  page = 1,
  query: string,
): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(
    `/posts/search?query=${query}&page=${page}`,
  );

  return data;
};

type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

type ResponseCalendarPost = Record<number, CalendarPost[]>;

const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const { data } = await axiosInstance.get(
    `/posts/calendar?year=${year}&month=${month}`,
  );

  return data;
};

export {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  getFavoritePosts,
  updateFavoritePost,
  getSearchPosts,
  getCalendarPosts,
};
export type {
  RequestCreatePost,
  ResponsePost,
  ResponseSinglePost,
  RequestUpdatePost,
  CalendarPost,
  ResponseCalendarPost,
};
