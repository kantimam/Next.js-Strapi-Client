import { StrapiMediaItem } from "../../types/strapiContent";
import { getStrapiMedia } from "../../utils/strapiApi";
import ImageTransition from "./ImageTransition";

type Props = {
  StartImage: StrapiMediaItem;
  EndImage: StrapiMediaItem;
  DisplacementImage: StrapiMediaItem;
};

const StrapiImageTransition = (props: Props) => {
  //return <pre>{JSON.stringify(props.DisplacementImage, null, 2)}</pre>;
  return (
    <ImageTransition
      startImageSrc={getStrapiMedia(props?.StartImage?.data?.attributes?.url)}
      endImageSrc={getStrapiMedia(props?.EndImage?.data?.attributes?.url)}
      displacementImageSrc={getStrapiMedia(
        props?.DisplacementImage?.data?.attributes?.url
      )}
    />
  );
};

export default StrapiImageTransition;
