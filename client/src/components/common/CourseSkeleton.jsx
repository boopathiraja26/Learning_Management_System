const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">

      <div className="h-52 bg-gray-300"></div>

      <div className="p-5">

        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

        <div className="h-4 bg-gray-300 rounded mb-2"></div>

        <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>

        <div className="flex justify-between items-center">

          <div className="h-5 bg-gray-300 rounded w-20"></div>

          <div className="h-10 bg-gray-300 rounded w-24"></div>

        </div>

      </div>

    </div>
  );
};

export default CourseSkeleton;