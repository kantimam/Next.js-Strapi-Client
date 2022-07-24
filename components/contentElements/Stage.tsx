import { getImageAttributes, getStrapiMedia } from "../../utils/strapiApi";

type Props = {
  image: any;
  badge: any;
};

const Stage = ({ image, badge }: Props) => {
  const imageAttributes = getImageAttributes(image);
  const badgeAttributes = getImageAttributes(badge);

  return (
    <div className="p-4 rounded-md border-red-600 border-4">
      <h1 className="text-6xl my-4">Stage Element from Strapi</h1>
      <img
        src={getStrapiMedia(imageAttributes?.formats?.large?.url)}
        alt={image.alternativeText}
      />
      <img
        src={getStrapiMedia(badgeAttributes?.url)}
        alt={badgeAttributes.alternativeText}
      />
    </div>
  );
};

export default Stage;
