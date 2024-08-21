import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Input,
  Typography,
} from "@material-tailwind/react";
import { EnvelopeSimple } from "@phosphor-icons/react";

function ThirdSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-gray-800 bg-opacity-50"
      //   style={{ backgroundImage: "url('/cov.jpg')" }}
    >
      {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div> */}

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="aspect-w-16 aspect-h-5">
          <img
            class="w-full object-cover rounded-xl"
            src="/in.jpg"
            alt="Features Image"
          />
        </div>

        <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="lg:col-span-1">
            <h2 class="font-bold text-2xl md:text-3xl text-brown-700 dark:text-neutral-200">
              We tackle the challenges you face
            </h2>
            <p class="mt-2 md:mt-4 text-gray-700 ">
              Besides keeping everyone updated with all events and businesses
              upcoming and available, we have built enterprises for giving
              popularity and support to all businessses in taraba state as well
              as all events.
            </p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
              <div class="flex gap-x-5">
                <svg
                  class="shrink-0 mt-1 size-6 text-brown-600 dark:text-brown-500"
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
                  <rect width="18" height="10" x="3" y="11" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" x2="8" y1="16" y2="16" />
                  <line x1="16" x2="16" y1="16" y2="16" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    Creative minds
                  </h3>
                  <p class="mt-1 text-gray-700 ">
                    We give upmost priority to creative people of taraba who
                    have no platfrom to air their creativity.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5">
                <svg
                  class="shrink-0 mt-1 size-6 text-brown-600 dark:text-brown-500"
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
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Simple and affordable
                  </h3>
                  <p class="mt-1 text-gray-700 ">
                    From advertising your corner shop, to promoting your music,
                    there's pretty much nothing you can't do with TSPP.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5">
                <svg
                  class="shrink-0 mt-1 size-6 text-brown-600 dark:text-brown-500"
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    State-leading Advertsiement
                  </h3>
                  <p class="mt-1 text-gray-700 dark:text-neutral-400">
                    Acheiving milestones set on the App can get your event or
                    business on the news daily and can get you sponsorships.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5">
                <svg
                  class="shrink-0 mt-1 size-6 text-brown-600 dark:text-brown-500"
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    Designed for the people
                  </h3>
                  <p class="mt-1 text-gray-700 dark:text-neutral-400">
                    Increase visibility for local businesses and events - Foster
                    community engagement and support for local initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdSection;
