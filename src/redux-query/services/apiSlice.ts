import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

// Cấu hình API slice
export const apiSlice = createApi({
  reducerPath: 'api', // Tên của reducer trong store
 
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts', // Endpoint tương ứng với /posts
    }),
    getPostById: builder.query({
      query: (id: number) => `posts/${id}`, // Endpoint tương ứng với /posts/:id
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    getListData: builder.query({
      query: ({ pageSize, pageNumber, searchText }: { pageSize: number, pageNumber: number, searchText: string | undefined }) => {
        // Xây dựng URL với các tham số phân trang và tìm kiếm
        return `posts?_page=${pageNumber}&_limit=${pageSize}&q=${searchText}`;
      },
    }),
  }),
});

// Tự động tạo hooks từ các endpoints
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useGetListDataQuery
} = apiSlice;
