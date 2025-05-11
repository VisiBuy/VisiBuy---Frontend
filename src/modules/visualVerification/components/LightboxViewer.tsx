import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface LightboxViewerProps {
  isLightboxOpen: boolean;
  setIsLightboxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lightboxIndex: number;
  images: { imageUrl: string }[];
}

const LightboxViewer: React.FC<LightboxViewerProps> = ({
  isLightboxOpen,
  setIsLightboxOpen,
  lightboxIndex,
  images,
}) => (
  <Lightbox
    open={isLightboxOpen}
    index={lightboxIndex}
    close={() => setIsLightboxOpen(false)}
    slides={images.map((img) => ({ src: img.imageUrl }))}
    plugins={[Fullscreen, Zoom, Thumbnails]}
  />
);

export default LightboxViewer;
