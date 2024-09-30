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

export { createPost, getPost };
export type { ResponsePost, RequestCreatePost, ResponseSinglePost };
