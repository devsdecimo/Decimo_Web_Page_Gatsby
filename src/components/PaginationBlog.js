import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const PaginationBlog = ({ currentPage, numPages }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const generateVisiblePages = () => {
      let pages = [];
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(numPages, currentPage + 2);
      if (startPage > 2 && currentPage !== 1) {
        pages.push("...");
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage + 1 < numPages && currentPage !== numPages) {
        pages.push("...");
      }

      setVisiblePages(pages);
    };

    generateVisiblePages();
  }, [currentPage, numPages]);

  return (
    <Wrapper>
      <nav className="blog-navigation-container">
        {numPages !== 1 && (
          <ul className="pagination">
            {currentPage > 1 && (
              <li className="paginator">
                <Link to={`/blog/${currentPage === 2 ? "" : currentPage - 1}`}>
                  <svg
                    width="6"
                    height="11"
                    viewBox="0 0 6 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.20626 4.85072C0.0256407 5.03134 0.0256407 5.32413 0.20626 5.50474L4.92154 10.22C5.10215 10.4006 5.39494 10.4006 5.57556 10.22L5.79361 10.002C5.97423 9.82137 5.97423 9.52854 5.79361 9.34792L1.6234 5.17773L5.79361 1.00752C5.97423 0.8269 5.97423 0.53411 5.79361 0.353492L5.57556 0.135442C5.39494 -0.0451775 5.10215 -0.0451775 4.92154 0.135442L0.20626 4.85072Z"
                      fill="#111111"
                    />
                  </svg>
                </Link>
              </li>
            )}

            {currentPage > 3 && (
              <li className="paginator">
                <Link to={`/blog/`}>{currentPage === 2 ? "" : 1}</Link>
              </li>
            )}

            {visiblePages.map((page, index) => (
              <li
                key={index}
                className={`paginator ${page === currentPage ? "active" : ""}`}
              >
                {typeof page === "number" ? (
                  <Link to={`/blog/${page === 1 ? "" : page}`}>{page}</Link>
                ) : (
                  <span>{page}</span>
                )}
              </li>
            ))}

            {currentPage < numPages - 2 && (
              <li className="paginator">
                <Link to={`/blog/${numPages}`}>{numPages}</Link>
              </li>
            )}

            {currentPage < numPages && (
              <li className="paginator">
                <Link to={`/blog/${currentPage + 1}`}>
                  <svg
                    width="6"
                    height="11"
                    viewBox="0 0 6 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.79374 4.85072C5.97436 5.03134 5.97436 5.32413 5.79374 5.50474L1.07846 10.22C0.897846 10.4006 0.605056 10.4006 0.424437 10.22L0.206387 10.002C0.025768 9.82137 0.025768 9.52854 0.206387 9.34792L4.3766 5.17773L0.206387 1.00752C0.0257677 0.8269 0.0257676 0.53411 0.206387 0.353492L0.424437 0.135442C0.605056 -0.0451775 0.897845 -0.0451775 1.07846 0.135442L5.79374 4.85072Z"
                      fill="#111111"
                    />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .next {
    left: 68.31%;
    right: -33.03%;
    top: 83.47%;
    bottom: -20.09%;

    transform: matrix(0, -1, -1, 0, 0, 0);
  }
  .pagination {
    gap: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
  }

  .paginator {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border: 1px solid rgba(17, 17, 17, 0.1);
    border-radius: 2px;
  }

  .active {
    background: #ff9933;
  }

  .active a {
    color: #ffffff !important;
  }

  .blog-navigation-container a {
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 100%;
    height: 100%;
    font-weight: 400;
    line-height: 150%;
    color: #111111;
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

  .blog-navigation-container a:hover svg path {
    fill: #ff9933;
  }

  span {
    display: block;
    font-weight: bold;
    padding: 13px;
    font-size: 16px;
  }
`;
export default PaginationBlog;
