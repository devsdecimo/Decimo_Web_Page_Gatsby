import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Job = ({
  jobTitle,
  jobLocation,
  jobBody,
  jobDepartment,
  openPositionsButtun,
  jobSchedule,
  jobLink,
}) => {
  const main = { __html: jobBody }; //Body

  return (
    <Wrapper id="jobs">
      <div className="job-card">
        <div className="job-header">
          <div className="job-text-flex">
            <h3>{jobTitle}</h3>
            <p className="job-department">{jobDepartment}</p>
          </div>
          <div
            className="blog-post-body-content"
            dangerouslySetInnerHTML={main}
          />
          <div className="job-text-flex">
            <p>{jobLocation}</p>
            <p>{jobSchedule}</p>
          </div>
        </div>
        <div className="job-body">
            <a href={jobLink}>
              <button className="btn-apply">
                <span className="btn-link">
                  {openPositionsButtun} 
                </span>
              </button>
            </a>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .job-card{
    display:flex;
    flex-wrap:wrap;
    min-height: 272px;
    padding:40px;
    line-height: 32px;
    border-radius: 12px;
    border: 1px solid #E4E6F1;
    margin-top:31px;
    transition: 0.4s ease;
  }

  .job-card:hover{
    background: #FFFFFF;
    box-shadow: 0px 48px 140px rgba(57, 59, 106, 0.16);
  }
  .job-header{
    flex: 0 0 80%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .job-text-flex{
    display:flex;
    gap:24px;
    align-items:center;
  }

  .job-department{
    background: rgba(128, 202, 203, 0.2);
    border-radius: 24px;
    padding: 5px 18px;
    color: #339999;
  }

  .blog-post-body-content{
    margin: 32px 0 32px;
  }

  .job-body{
    flex: 0 0 20%;
    text-align:end;
  }

  .btn-apply {
    padding: 5px 20px;
    border-radius: 25px;
    background-color: #339999;
    border: solid 1px #339999;
    transition: 0.3s;
  }

  .btn-link {
    font-size: 16px;
    color: black;
    text-decoration: none;
    transition: 0.3s;
  }

  .btn-link:hover {
    color: #1b7e7e;
  }

  .btn-apply .btn-link {
    color: white;
    font-size: 16px;
  }

  .btn-apply:hover .btn-link {
    color: #339999;
  }

  .btn-apply:hover {
    background-color: white;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    .job-header, .job-body {
      flex: 0 0 100%;
    }

    .job-body{
      display:flex;
      align-items:center;
      text-align:start;
      margin-top: 32px;
    }

    .job-text-flex{
      display:flex;
      gap:12px;
    }

    .job-card{
      margin-left:35px;
      margin-right:35px;
    }
  }
`;

export default Job;
