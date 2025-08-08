export const LayoutLoaders = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar - hidden on small screens */}
      <div className="hidden sm:block sm:w-1/3 md:w-1/4 h-full p-2 ">
        <div className="w-full h-full bg-gray-300 animate-pulse rounded-md"></div>
      </div>

      {/* Middle Chat Area */}
      <div className="w-full sm:w-2/3 md:w-5/12 lg:w-1/2 p-2 overflow-y-auto">
        <div className="space-y-4">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="w-full h-20 bg-gray-300 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - hidden on small & medium screens */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4 h-full p-2">
        <div className="w-full h-full bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};
