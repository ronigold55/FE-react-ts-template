// import * as React from 'react';
// import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';

// function Content() {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const page = parseInt(query.get('page') || '1', 10);
//   return (
//     <Pagination
//       page={page}
//       count={10}
//       renderItem={(item) => (
//         <PaginationItem
//           component={Link} 
//           to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
//           {...item}
//         />
//       )}
//     />
//   );
// }

// export default function PaginationLink() {
//   return (
//     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
//       <Routes>
//         <Route path="*" element={<Content />} />
//       </Routes>
//     </MemoryRouter>
//   );
// }

import React, {  } from "react";
import PropTypes from "prop-types";

 interface Props {
    currentPage: number;
    totalPages: number;
    handleNextPage: (page: number) => void;
    handlePrevPage: (page: number) => void;
  }
const AppPagination:React.FC <Props>= ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination-button-wrapper">
      <button
        className="pagination-button"
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        &larr;
      </button>

      <span className="pagination-page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
       
      </button>
    </div>
  );
};

AppPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePrevPage: PropTypes.func.isRequired,
    handleNextPage: PropTypes.func.isRequired,
  };

export default AppPagination