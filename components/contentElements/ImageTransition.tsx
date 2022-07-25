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
        displacementImageSrc,
        { duration: 1200, resizeContainer: true }
      );
      containerRef.current?.addEventListener("click", () => {
        const tr = transition as Transition;
        tr.transitionFinished ? tr.reverse() : tr.start();
      });
    }

    return () => {
      transition?.destroy();
    };
  }, [startImageSrc, endImageSrc, displacementImageSrc]);

  return (
    <section className="py-8 mx-auto container max-w-2xl">
      <div className="rounded-lg overflow-hidden" ref={containerRef}></div>
    </section>
  );
};

export default ImageTransition;
