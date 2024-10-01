import { ImageUrl, Post } from '@/types/domain';
import axiosInstance from './axios';

type RequestCreatePost = Omit<Post, 'id'> & { imageUrls: ImageUrl[] };

type ResponsePost = Post & { images: ImageUrl[] };

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const { data } = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = ResponsePost & { isFavorite: boolean };

// NOTE : 게시글 하나를 가져오는 API
const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

// NOTE : 게시글 목록을 가져오는 API
const getPosts = async (page: number = 1): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

export { createPost, getPost, getPosts };
export type { ResponsePost, RequestCreatePost, ResponseSinglePost };
