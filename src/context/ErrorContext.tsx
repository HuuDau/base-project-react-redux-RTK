/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/ErrorContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

// Định nghĩa kiểu cho lỗi
interface ErrorContextType {
  setError: (error: any) => void;
}
interface ErrorProviderProps {
  children: React.ReactNode; // Thêm kiểu `children` ở đây
}
// Tạo Context
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Tạo hook để sử dụng Context
export const useErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
};

// Tạo ErrorProvider để cung cấp lỗi cho ứng dụng
export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  // Kiểm tra lỗi và hiển thị thông báo
  if (error) {
    if (error.status === 401) {
      // Nếu lỗi 401, điều hướng tới trang đăng nhập
      navigate('/login');
      notification.error({
        message: 'Unauthorized',
        description: 'You need to log in to access this resource.',
        placement: 'topRight',
      });
    } else {
      notification.error({
        message: `Error: ${error.status}`,
        description: error.data?.message || 'An error occurred while fetching data.',
        placement: 'topRight',
      });
    }
  }

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
