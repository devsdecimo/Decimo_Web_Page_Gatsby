import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link as ReactLink } from "react-scroll";
import slugify from "slugify";
import { postSlug } from "../utils/slugExpression";

const SimilarPost = ({ data }) => {
  return (
    <Wrapper>
      <div className="similar-header">
        <h2 className="similar-title">What to read next</h2>
      </div>
      <div className="similar-posts">
        <div className="cards-container">
          {data.map((post, index) => {
            const {
              title,
              body: { summary },
              relationships: {
                field_blog_post_tags: tags,
                field_header_image: image,
              },
            } = post;

            // const slug = slugify(title, { lower: true });
            const slug = postSlug(title);
            const cardImage = getImage(image.localFile.childImageSharp);

            return (
              <div key={index} className="card-post">
                <div className="top-gradient"></div>
                <div className="card-post-container">
                  <div className="card-post-header">
                    <GatsbyImage
                      image={cardImage}
                      alt={"Post image of " + title}
                      className="gatsby-image"
                    />
                  </div>
                  <div className="card-post-body">
                    <Link to={`/blog/${slug}`}>
                      <h5>{title}</h5>
                    </Link>
                    <p>{summary}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .similar-header {
    width: 100%;
    text-align: center;
  }
  .similar-posts {
    width: 100%;
  }
  .similar-title {
    font-weight: 700;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-auto-rows: minmax(320px, auto);
    justify-items: center;
    max-width: 1270px;
    gap: 40px;
    margin-left: auto;
    margin-right: auto;
  }
  .card-post-header {
    height: 81px;
    border-radius: 25px;
    text-align: center;
  }

  .gatsby-image {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
  .card-post-container {
    height: 100%;
    padding: 17px 16px;
  }

  .card-post {
    position: relative;
    transition: 0.3s ease;
    width: 320px;
    height: 320px;
    display: inline-block;
    background: transparent;
    border: 1px solid #e7eaee;
  }

  .card-post a {
    color: black;
  }

  .card-post::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 5px;
    background-image: linear-gradient(89.63deg, #339999 5.4%, #ff9933 49.53%);
    opacity: 0;
    transition: 0.3s ease;
  }

  .card-post:hover {
    background: #ffffff;
    box-shadow: 0px 48px 140px rgba(57, 59, 106, 0.15);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  .card-post:hover::before {
    opacity: 1;
  }

  .card-post-body {
    display: flex;
    flex-direction: column;
    padding: 0px 20px 18px 20px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .card-post-body h5 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    margin-top: 17px;
    font-weight: 700;
  }

  .card-post-body p {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    /* white-space: nowrap; */
  }
`;

export default SimilarPost;
