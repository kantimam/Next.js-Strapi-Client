import { getStrapiMedia } from "../../utils";

interface IMediaItem {
  id: number;
  attributes: {
    formats: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

const GalleryItem = (mediaItem: IMediaItem) => {
  const mediaItemPreview = mediaItem?.attributes?.formats?.thumbnail;

  if (mediaItemPreview) {
    return (
      <article
        className="p-1 border-2 border-violet-500 rounded-md"
        key={`media_item_${mediaItem.id}`}
      >
        <img
          src={getStrapiMedia(mediaItemPreview.url)}
          width={mediaItemPreview.width}
          height={mediaItemPreview.height}
        />
      </article>
    );
  }

  return <p>no valid thumbnail found...</p>;
};

interface IProps {
  Media: {
    data: IMediaItem[];
  };
}

const Gallery = ({ Media }: IProps) => {
  if (!Media?.data?.length) {
    return <p>gallery does not seem to have any valid media items.</p>;
  }

  return (
    <div className="py-8 flex flex-wrap gap-1">
      {Media.data.map(GalleryItem)}
    </div>
  );
};

export default Gallery;
