// src/redux/axiosBaseQuery.ts
import axios from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import { notification } from 'antd';  // Import notification
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/', // Đổi base URL của bạn
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const axiosBaseQuery: BaseQueryFn = async ({ url, method, data }, api, extraOptions) => {
  try {
    // const token = api.getState().auth.token; // Truy cập state từ store thông qua api
    const response = await axiosInstance({
      url,
      method,
      data,
      ...extraOptions, // Truyền các tùy chọn bổ sung vào axios request, ví dụ headers
       // extraOptions có thể được truyền vào đây, ví dụ headers
      //  extraOptions: {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // },
    });
    return { data: response.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;

    // Hiển thị thông báo lỗi thông qua notification
    if (error.response) {
       // Kiểm tra lỗi 401 và chuyển hướng đến trang login
       if (error.response.status === 401) {
        // Điều hướng tới trang login
        // Thông báo lỗi 401
        notification.error({
          message: 'Unauthorized',
          description: 'You need to log in to access this resource.',
          placement: 'topRight',
        });
      } else {
        // Xử lý các lỗi khác
        notification.error({
          message: `Error: ${error.response.status}`,
          // description: error.response.data?.message || 'An error occurred while fetching data.',
          description:  'An error occurred while fetching data.',

          placement: 'topRight',
        });
      }
    } else if (error.request) {
      // Lỗi không có response (ví dụ: không kết nối được server)
      notification.error({
        message: 'Network Error',
        description: 'Unable to reach the server. Please check your network connection.',
        placement: 'topRight',
      });
    } else {
      // Các lỗi khác như cấu hình sai
      notification.error({
        message: 'Error',
        description: `An unexpected error occurred: ${error.message}`,
        placement: 'topRight',
      });
    }

    // Trả về lỗi cho RTK Query để xử lý
    return {
      error: {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message },
      },
    };
  }
};
