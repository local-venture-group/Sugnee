// Components
import JobSearchModal from "../../Modal/JobSearchModal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSuitcase } from "@fortawesome/free-solid-svg-icons";

// Type
interface SearchTypeCardProps {
  text: string;
}
const SearchTypeCard = (props: SearchTypeCardProps) => {
  const { text } = props;

  return (
    <>
      <label
        htmlFor="jobSearchModal"
        className="modal-button card text-primary-content bg-white border-4 border-primary mr-1 w-36 lg:w-1/2 shadow transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105z"
      >
        <div className="card-body justify-center items-center">
          {text === "勤務地" ? (
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-primary mb-2"
              size="3x"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSuitcase}
              className="text-primary mb-2"
              size="3x"
            />
          )}
          <h6 className="mb-1 font-semibold text-xl lg:text-4xl text-gray-600">
            {text}
            <span className="text-base ml-2 hidden md:inline-block">
              からさがす
            </span>
          </h6>
          <p className="text-gray-600 text-xs inline-block md:hidden">
            からさがす
          </p>
        </div>
      </label>
      <input type="checkbox" id="jobSearchModal" className="modal-toggle" />
      <JobSearchModal current={`${text === "勤務地" ? "location" : "type"}`} />
    </>
  );
};

export default SearchTypeCard;
