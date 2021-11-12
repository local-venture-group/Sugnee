import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";

// Components
import JobSearchModal from "../Modal/JobSearchModal";
import MobileSearchModal from "../Modal/MobileSearchModal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow sticky top-0 w-full z-50">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link href="/">
              <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                FUK REC
              </a>
            </Link>
          </div>

          {/* Mobile menu button : デザインfixしたら削除します*/}
          {/* <div className="flex lg:hidden">
              {isMobileMenuOpen ? (
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faTimes} size="2x" className="mr-1" />
                </button>
              ) : (
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              )}
            </div> */}

          {/* PC,Tablet Menu */}
          <div className="hidden lg:block -mx-4 lg:flex lg:items-center">
            <label
              htmlFor="jobSearchModal"
              className="btn btn-accent mx-4 mt-2 lg:mt-0"
            >
              求人をさがす
            </label>
            <input
              type="checkbox"
              id="jobSearchModal"
              className="modal-toggle"
            />
            <JobSearchModal current={"location"} />
            {user ? (
              <ul className="flex items-center">
                <Link href="/mypage">
                  <a className="flex items-center mx-4 mt-2 text-sm text-gray-700 lg:mt-0 hover:text-primary">
                    <FontAwesomeIcon icon={faUser} size="2x" className="mr-1" />
                    マイページ
                  </a>
                </Link>
                <button
                  className="flex items-center mx-4 mt-2 text-sm text-gray-700 lg:mt-0 hover:text-primary"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="2x"
                    className="mr-1"
                  />
                  ログアウト
                </button>
              </ul>
            ) : (
              <ul className="flex items-center">
                <Link href="/signup">
                  <a className="flex items-center mx-4 mt-2 text-sm text-gray-700 lg:mt-0 hover:text-primary">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      size="2x"
                      className="mr-1"
                    />
                    新規登録
                  </a>
                </Link>
                <Link href="/login">
                  <a className="flex items-center mx-4 mt-2 text-sm text-gray-700 lg:mt-0 hover:text-primary">
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      size="2x"
                      className="mr-1"
                    />
                    ログイン
                  </a>
                </Link>
              </ul>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-end">
            {user ? (
              <ul className="flex justify-items-end mr-2">
                <Link href="/mypage">
                  <a className="flex flex-col items-center mt-2 mr-2 text-gray-700 hover:text-primary">
                    <FontAwesomeIcon icon={faUser} size="lg" className="mb-1" />
                    <p style={{ fontSize: "0.5rem" }}>マイページ</p>
                  </a>
                </Link>
                <button
                  className="flex flex-col items-center mt-2 text-gray-700 hover:text-primary"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="mb-1"
                  />
                  <p style={{ fontSize: "0.5rem" }}>ログアウト</p>
                </button>
              </ul>
            ) : (
              <ul className="flex justify-items-end mr-2">
                <Link href="/signup">
                  <a className="flex flex-col items-center mt-2 mr-2 text-gray-700 hover:text-primary">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      size="lg"
                      className="mb-1"
                    />
                    <p style={{ fontSize: "0.5rem" }}>新規登録</p>
                  </a>
                </Link>
                {/* デザインfixしたら高さ調整します */}
                <Link href="/login">
                  <a className="flex flex-col items-center mt-2 text-sm text-gray-700 hover:text-primary">
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      size="lg"
                      className="mb-1"
                    />
                    <p style={{ fontSize: "0.5rem" }}>ログイン</p>
                  </a>
                </Link>
              </ul>
            )}
            <label
              htmlFor="mobileSearchModal"
              className="btn rounded-full border-0 hover:shadow h-12 w-12 bg-accent"
            >
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input
              type="checkbox"
              id="mobileSearchModal"
              className="modal-toggle"
            />
            <MobileSearchModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
