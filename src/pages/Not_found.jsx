import React from "react";
import { Link } from "react-router";

const Not_found = () => {
  return (
    <div>
     <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:pb-16 lg:px-6">
    <div className="mx-auto max-w-screen-sm text-center">
        <img className="mx-auto" src="./images/not_found.jpg" alt="not_found" />
      <p className="my-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
        Something's missing.
      </p>
      <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.{" "}
      </p>
      <Link
        to={"/"}
        className="inline-flex text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
      >
        Back to Homepage
      </Link>
    </div>
  </div>
</section>

    </div>
  );
};

export default Not_found;
