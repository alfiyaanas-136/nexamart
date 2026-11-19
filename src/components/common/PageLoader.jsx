
const PageLoader = () => {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-[#064385]"
          aria-hidden="true"
        />

        <p className="text-sm font-medium text-gray-600">
          Loading NexaMart...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
 