import Head from "next/head";

import { getDataDependencies } from "./services/api";
import { getStrapiURL, findPageBySlug, getPages } from "../utils";
import ContentElementManager from "../components/ContentElementManager";
import MainLayout from "../components/layouts/MainLayout";

const Universals = ({ pageData, pagesList }) => {
  console.log(pageData);
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
          <section
            id="hero-section"
            className="bg-gradient-to-br from-purple-900 to-blue-300"
          >
            <div className="container mx-auto  flex flex-wrap justify-between items-center">
              <div className="text-wrapper">
                <h1 className="text-9xl text-white">Space</h1>
                <h2 className="text-5xl mt-4 text-slate-300">
                  kinda overrated
                </h2>
              </div>
              <div className="py-6 px-2 media-wrapper ">
                <div className="inline-block p-6 rounded-full bg-gradient-radial-repeat from-indigo-700 to-indigo-200">
                  <div className="planet m-8 h-64 w-64 rounded-full bg-gradient-radial from-slate-400 to-black hover:scale-150 hover:from-yellow-500 hover:to-purple-600 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </section>
          <div id="intro-section">
            <section className="container mx-auto py-6">
              <h1 className="text-7xl">intro section</h1>
              <p className="mt-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit,
                reiciendis. Vitae, eaque ullam perferendis vel officia fuga
                pariatur reiciendis quibusdam, architecto qui harum minima, cum
                dolorum placeat perspiciatis! Nostrum, eveniet!
              </p>
              <ContentElementManager contentElements={contentElements} />
            </section>
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
      /** @string slug */
      const slug = page.attributes.slug ?? "";
      const slugWithoutLeadingSlash = slug.startsWith("/") ? slug.substring(1) : slug;
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
    return { paths: [], fallback: "blocking" }
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
