import Head from "next/head";

import { getDataDependencies } from "./services/api";
import { getStrapiURL, findPageBySlug, getPages } from "../utils";
import ContentElementManager from "../components/ContentElementsManager";
import MainLayout from "../components/layouts/MainLayout";

const Universals = ({ pageData, pagesList }) => {
  const contentElements = pageData?.content ?? [];

  return (
    <MainLayout pagesList={pagesList} pageData={pageData}>
      <>
        <Head>
          <title>Vidaa</title>
          <meta name="description" content="Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="container mx-auto py-6">
            <ContentElementManager contentElements={contentElements} />
          </div>
        </main>
      </>
    </MainLayout>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  try {
    const res = await fetch(`${getStrapiURL()}/api/pages`);
    const json = await res.json();
    const pages = json?.data || [];

    // Get the paths we want to pre-render based on posts
    const paths = pages.map((page) => {
      const slug = page.attributes.slug ?? "";
      const slugWithoutLeadingSlash = slug.startsWith("/")
        ? slug.substring(1)
        : slug;
      return {
        params: { slug: [slugWithoutLeadingSlash] },
      };
    });

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps(context) {
  console.log(context);
  const slugs = context?.params?.slug;
  const slug = slugs && slugs.length ? slugs[0] : "";

  try {
    const pageRequest = findPageBySlug(slug);
    const allPagesRequest = getPages();

    const allPromises = Promise.all([allPagesRequest, pageRequest]);

    const [allPageData, currentPageData] = await allPromises;

    console.log(currentPageData);

    const pagesList = allPageData?.data || [];

    const jsonData = currentPageData?.data;

    if (!jsonData || !jsonData.length || !jsonData[0].attributes) {
      return { props: { pageData: null, pagesList: pagesList } };
    }

    const data = jsonData[0];

    const attrs = data.attributes;
    attrs.id = data.id;

    const pageData = await getDataDependencies(attrs);

    return {
      props: { pageData, pagesList: pagesList },
    };
  } catch (error) {
    console.log(error);
    return { props: { pageData: null, pagesList: [] } };
  }
}

export default Universals;
