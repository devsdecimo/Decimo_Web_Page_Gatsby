import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import slugify from "slugify";
import Newsletter from "./Newsletter";
import { Container, Row, Col } from "react-bootstrap";
import { postSlug } from "../utils/slugExpression";

export const query = graphql`
  {
    allNodeBlogPost(sort: { created: DESC }, limit: 6) {
      nodes {
        title
        body {
          summary
          value
        }
        relationships {
          field_header_image {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;

const HomeBlogPosts = (props) => {
  const data = useStaticQuery(query);
  const posts = data.allNodeBlogPost.nodes
  return (
    <Wrapper>
      <section className="blog-header">
        <h2>{props.title}</h2>
        <p className="blog-subtitle">{props.subtitle}</p>
      </section>
      {/* Pagination */}
      <section className="blog-body">
        <div className="cards-container">
          {posts.map((post, index) => {
            const {
              title,
              body: { value, summary },
              relationships: { field_header_image: image },
            } = post;

            const main = { __html: value };
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
                    {/* <p dangerouslySetInnerHTML={main} /> */}
                    <p>{summary}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='posts-link'>
          <Link to='/blog'>
            <p>{props.link}</p>
            {/* icono en svg de la flecha  */}
            <svg className='link-icon' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.9999 12.5C24.9999 5.59476 19.4051 0 12.4999 0C5.59464 0 -0.00012207 5.59476 -0.00012207 12.5C-0.00012207 19.4052 5.59464 25 12.4999 25C19.4051 25 24.9999 19.4052 24.9999 12.5ZM2.41923 12.5C2.41923 6.93044 6.93032 2.41935 12.4999 2.41935C18.0694 2.41935 22.5805 6.93044 22.5805 12.5C22.5805 18.0696 18.0694 22.5806 12.4999 22.5806C6.93032 22.5806 2.41923 18.0696 2.41923 12.5ZM6.04826 13.5081V11.4919C6.04826 11.1593 6.32044 10.8871 6.6531 10.8871H12.4999V7.51008C12.4999 6.97077 13.1501 6.70363 13.5331 7.08165L18.5231 12.0716C18.76 12.3085 18.76 12.6915 18.5231 12.9284L13.5331 17.9183C13.1501 18.3014 12.4999 18.0292 12.4999 17.4899V14.1129H6.6531C6.32044 14.1129 6.04826 13.8407 6.04826 13.5081Z" fill="url(#paint0_linear_156_515)" />
              <defs>
                <linearGradient id="paint0_linear_156_515" x1="1.38521" y1="29.1129" x2="12.4888" y2="29.0415" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#339999" />
                  <stop offset="1" stop-color="#FF9933" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
        </div>
        <Container>
          <p className='newsletter-text'>Subscribe to our blog and get notified</p>
          <Row>
            <Col className="newsletter d-flex justify-content-center">
              <Newsletter />
            </Col>
          </Row>
        </Container>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .blog-body {
    width: 100%;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 75px;
    margin-top:130px;
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
    /* border: 1px solid #E7EAEE; */
    height: 100%;
    padding: 17px 16px;
  }

  .card-post-container:hover {
    /* border-left: 0;
    border-right: 0;
    border-bottom: 0;
    border-top: 0; */
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
    -webkit-line-clamp: 3;
    line-clamp: 3;
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

  .posts-link {
    margin: auto;
    width: auto;
    text-align: center;
    margin: 80px 0;
  }
  .posts-link p {
    display: inline-block;
    color: black;
  }
  .newsletter{
    margin-top: -10px;
  }
  .newsletter-text {
    padding-top: 40px;
    font-family: 'Cabin';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
  }
  .link-icon{
    margin: auto 10px;
  }
`
export default HomeBlogPosts
