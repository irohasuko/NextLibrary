export default function Button({ children }) {
  return (
    <button class="flex mx-auto mt-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      {children}
    </button>
  );
}
