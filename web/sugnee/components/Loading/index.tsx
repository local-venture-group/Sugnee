const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-3"></div>
      <h2 className="text-center text-primary text-4xl font-semibold">
        Loading...
      </h2>
      <p className="w-1/3 text-center text-primary">
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default Loading;
