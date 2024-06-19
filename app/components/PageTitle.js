export default function PageTitle({ title }) {
  return (
    <div class="flex flex-wrap w-full my-10 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
        {title}
      </h1>
    </div>
  );
}
