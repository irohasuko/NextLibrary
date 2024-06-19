export default function Card({ children }) {
  return (
    <div class="border border-gray-200 p-6 rounded-lg w-full bg-gray-50 hover:bg-blue-200">
      {children}
    </div>
  );
}
