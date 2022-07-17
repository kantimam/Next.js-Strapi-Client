import { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'


interface IProps extends PropsWithChildren {
  pageData: any;
  pagesList: any;
}

export default function MainLayout({
  children,
  pageData,
  pagesList = [],
}: IProps) {
  // TODO: handle multiple slashes in slug
  const router = useRouter();
  const currentRoute = router.asPath

  return (
    <>
      <header>
        <nav className="py-2">
          {pagesList.map((pageLink: any) => {
            const href = `/${pageLink?.attributes?.slug ?? ""}`
            const isLinkActive = href === currentRoute;

            return (
              <Link
                key={`navLink_${pageLink?.id}`}
                href={href}
              >
                <a className={`mx-2 p-2 text-lg inline-block ${isLinkActive ? 'text-violet-600' : ''}`}>
                  {pageLink?.attributes?.metaTitle ?? "invalid page title"}
                </a>
              </Link>
            )
          })}
        </nav>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}
