
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/heroSlides";

const HeroCarousel = () => {
  const totalSlides = heroSlides.length;

  // Add clones to create seamless infinite sliding
  const slides =
    totalSlides > 1
      ? [
          heroSlides[totalSlides - 1],
          ...heroSlides,
          heroSlides[0],
        ]
      : heroSlides;

  // Start at the first real slide (index 1)
  const [currentSlide, setCurrentSlide] = useState(
    totalSlides > 1 ? 1 : 0
  );

  // Pause autoplay when the user interacts with the carousel
  const [isPaused, setIsPaused] = useState(false);

  // Control whether the sliding transition is enabled
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Prevent multiple slide changes during an animation
  const [isAnimating, setIsAnimating] = useState(false);

  // Respect the user's reduced-motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false);

  // Store the starting position of a touch gesture
  const touchStartX = useRef(null);

  // Detect reduced-motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference
      );
    };
  }, []);

  // Determine which real slide is currently active
  const activeSlide =
    totalSlides > 0
      ? (currentSlide - 1 + totalSlides) % totalSlides
      : 0;

  // Move to the next slide
  const nextSlide = () => {
    if (isAnimating || totalSlides <= 1) return;

    setIsTransitioning(true);
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // Move to the previous slide
  const prevSlide = () => {
    if (isAnimating || totalSlides <= 1) return;

    setIsTransitioning(true);
    setIsAnimating(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Navigate directly to a selected slide
  const goToSlide = (index) => {
    if (
      isAnimating ||
      totalSlides <= 1 ||
      index === activeSlide
    ) {
      return;
    }

    setIsTransitioning(true);
    setIsAnimating(true);
    setCurrentSlide(index + 1);
  };

  // Reset position invisibly after reaching a cloned slide
  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;

    if (currentSlide === totalSlides + 1) {
      // Clone of first slide -> real first slide
      setIsTransitioning(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      // Clone of last slide -> real last slide
      setIsTransitioning(false);
      setCurrentSlide(totalSlides);
    }

    // Allow another slide change after animation finishes
    setIsAnimating(false);
  };

  // Restore animation after the invisible clone reset
  useEffect(() => {
    if (isTransitioning) return;

    let secondFrame;

    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);

      if (secondFrame !== undefined) {
        cancelAnimationFrame(secondFrame);
      }
    };
  }, [isTransitioning]);

  // Complete slide changes immediately when reduced motion is enabled
  useEffect(() => {
    if (!prefersReducedMotion || !isAnimating) return;

    const frame = requestAnimationFrame(() => {
      if (currentSlide === totalSlides + 1) {
        // Reset from the first cloned slide
        setIsTransitioning(false);
        setCurrentSlide(1);
      } else if (currentSlide === 0) {
        // Reset from the last cloned slide
        setIsTransitioning(false);
        setCurrentSlide(totalSlides);
      }

      setIsAnimating(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [
    prefersReducedMotion,
    isAnimating,
    currentSlide,
    totalSlides,
  ]);

  // Autoplay every 5 seconds
  useEffect(() => {
    if (
      isPaused ||
      prefersReducedMotion ||
      totalSlides <= 1 ||
      isAnimating
    ) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setIsAnimating(true);
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [
    isPaused,
    prefersReducedMotion,
    totalSlides,
    isAnimating,
  ]);

  // Record the initial touch position
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  // Detect swipe direction and navigate between slides
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;

    const difference =
      touchStartX.current - touchEndX;

    touchStartX.current = null;

    // Ignore very small movements
    if (Math.abs(difference) < 50) return;

    // Swipe left -> next slide
    if (difference > 0) {
      nextSlide();
    } else {
      // Swipe right -> previous slide
      prevSlide();
    }
  };

  // Reset touch tracking if the gesture is cancelled
  const handleTouchCancel = () => {
    touchStartX.current = null;
  };

  // Do not render the carousel when there are no slides
  if (totalSlides === 0) return null;

  return (
    <section
      aria-label="NexaMart promotional offers"
      aria-roledescription="carousel"
      className="mx-auto mt-4 w-[94%] max-w-[1500px] sm:mt-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget
          )
        ) {
          setIsPaused(false);
        }
      }}
    >
      {/* Responsive Carousel Container */}
      <div
        className="
          relative aspect-[3/1]
          overflow-hidden rounded-xl
          bg-white shadow-lg
          sm:rounded-2xl
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {/* Infinite Sliding Track */}
        <div
          className={`flex h-full ${
            isTransitioning && !prefersReducedMotion
              ? "transition-transform duration-700 ease-in-out"
              : "transition-none"
          }`}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="h-full w-full shrink-0"
              aria-hidden={index !== currentSlide}
              inert={index !== currentSlide}
            >
              <Link
                to={slide.link}
                aria-label={`${slide.title} ${slide.highlight} - ${slide.subtitle}`}
                className="block h-full w-full"
                tabIndex={
                  index === currentSlide ? 0 : -1
                }
              >
                {/* Use mobile image when available */}
                <picture>
                  {slide.mobileImage && (
                    <source
                      media="(max-width: 639px)"
                      srcSet={slide.mobileImage}
                    />
                  )}

                  <img
                    src={slide.image}
                    alt={`${slide.title} ${slide.highlight} - ${slide.subtitle}`}
                    loading={
                      index === (totalSlides > 1 ? 1 : 0)
                        ? "eager"
                        : "lazy"
                    }
                    fetchPriority={
                      index === (totalSlides > 1 ? 1 : 0)
                        ? "high"
                        : "auto"
                    }
                    decoding="async"
                    className="block h-full w-full object-contain sm:object-cover"
                    draggable="false"
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>

        {/* Previous Arrow */}
        {totalSlides > 1 && (
          <button
            type="button"
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous slide"
            className="
              absolute left-2 top-1/2 z-20
              flex h-9 w-9 -translate-y-1/2
              items-center justify-center
              rounded-full bg-white/85
              text-gray-900 shadow-md
              transition hover:bg-white
              disabled:cursor-wait
              focus-visible:outline-2
              focus-visible:outline-blue-600
              sm:left-3 sm:h-10 sm:w-10
              md:h-12 md:w-12
            "
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next Arrow */}
        {totalSlides > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next slide"
            className="
              absolute right-2 top-1/2 z-20
              flex h-9 w-9 -translate-y-1/2
              items-center justify-center
              rounded-full bg-white/85
              text-gray-900 shadow-md
              transition hover:bg-white
              disabled:cursor-wait
              focus-visible:outline-2
              focus-visible:outline-blue-600
              sm:right-3 sm:h-10 sm:w-10
              md:h-12 md:w-12
            "
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div
            className="
              absolute bottom-2 left-1/2 z-20
              flex -translate-x-1/2
              items-center gap-2
              sm:bottom-3
              md:bottom-5
            "
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                disabled={isAnimating}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  activeSlide === index
                    ? "true"
                    : undefined
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-7 bg-yellow-400"
                    : "w-2 bg-white/80 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCarousel;
