import React from "react";
import { Helmet } from "react-helmet";
import heart from "../assets/heart.png";

const description = "A sdkgen playground for the web.";
const title = "sdkgen playground";
const meta = {};

export const SEO = () => {
  return (
    <Helmet
      htmlAttributes={{
        lang: `en`
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: description
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: `Marcelo Cardoso`
        },
        {
          name: `twitter:title`,
          content: `sdkgen playground`
        },
        {
          name: `twitter:description`,
          content: description
        }
      ].concat(meta)}
    >
      <link rel="icon" type="image/png" sizes="16x16" href={heart} />}
    </Helmet>
  );
};
