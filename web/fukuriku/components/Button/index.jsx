export default function Button({ text, type, size, shape, option, event }) {
  return (
    <button
      type={type}
      className={`btn btn-primary border-0 hover:shadow px-8 rounded-xl ${
        shape === "circle" && "btn-circle"
      } btn-${size} ${option} `}
      onClick={event}
    >
      {text}
    </button>
  );
}
