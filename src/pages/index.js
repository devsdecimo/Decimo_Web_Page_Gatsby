import * as React from "react"
import { useContext, useEffect } from "react";
import Layout from "../components/Layout"
// import { Script } from "gatsby"
import AboutUs from "../components/AboutUs"
import TeamMembers from "../components/TeamMembers"
import Feedback from "../components/Feedback"
import ServicesandTechs from "../components/ServicesandTechs"
import { graphql } from 'gatsby'
import PrimarySection from "../components/PrimarySection"
import Projects from "../components/Projects"
import { SEO } from "../components/seo"
import OpenPositions from "../components/OpenPositions"
import HomeBlogPosts from "../components/HomeBlogPosts"
import FormHomePage from "../components/FormHomePage"

const IndexPage = ({ data = [] }) => {

  const homeinfo = data.allNodeHome.nodes[0];
  

  return (
    <Layout>
      <main>
        <PrimarySection
          smalltitle={homeinfo.field_home_small_title}
          maintitle={homeinfo.field_home_main_title}
          subtitle={homeinfo.field_home_subtitle}
          giveacall={homeinfo.field_home_give_us_a_call}
          learnmore={homeinfo.field_home_learn_more}
          image={homeinfo.relationships.field_home_image} />
        <div>
              <ServicesandTechs
                title={homeinfo.field_home_services_title}
                subtitle={homeinfo.field_home_services_subtitle} />
          <Feedback
            title={homeinfo.field_home_feedback_title}
            subtitle={homeinfo.field_home_feedback_subtitle} />
          <Projects
            title={homeinfo.field_home_projects_title}
            subtitle={homeinfo.field_home_projects_subtitle} />
          <AboutUs id='aboutus' />
          <TeamMembers
            title="Our global team" />
          <HomeBlogPosts
          title = {homeinfo.field_home_blog_title}
          subtitle = {homeinfo.field_home_blog_subtitle}
          link = {homeinfo.field_home_blog_link}/>
          <OpenPositions
          title = {homeinfo.field_home_open_positions_title}/>
          <FormHomePage/>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage;



export const query = graphql`
  query {
    allNodeHome {
      nodes {
        field_home_blog_link
        field_home_blog_subtitle
        field_home_blog_title
        field_home_feedback_subtitle
        field_home_feedback_title
        field_home_get_a_quote
        field_home_give_us_a_call
        field_home_learn_more
        field_home_open_positions_title
        field_home_projects_subtitle
        field_home_projects_title
        field_home_small_title
        field_home_subtitle
        field_home_team_title
        field_home_services_title
        field_home_services_subtitle
        field_home_main_title {
          value
        }
        relationships {
          field_home_image {
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
`
export const Head = () => (
  <SEO title="Decimo Technology Solutions" pathname="" description="Home page of Decimo Technology Solutions"/>
);