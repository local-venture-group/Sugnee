export default function SearchButton({ text }) {
  return (
    <button
      type="button"
      className={`btn rounded-full border-0 hover:shadow h-24 w-24 bg-gradient-to-r from-primary to-secondary`}
    >
      {text}
    </button>
  );
}
