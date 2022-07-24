//const DEFAULT_STRAPI_URL = 'http://localhost:5500';
const DEFAULT_STRAPI_URL = 'http://localhost:3000/strapi';

// Get the url of the Strapi API based om the env variable or the default local one.
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL || DEFAULT_STRAPI_URL}${path}`;
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || DEFAULT_STRAPI_URL}${url}`;
}

export function getImageAttributes(imageJson) {
  return imageJson?.data?.attributes;
}

// handle the redirection to the homepage if the page we are browsinng doesn't exists
export function redirectToHomepage() {
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}


// This function will build the url to fetch on the Strapi API
export function getStrapiPageUrl(slug) {
  let populationRules = "?populate=deep"
  let apiUrl = "/api/pages" + populationRules;
  apiUrl += slug && slug !== "" ? `&filters[slug]=${slug}` : "&filters[slug]"

  return getStrapiURL(apiUrl)
}



export function getPages() {
  return fetch(`${getStrapiURL()}/api/pages`).then(res => res.json());

}

export function findPageBySlug(slug) {
  return fetch(getStrapiPageUrl(slug)).then(res => res.json());
}