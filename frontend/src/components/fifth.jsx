import React from "react";
import { Link } from "react-router-dom";

function Fifth() {
  return (
    <div
      className="min-h-[80vh] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/five.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-30"></div>

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
          <div class="lg:col-span-7">
            <div class="grid grid-cols-1 items-center ">
              <div class="">
                <img class="rounded-xl" src="/legacy.png" alt="Features Image" />
              </div>
            </div>
          </div>

          <div class="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div class="space-y-6 sm:space-y-8">
              <div class="space-y-2 md:space-y-4">
                <h2 class="font-bold text-2xl lg:text-3xl text-gray-800 dark:text-neutral-200">
                  Collaborative tools to Improve livelihood
                </h2>
                <p class="text-gray-500 dark:text-neutral-500">
                  Use our platform to explore Benson Idahosa University and also
                  make your ideas, dreams and vision come true. Then share them
                  easily.
                </p>
              </div>

              <ul class="space-y-2 sm:space-y-4">
                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-brown-100 text-brown-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                      <span class="font-bold">Less routine</span> – more
                      creativity
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-brown-100 text-brown-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                      Hundreds of thousands saved
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-brown-100 text-brown-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                      Scale budgets <span class="font-bold">efficiently</span>
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-brown-100 text-brown-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                      Put a smile on all{" "}
                      <span class="font-bold">Students</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fifth;
