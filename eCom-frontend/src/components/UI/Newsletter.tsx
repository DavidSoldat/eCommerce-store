export default function Newsletter() {
  return (
    <div className="mx-auto mb-10 flex max-w-[1240px] flex-col gap-3 rounded-20 bg-black px-6 py-8 md:flex-row md:items-center md:justify-between md:px-11">
      <h2 className="mb-2 font-[IntegralCF] text-2xl font-extrabold uppercase text-white md:w-1/2 md:text-3xl">
        stay up to date about our latest offers
      </h2>
      <div className="flex flex-wrap gap-3 md:w-1/3 md:flex-col md:flex-nowrap">
        <input
          type="email"
          name="email"
          className="w-full rounded-60 bg-white px-4 py-3 text-sm font-medium text-black"
          placeholder=" Enter your email address"
        />
        <button className="w-full rounded-60 bg-white py-3 text-sm font-medium text-black hover:bg-[#f0f0f0]">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  );
}
