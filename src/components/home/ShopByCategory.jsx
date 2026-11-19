
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

const ShopByCategory = () => {
  // DISPLAY CATEGORIES IN CUSTOM ORDER
  const categoryOrder = [
    "mobiles",
    "fashion",
    "electronics",
    "home-living",
    "appliances",
    "beauty",
    "sports",
    "toys-kids",
    "books",
    "travel",
  ];

  // SORT CATEGORIES BASED ON CUSTOM ORDER
  const sortedCategories = categoryOrder
    .map((slug) =>
      categories.find((category) => category.slug === slug)
    )
    .filter(Boolean);

  return (
    <section
      aria-label="Shop by category"
      className="
        mx-auto mt-4
        w-[94%] max-w-[1500px]
      "
    >
      {/* HORIZONTAL SCROLLABLE CATEGORY ROW */}
      <div
        className="
          flex items-start
          gap-4 overflow-x-auto
          overscroll-x-contain
          scroll-smooth
          py-2
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          sm:gap-5
          md:gap-6
          lg:justify-between
        "
      >
        {sortedCategories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.slug}`}
            className="
              group flex
              w-[84px] shrink-0
              flex-col items-center
              text-center
              focus-visible:rounded-lg
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-blue-600
              sm:w-[96px]
              lg:w-[100px]
            "
          >
            {/* CIRCULAR CATEGORY IMAGE */}
            <div
              className="
                h-[72px] w-[72px]
                overflow-hidden
                rounded-full bg-gray-100
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:shadow-md
                sm:h-[82px] sm:w-[82px]
                lg:h-[90px] lg:w-[90px]
              "
            >
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="
                  h-full w-full
                  object-cover
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </div>

            {/* CATEGORY NAME */}
            <span
              className="
                mt-2 w-full
                text-center text-xs
                font-semibold leading-4
                text-gray-900
                transition-colors
                group-hover:text-blue-600
                sm:text-sm
              "
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
