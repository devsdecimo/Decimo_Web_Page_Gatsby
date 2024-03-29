import React, { useEffect } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { Seo } from "../components/seo";
import SimilarPost from "../components/SimilarPost";
import { readingTime } from "../utils/readingTime";
import { postSlug } from "../utils/slugExpression";
import FormBlogPage from "../components/FormBlogPage";
import Prism from "prismjs";
import "../utils/prismImports";
import replaceHtml from "../utils/replaceHtml.js";

const BlogPost = ({ data }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const {
    title,
    field_blog_post_subtitle: subtitle,
    created,
    body: { value, summary },
    relationships: {
      field_header_image: { localFile },
      uid: { display_name },
      field_blog_post_tags: tags,
    },
  } = data.alias1.nodes[0];

  const updatedHTML = replaceHtml(value);

  const main = { __html: updatedHTML };
  const image = getImage(localFile);

  const time = readingTime(value);
  return (
    <Wrapper>
      <Layout>
        <main className="main">
          <h1 className="blog-post-title">{title}</h1>
          {subtitle && <p className="blog-post-subtitle">{subtitle}</p>}
          <div className="blog-post-header-image">
            <GatsbyImage
              image={image}
              alt={"Post image of " + title}
              className="gatsby-image-header"
              objectFit="cover"
            />
          </div>
          <section className="blog-post-container">
            <hr className="blog-post-divisor-start" />
            <div className="blog-post-header">
              <div className="post-info">
                <p className="post-info-autor">{display_name}</p>
                <p className="post-info-data">
                  {created} · {time} min read
                </p>
                <div className="post-info-tags">
                  {tags.map((tag, index) => (
                    <Link
                      to={`/tag/${postSlug(tag.name)}`}
                      className="post-info-tag"
                      key={index}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <p className="blog-post-summary">{summary}</p>
              </div>
            </div>
            <div className="blog-post-body">
              <div
                className="blog-post-body-content"
                dangerouslySetInnerHTML={main}
              />
              <p>
                <br />
                Thanks for reading, <br />
                {display_name}
              </p>
            </div>
          </section>
          <div className="blog-post-divisor-end"></div>
          <SimilarPost data={data.alias2.nodes} />
          <FormBlogPage />
        </main>
      </Layout>
    </Wrapper>
  );
};

export const Head = ({ data }) => (
  <Seo
    title={`${data.alias1.nodes[0].title} - Decimo Technology Solutions`}
    pathname={`blog/${postSlug(data.alias1.nodes[0].title)}/`}
    description={`${data.alias1.nodes[0].body.summary}`}
  />
);

export const query = graphql`
  query ($title: String!, $limit: Int, $tags: [String!], $date: Date) {
    alias1: allNodeBlogPost(filter: { title: { eq: $title } }) {
      nodes {
        title
        field_blog_post_subtitle
        created(formatString: "MMMM DD YYYY")
        body {
          value
          summary
        }
        relationships {
          field_header_image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: TRACED_SVG
                  layout: FULL_WIDTH
                  quality: 100
                )
              }
            }
          }
          uid {
            display_name
          }
          field_blog_post_tags {
            name
          }
        }
      }
    }
    alias2: allNodeBlogPost(
      sort: { created: DESC }
      limit: $limit
      filter: {
        title: { ne: $title }
        relationships: {
          field_blog_post_tags: { elemMatch: { name: { in: $tags } } }
        }
        created: { lte: $date }
      }
    ) {
      nodes {
        title
        created(formatString: "MMMM DD, YYYY")
        body {
          value
          summary
        }
        relationships {
          field_header_image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: TRACED_SVG
                  layout: CONSTRAINED
                  quality: 100
                )
              }
            }
          }
          uid {
            display_name
          }
          field_blog_post_tags {
            name
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  h2 {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 160%;
  }

  h3 {
    color: #000;
    font-size: 28px;
    font-weight: 700;
    line-height: 160%;
  }

  h4 {
    color: #000;
    font-size: 24px;
    font-weight: 700;
    line-height: 160%;
  }

  li {
    font-weight: 400;
    line-height: 170%;
    font-size: 20px;
  }

  .line-color {
    margin-top: 130px;
  }

  h1 {
    font-size: 54px;
  }

  p {
    font-weight: 400;
    line-height: 170%;
    font-size: 20px;
  }

  .blog-post-title {
    text-align: center;
    margin: 50px auto 24px auto;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 100%;
    max-width: 996px;
  }

  .blog-post-subtitle {
    text-align: center;
    color: #000000;
    padding-left: 40px;
    padding-right: 40px;
  }

  .blog-post-summary {
    margin-top: 58px;
    line-height: 170%;
  }

  .blog-post-container {
    position: relative;
    display: block;
    max-width: 996px;
    width: 100%;
    margin: 61px auto 102px auto;
  }

  .blog-post-header {
    margin-top: 29px;
  }

  .blog-post-header h1 {
    padding: 30px 0 30px 0;
    text-align: center;
  }

  .blog-post-header-image {
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    max-height: 457px;
    margin-top: 61px;
    margin-bottom: 61px;
  }

  .gatsby-image-header {
    width: 100%;
    image-rendering: auto;
  }

  .blog-post-body {
    padding-top: 58px;
    font-weight: 400;
  }

  .blog-post-body-content {
    line-height: 170%;
  }

  .blog-post-body-content img {
    margin-top: 72px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  .drupal-img {
    max-width: 100%;
    height: auto;
  }

  .post-info {
    width: 100%;
  }

  .post-info-autor {
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #000000;
    font-size: 16px;
  }

  .post-info-data {
    font-weight: 400;
    line-height: 19px;
    color: #000000;
    font-size: 16px;
  }

  .post-info-tags {
    margin-top: 29px;
    display: flex;
    flex-wrap: wrap;
  }

  .post-info-tag {
    background-color: rgba(128, 202, 203, 0.2);
    padding: 5px 18px;
    color: #339999;
    transition: 0.3s;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    white-space: nowrap;
  }

  .post-info-tag:hover {
    background-color: rgba(128, 202, 203, 0.2);
    transition: 0.3s;
  }

  .blog-post-divisor-start {
    height: 2px;
    background: #000000 !important;
    opacity: 200;
    margin-top: 0;
    margin-bottom: 0;
  }

  .blog-post-divisor-end {
    background: linear-gradient(89.63deg, #339999 10.13%, #ff9933 90.06%);
    height: 7px;
    width: 100%;
    margin-bottom: 85px;
  }

  @media (max-width: 1200px) {
    .blog-post-container {
      padding-left: 70px;
      padding-right: 70px;
    }
  }
  @media (max-width: 768px) {
    .blog-post-container {
      padding-left: 40px;
      padding-right: 40px;
    }

    .blog-post-header {
      margin-top: 40px;
    }

    .blog-post-header-image {
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .line-color {
      margin-top: 150px;
    }

    .blog-post-divisor-end {
      display: none;
    }

    h1 {
      font-size: 25px;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 23px;
    }

    h4 {
      font-size: 21px;
    }

    p {
      font-weight: 400;
      line-height: 170%;
    }

    li {
    }

    .blog-post-title {
      line-height: 100%;
      margin: 45px auto 20px auto;
    }

    .blog-post-subtitle {
      font-weight: 400;
      font-size: 16px;
      line-height: 170%;
      font-size: 16px;
    }

    .blog-post-container {
      margin-bottom: 150px;
      margin-top: 0;
    }

    .post-info {
      justify-content: center;
    }
  }
  @media (max-width: 576px) {
    .blog-post-title {
      padding-left: 71px;
      padding-right: 71px;
    }
  }
`;

export default BlogPost;
