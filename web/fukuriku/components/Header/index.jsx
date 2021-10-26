import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { AdminContext } from "../../contexts/Admin";

// components
import JobSearchModal from "../JobSearchModal";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { admin, adminLogout } = useContext(AdminContext);

  return (
    <nav className="bg-white shadow sticky top-0 w-full z-50">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <Link href="/">
                <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                  FUK REC
                </a>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className="hidden -mx-4 lg:flex lg:items-center">
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

            {/* {admin ? (
              <button
                className="block mx-4 mt-2 text-sm text-gray-700 lg:mt-0 hover:text-primary"
                onClick={adminLogout}
              >
                管理者ログアウト
              </button>
            ) : (
              <Link href="/adminSignin">
                <a className="block mx-4 mt-2 text-sm text-gray-700 lg:mt-0 hover:text-primary">
                  管理者ログイン
                </a>
              </Link>
            )} */}

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
                <Link href="/signin">
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
        </div>
      </div>
    </nav>
  );
}
