import Link from 'next/link';

const StrapiLink = ({ label, href, locale, target, isExternal }) => {
  if (isExternal) {
    return (
      <Link href={href}>
        <a target={target}>{label}</a>
      </Link>
    );
  } else {
    return (
      <Link href={`${href}?lang=${locale || 'en'}`}>
        <a target={target}>{label}</a>
      </Link>
    );
  }
};


export default StrapiLink;