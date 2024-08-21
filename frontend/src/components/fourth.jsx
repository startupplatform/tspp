import React from "react";
import { Link } from "react-router-dom";

function Fourth() {
  return (
    <div
      className="min-h-[80vh] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/five.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-30"></div>

      <div class="">
        <div class="max-w-5xl px-4 xl:px-0 py-8 lg:pt-14 lg:pb-20 mx-auto">
          <div class="max-w-3xl mb-10 lg:mb-10">
            <h2 class="text-gray-800 font-semibold text-3xl md:text-4xl md:leading-tight">
              Our approach
            </h2>
            <p class="mt-1 text-gray-800">
              This profound insight guides our comprehensive strategy — from
              meticulous research and strategic planning to the seamless
              execution of talent development and events or business promotion.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
            <div class="aspect-w-16 aspect-h-9 lg:aspect-none">
              <img
                class="w-full object-cover rounded-xl"
                src="/jalingo.jpg"
                alt="Features Image"
              />
            </div>

            <div>
              <div class="mb-4">
                <h3 class="text-brown-600 text-xs font-medium uppercase">
                  Steps
                </h3>
              </div>

              <div class="flex gap-x-5 ms-1">
                <div class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div class="relative z-10 size-8 flex justify-center items-center">
                    <span class="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-black font-semibold text-xs uppercase rounded-full">
                      1
                    </span>
                  </div>
                </div>

                <div class="grow pt-0.5 pb-8 sm:pb-12">
                  <p class="text-sm lg:text-base text-neutral-400">
                    <span class="text-brown-600">User Registration: </span>
                    Users will create accounts with email verification.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5 ms-1">
                <div class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div class="relative z-10 size-8 flex justify-center items-center">
                    <span class="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-black font-semibold text-xs uppercase rounded-full">
                      2
                    </span>
                  </div>
                </div>

                <div class="grow pt-0.5 pb-8 sm:pb-12">
                  <p class="text-sm lg:text-base text-neutral-400">
                    <span class="text-brown-600">Entry Submission: </span>
                    Registered users can submit entries in various categories:
                    Events, Businesses, Individuals, Football, etc - Users will
                    be required to provide detailed information about their
                    entry.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5 ms-1">
                <div class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div class="relative z-10 size-8 flex justify-center items-center">
                    <span class="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-black font-semibold text-xs uppercase rounded-full">
                      3
                    </span>
                  </div>
                </div>

                <div class="grow pt-0.5 pb-8 sm:pb-12">
                  <p class="text-sm md:text-base text-neutral-400">
                    <span class="text-brown-600">Voting System: </span>
                    Registered users can upvote entries one vote per entry per
                    user - Entries must have atleast 20 upvotes to be
                    automaticallu displayed on the platform. Users cannot vote
                    for their own entries.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5 ms-1">
                <div class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div class="relative z-10 size-8 flex justify-center items-center">
                    <span class="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-black font-semibold text-xs uppercase rounded-full">
                      4
                    </span>
                  </div>
                </div>

                <div class="grow pt-0.5 pb-8 sm:pb-12">
                  <p class="text-sm md:text-base text-neutral-400">
                    <span class="text-brown-600">News Promotion: </span>
                    If Certain criteria (e.g., sustained popularity, community
                    impact, uniqueness) are met, entries will be promoted in the
                    Taraba Television.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5 ms-1">
                <div class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div class="relative z-10 size-8 flex justify-center items-center">
                    <span class="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-black font-semibold text-xs uppercase rounded-full">
                      5
                    </span>
                  </div>
                </div>

                <div class="grow pt-0.5 pb-8 sm:pb-12">
                  <p class="text-sm md:text-base text-neutral-400">
                    <span class="text-brown-600">User Interaction: </span>
                    Users will be able to comment on entries and also share
                    entries on social media platforms.
                  </p>
                </div>
              </div>

              <div class="flex gap-x-5 ms-1">
                <div class="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div class="relative z-10 size-8 flex justify-center items-center">
                    <span class="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-black font-semibold text-xs uppercase rounded-full">
                      6
                    </span>
                  </div>
                </div>

                <div class="grow pt-0.5 pb-8 sm:pb-12">
                  <p class="text-sm md:text-base text-neutral-400">
                    <span class="text-brown-600">Honorable Mentions: </span>
                    The system randomly selects and feature entries that couldn't
                     reach the 20-upvote threshold - Display these
                    "Honorable Mentions" in a dedicated section, rotating them
                    periodically (e.g., weekly) so as to give everyone a chance.
                  </p>
                </div>
              </div>

              <a
                class="group inline-flex items-center gap-x-2 py-2 px-3 bg-gray-100 font-medium text-sm text-neutral-800 rounded-full focus:outline-none"
                href="#"
              >
                <svg
                  class="shrink-0 size-4"
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  <path
                    class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:delay-100 transition"
                    d="M14.05 2a9 9 0 0 1 8 7.94"
                  ></path>
                  <path
                    class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition"
                    d="M14.05 6A5 5 0 0 1 18 10"
                  ></path>
                </svg>
                Schedule a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fourth;
