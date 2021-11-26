import { ReactElement } from "react";

interface BookmarkButtonProps {
  text: ReactElement;
  color: string;
  event: (e) => Promise<void>;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  text,
  color,
  event,
}) => {
  return (
    <button
      type="button"
      className={`btn btn-circle border-0 bg-white hover:bg-gray-100 text-${color}-500 hover:bg-${color}-100`}
      onClick={event}
    >
      {text}
    </button>
  );
};

export default BookmarkButton;
