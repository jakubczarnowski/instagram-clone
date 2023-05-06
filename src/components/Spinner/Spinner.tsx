export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export const Spinner = () => (
  <div className="h-16 w-16 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
);
