export default function BookmarkButton({ text, color, event }) {
  return (
    <button
      type="button"
      className={`btn btn-circle border-0 text-gray-900 bg-white hover:bg-gray-100 text-${color}-500 hover:bg-${color}-100`}
      onClick={event}
    >
      {text}
    </button>
  );
}
