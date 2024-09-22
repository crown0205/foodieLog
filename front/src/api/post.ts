import { ImageUrl, Post } from '@/types/domain';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id'> & { images: ImageUrl[] };

type ResponsePost = Post & { images: ImageUrl[] };

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const { data } = await axiosInstance.post('/posts', body);

  return data;
};

export { createPost };
export type { ResponsePost, RequestCreatePost };
