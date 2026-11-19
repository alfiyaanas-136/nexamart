
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { dealsData } from "../../data/dealsData";
import DealCard from "./DealCard";

// DEAL COUNTDOWN CONFIGURATION
const DEAL_DURATION = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "nexamart-deal-end";

// GET OR CREATE DEAL END TIME
const getDealEnd = () => {
  const now = Date.now();
  const saved = Number(localStorage.getItem(STORAGE_KEY));

  if (saved > now) return saved;

  const end = now + DEAL_DURATION;
  localStorage.setItem(STORAGE_KEY, String(end));

  return end;
};

const DealsOfTheDay = () => {
  const sliderRef = useRef(null);

  // COUNTDOWN STATE
  const [endTime] = useState(getDealEnd);

  const [remaining, setRemaining] = useState(() =>
    Math.max(0, endTime - Date.now())
  );

  // CAROUSEL NAVIGATION STATE
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // UPDATE COUNTDOWN EVERY SECOND
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(Math.max(0, endTime - Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // FORMAT COUNTDOWN
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  const pad = (number) => String(number).padStart(2, "0");

  // CHECK CAROUSEL SCROLL POSITION
  const updateScrollButtons = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScrollLeft =
      slider.scrollWidth - slider.clientWidth;

    setCanScrollLeft(slider.scrollLeft > 2);
    setCanScrollRight(
      slider.scrollLeft < maxScrollLeft - 2
    );
  };

  // OBSERVE CAROUSEL SIZE CHANGES
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new ResizeObserver(updateScrollButtons);

    observer.observe(slider);

    updateScrollButtons();

    return () => observer.disconnect();
  }, []);

  // SCROLL CAROUSEL BY ONE PRODUCT CARD
  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector("[data-deal-card]");
    if (!card) return;

    const gap =
      parseFloat(getComputedStyle(slider).columnGap) || 0;

    const amount = card.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-label="Deals of the Day"
      className="mx-auto mt-6 w-[94%] max-w-[1500px]"
    >
      <div className="rounded-2xl border border-gray-100 bg-white px-3 py-5 shadow-sm sm:px-6">

        {/* SECTION HEADER */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">

            {/* SECTION TITLE */}
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-2xl">
              <Zap
                size={25}
                fill="#facc15"
                className="shrink-0 text-yellow-400"
              />
              Deals of the Day
            </h2>

            {/* COUNTDOWN TIMER */}
            <div className="flex items-center gap-2 rounded-lg bg-pink-100 px-3 py-2 text-xs font-semibold text-pink-800 sm:text-sm">
              <span>
                {remaining > 0 ? "Ends in" : "Deal ended"}
              </span>

              {remaining > 0 && (
                <span className="font-bold tabular-nums">
                  {pad(hours)} : {pad(minutes)} : {pad(seconds)}
                </span>
              )}
            </div>

          </div>

          {/* VIEW ALL DEALS */}
          <Link
            to="/products?sort=discount"
            className="flex min-h-10 items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            View All Deals
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* PRODUCT CAROUSEL */}
        <div className="relative">

          <div
            ref={sliderRef}
            onScroll={updateScrollButtons}
            className="
              flex snap-x snap-mandatory
              gap-3 overflow-x-auto
              scroll-smooth pb-2
              overscroll-x-contain
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {dealsData.map((product) => (
              <div
                key={product.id}
                data-deal-card
                className="
                  w-[78%] shrink-0 snap-start
                  min-[425px]:w-[65%]
                  sm:w-[45%]
                  md:w-[calc((100%-24px)/3)]
                  lg:w-[calc((100%-36px)/4)]
                  xl:w-[calc((100%-60px)/6)]
                "
              >
                <DealCard product={product} />
              </div>
            ))}
          </div>

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous deals"
            className="
              absolute -left-2 top-1/2 z-10
              flex h-9 w-9 -translate-y-1/2
              items-center justify-center
              rounded-full border border-gray-100
              bg-white text-gray-900 shadow-md
              transition hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:-left-4 sm:h-10 sm:w-10
            "
          >
            <ChevronLeft size={22} />
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            aria-label="Next deals"
            className="
              absolute -right-2 top-1/2 z-10
              flex h-9 w-9 -translate-y-1/2
              items-center justify-center
              rounded-full border border-gray-100
              bg-white text-gray-900 shadow-md
              transition hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:-right-4 sm:h-10 sm:w-10
            "
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
