import { useEffect, useRef } from "react";
import Transition from "../../utils/imageTransition";

type Props = {
  startImageSrc: string;
  endImageSrc: string;
  displacementImageSrc: string;
};

const ImageTransition = ({
  startImageSrc,
  endImageSrc,
  displacementImageSrc,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let transition: Transition | undefined;
    if (startImageSrc && endImageSrc && displacementImageSrc) {
      transition = new Transition(
        containerRef.current as HTMLDivElement,
        startImageSrc,
        endImageSrc,
        displacementImageSrc
      );
    }

    return () => {
      transition?.destroy();
    };
  }, [startImageSrc, endImageSrc, displacementImageSrc]);

  return (
    <section className="py-4 mx-auto container bg-gray-300">
      <div ref={containerRef}>ImageTransition</div>
    </section>
  );
};

export default ImageTransition;
