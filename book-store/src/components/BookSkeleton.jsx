const BookSkeleton = () => {
  return (
    <div className="book-card animate-pulse">
      {/* Book Cover Image Skeleton */}
      <div className="h-[240px] w-[170px] bg-gray-200 rounded-md" />

      {/* Content Container */}
      <div className="flex-1 h-full pr-2 pt-2 flex flex-col justify-between">
        <div>
          {/* Header Row: Badge & Action Buttons */}
          <div className="flex items-center justify-between">
            {/* Badge Skeleton */}
            <div className="h-5 w-16 bg-gray-200 rounded-full" />

            {/* Action Buttons Skeleton */}
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-200 rounded" />
              <div className="w-6 h-6 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-3 mt-4">
            {/* Title (2 lines to account for longer book titles) */}
            <div className="space-y-1.5">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Author */}
            <div className="h-3 bg-gray-200 rounded w-1/2" />

            {/* Rating Stars */}
            <div className="flex space-x-1 pt-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-4 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="h-5 bg-gray-200 rounded w-20 mb-2" />
      </div>
    </div>
  );
};
export default BookSkeleton;
