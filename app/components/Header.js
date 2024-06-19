const Header = () => {
  return (
    <header class="bg-gray-50 text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span class="ml-3 text-xl">NextLibrary</span>
        </a>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <a href="/book" class="mr-5 hover:text-gray-900">
            蔵書管理
          </a>
          <a href="/lending" class="mr-5 hover:text-gray-900">
            貸出管理
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
