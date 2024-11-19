import { useGetListDataQuery } from '@/redux-query/services/apiSlice';
import React, { useState } from 'react';


const DataTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');

  // Khi pageSize, pageNumber, hoặc searchText thay đổi, hook sẽ tự động gọi lại API.
  const { data, error, isLoading } = useGetListDataQuery({ pageSize, pageNumber, searchText });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPageNumber(1); // Reset lại trang khi thay đổi tìm kiếm
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1); // Tăng pageNumber để chuyển sang trang kế tiếp
  };

  const handlePreviousPage = () => {
    setPageNumber((prev) => prev - 1); // Giảm pageNumber để quay lại trang trước
  };

  if (isLoading) return <div>Loading...</div>;
 
  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post: { id: number, title: string, body: string }) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default DataTable;
