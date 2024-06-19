const Main = ({ children }) => {
  return (
    <main class="text-gray-600 body-font">
      <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        {children}
      </div>
    </main>
  );
};

export default Main;
