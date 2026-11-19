
import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../../hooks/useWishlist";

const ProductImageGallery = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);

  const { toggleWishlist, isInWishlist } = useWishlist();

  // GET PRODUCT IMAGES
  const images =
    product.images?.length > 0
      ? product.images
      : [product.image];

  // ENSURE THE SELECTED IMAGE INDEX IS VALID
  const currentImageIndex =
    activeImage < images.length ? activeImage : 0;

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="w-full min-w-0">

      {/* MAIN PRODUCT IMAGE */}
      <div
        className="
          relative flex h-[280px]
          items-center justify-center
          overflow-hidden rounded-xl
          bg-gray-50 p-3
          sm:h-[360px] sm:p-4
          lg:h-[400px]
        "
      >
        <img
          src={images[currentImageIndex]}
          alt={`${product.name} - View ${currentImageIndex + 1}`}
          className="h-full w-full object-contain"
        />

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="
            absolute right-3 top-3
            flex h-11 w-11
            items-center justify-center
            rounded-full bg-white
            shadow-md transition
            hover:scale-110
            focus-visible:outline-2
            focus-visible:outline-blue-600
            sm:right-4 sm:top-4
          "
        >
          <Heart
            size={23}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>
      </div>

      {/* THUMBNAIL GALLERY */}
      {images.length > 1 && (
        <div
          aria-label={`${product.name} image thumbnails`}
          className="
            mt-4 flex w-full min-w-0
            items-center justify-start
            gap-3 overflow-x-auto
            overscroll-x-contain
            scroll-smooth pb-2
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:justify-center
          "
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1} of ${product.name}`}
              aria-pressed={currentImageIndex === index}
              className={`
                flex h-[64px] w-[64px]
                shrink-0 items-center
                justify-center overflow-hidden
                rounded-lg border-2
                bg-white p-2 transition
                sm:h-[70px] sm:w-[70px]
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-blue-600
                ${
                  currentImageIndex === index
                    ? "border-blue-600"
                    : "border-gray-200 hover:border-blue-300"
                }
              `}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductImageGallery;
