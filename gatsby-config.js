// support for .env, .env.development, and .env.production
const dotenv = require('dotenv');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Decimo Technology Solutions`,
    siteUrl: `https://decimotechnology.com/`,
    description: `We believe in building strong partnerships with our clients. We work closely with you to understand your vision, goals, and requirements, ensuring that we deliver a solution that aligns perfectly with your business objectives. We thrive on innovation and stay up-to-date with the latest technologies and trends in the industry. Our client’s satisfaction is at the core of everything we do. We value open and transparent communication, and we strive to exceed your expectations in terms of project delivery, support, and customer service. Your success is our success.`,
    icon: "src/images/icon.png",
  },
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: `gatsby-source-drupal`,
    options: {
      baseUrl: process.env.DRUPAL_BASE_URL,
      apiBase: `jsonapi`, // optional, defaults to `jsonapi`
      basicAuth: {
        username: process.env.GATSBY_DRUPAL_USERNAME,
        password: process.env.GATSBY_DRUPAL_PASSWORD,
      },
    },
    includeRoutes:[
      '**/form',
      '**/form_submission',
    ],
  },
  {
    resolve:`gatsby-plugin-webfonts`,
    options:{
      fonts:{
        google:[
          {
            family:"Cabin",
            variants:["400", "500", "600", "700"],
          }
        ]
      }
    }
  },
  {
    resolve: `gatsby-plugin-mailchimp`,
    options: {
      endpoint: process.env.GATSBY_PLUGIN_MAILCHIMP_ADDRESS,
      allow_duplicates: process.env.NODE_ENV !== 'production',
    },
  },
]
};