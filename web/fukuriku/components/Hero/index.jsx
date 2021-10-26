export default function Hero({ SearchCard, workTypes }) {
  return (
    <div
      className="w-full h-96 bg-gradient-to-b from-primary to-secondary"
      style={{
        background: "linear-gradient(to top bottom,#23a9ca,#1fe9d8)",
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">
            Fukuoka Recruiting
          </h1>
          <div className="flex justify-center items-center w-full px-4 pt-10">
            {["勤務地", "職種"].map((text, i) => (
              <SearchCard text={text} key={i} workTypes={workTypes} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
