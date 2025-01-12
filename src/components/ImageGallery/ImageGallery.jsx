import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";



const ImageGallery = ({ images, OpenModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.imagesItem} >
                <ImageCard
                    imageData={image}
                    OpenModal={OpenModal} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;