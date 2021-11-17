import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="mt-60 p-10 footer bg-base-200 text-base-content footer-center">
      <div>
        <Link href="/">
          <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
            FUK REC
          </a>
        </Link>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://twitter.com/MegEngineer"
            className="hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a
            href="https://twitter.com/MegEngineer"
            className="hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a
            href="https://twitter.com/MegEngineer"
            className="hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </div>
      </div>
      <div className="grid grid-flow-col gap-4">
        <Link href="/">
          <a className="link link-hover">採用をご検討中の企業様へ</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">よくあるご質問</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">お問い合わせ</a>
        </Link>
      </div>
      <div className="grid grid-flow-col gap-4">
        <Link href="/terms">
          <a className="link link-hover">利用規約</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">プライバシーポリシー</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">運営会社</a>
        </Link>
      </div>
      <div>
        <p>
          Copyright © 2021 - All right reserved by Recruiting Partners Co.,Ltd.
        </p>
      </div>
    </footer>
  );
}
