import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import slugify from "slugify";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../components/seo";
import Newsletter from "../components/Newsletter";
import { Container, Row, Col } from "react-bootstrap";
import PaginationBlog from "../components/PaginationBlog";
import FormBlogPage from "../components/FormBlogPage";
import { postSlug } from "../utils/slugExpression";

const BlogPage = ({ data, pageContext }) => {
  // data
  const { title, field_blog_page_subtitle: subtitle } =
    data.allNodeBlogPage.nodes[0];
  const posts = data.allNodeBlogPost.nodes;

  // paginator
  const { currentPage, numPages } = pageContext;

  return (
    <Layout>
      <Wrapper>
        <main>
          {/* header */}
          <section className="blog-header">
            <h2>{title}</h2>
            <p className="blog-subtitle">{subtitle}</p>
          </section>
          {/* Blogs */}
          <section className="blog-body">
            <div className="cards-container">
              {posts.map((post, index) => {
                const {
                  title,
                  body: { value, summary },
                  relationships: { field_header_image: image },
                } = post;

                // const slug = slugify(title, { lower: true });
                const slug = postSlug(title);
                const cardImage = getImage(image.localFile.childImageSharp);

                return (
                  <div key={index} className="card-post">
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
          </section>
          {/* Pagination */}
          <section className="blog-navigation">
            <PaginationBlog currentPage={currentPage} numPages={numPages} />
          </section>
        </main>
        <Container>
          <p className="newsletter-text">
            Subscribe to our blog and get notified
          </p>
          <Row>
            <Col className="newsletter d-flex justify-content-center">
              <Newsletter />
            </Col>
          </Row>
        </Container>
        <FormBlogPage />
      </Wrapper>
    </Layout>
  );
};

export const Head = ({ pageContext }) => (
  <SEO
    title={`Blog ${
      pageContext.currentPage === 0 ? "1" : pageContext.currentPage
    } - Decimo Technology Solutions`}
    pathname={`blog/${
      pageContext.currentPage === 0 ? "1" : pageContext.currentPage
    }`}
    description={`Blog page ${
      pageContext.currentPage === 0 ? "1" : pageContext.currentPage
    } of Decimo Technology Solutions`}
  />
);
export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allNodeBlogPage {
      nodes {
        title
        field_blog_page_subtitle
      }
    }

    allNodeBlogPost(sort: { created: DESC }, limit: $limit, skip: $skip) {
      nodes {
        title
        body {
          value
          summary
        }
        relationships {
          field_header_image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  blurredOptions: { width: 20 }
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  .blog-body {
    width: 100%;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 75px;
    margin-top: 75px;
  }

  .blog-subtitle {
    color: rgba(0, 11, 40, 0.6);
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

  .card-post-container {
    height: 100%;
    padding: 17px 16px;
  }

  .border-gradient {
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
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

  .card-post-header {
    height: 81px;
    border-radius: 25px;
  }
  .gatsby-image {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  .blog-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 75px 0 75px 0;
  }
  .newsletter {
    margin-top: -20px;
  }
  .newsletter-text {
    padding-top: 40px;
    font-family: "Avenir LT Std";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
  }
`;

export default BlogPage;
