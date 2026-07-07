const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="flex flex-col items-center">

        <div className="w-16 h-16 border-[5px] border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>

        <p className="mt-5 text-lg font-semibold text-gray-600">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loader;