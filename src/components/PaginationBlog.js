import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationBlog = ({ currentPage, numPages }) => {
  const [visiblePages, setVisiblePages] = useState([]);
  const next = '>';
  const prev = '<';

  useEffect(() => {
    const generateVisiblePages = () => {
      let pages = [];
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(numPages, currentPage + 2);
      if (startPage > 2 && currentPage !== 1) {
        pages.push('...');
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage + 1 < numPages && currentPage !== numPages) {
        pages.push('...');
      }

      setVisiblePages(pages);
    };

    generateVisiblePages();
  }, [currentPage, numPages]);

  return (
    <Wrapper>
        <nav className='blog-navigation-container'>
        <ul className="pagination">
            {currentPage > 1 && (
              <li>
                <Link to={`/blog/${currentPage === 2 ? "" : currentPage - 1}`}>{prev}</Link>
            </li>
            )}

            {currentPage > 3 && (
                <li>
                    <Link to={`/blog/`}>{currentPage === 2 ? "" : 1}</Link>
                </li>
            )}

            {visiblePages.map((page, index) => (
            <li key={index}>
                {typeof page === 'number' ? (
                <Link to={`/blog/${page === 1 ? "" : page}`} className={page === currentPage ? 'active' : ''}>
                    {page}
                </Link>
                ) : (
                    <span>{page}</span>
                )}
            </li>
            ))}

            {currentPage < numPages  - 2 && (
            <li>
                <Link to={`/blog/${numPages}`}>{numPages}</Link>
            </li>
            )}

            {currentPage < numPages && (
                <li>
                    <Link to={`/blog/${currentPage + 1}`}>
                      {next}
                    </Link>
                </li>
            )}

        </ul>
        </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
.active{
    color: #ff9933 !important;
}

.blog-navigation-container a {
    color:black;
  }

  .blog-navigation-container a:hover {
    color: #ff9933;
  }

  .blog-navigation-container ul {
    list-style-type: none;
    overflow: hidden;
  }

  .blog-navigation-container ul li {
    float: left;
  }

  .blog-navigation-container ul li a {
    display: block;
    text-align: center;
    font-weight: bold;
    padding: 10px;
    font-size: 16px;
  }
  span{
    /* float: left; */
    /* text-align: center; */
    display: block;
    font-weight: bold;
    padding: 13px;
    font-size: 16px;
  }
`
export default PaginationBlog;