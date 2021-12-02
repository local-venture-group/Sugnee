import Link from "next/link";
import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <div className="container mx-auto">
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-left xl:inline">404</span>
            <span className="block text-left text-primary xl:inline">
              PAGE NOT FOUND
            </span>
          </h1>
          <p className="mt-3 max-w-md text-base text-left text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            ページが移動したか、削除された可能性があります。
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-20">
            <div className="rounded-md shadow">
              <Link href="/">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:shadow-lg md:py-4 md:text-lg md:px-10">
                  TOPにもどる
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Custom404;
