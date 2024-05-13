import React from "react";
import CompactSidebar from "../components/CompactSidebar";
import { BsSunrise } from "react-icons/bs";
import { FaBook, FaPray } from "react-icons/fa";
import { FaBookOpen, FaCalculator, FaCoins } from "react-icons/fa6";
import { TbNumbers } from "react-icons/tb";
const IslamSection = () => {
  return (
    <div className="h-[100dvh]">
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto py-4">
        <div
          className="shadow p-6 max-sm:px-2 py-3 overflow-hidden mb-4 bg-[url('https://img.freepik.com/premium-vector/pink-islamic-mandala-background_629533-44.jpg')] pb-12 max-sm:pb-4"
          style={{ borderRadius: 6 + "px" }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-lg max-sm:text-sm">
                Markaz Masjid
              </div>
              <div className="text-sm font-bold max-sm:text-xs">
                Aminabad, Lucknow
              </div>
            </div>
            <div>
              <div className="font-bold tetx-lg max-sm:text-sm ">
                13 February, 2024
              </div>
              <div className="text-sm font-bold max-sm:text-xs">
                03 Sha'ban, 1445 AH
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 max-sm:gap-1 gap-3 mt-6 items-center">
            <div
              className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
              style={{ borderRadius: 6 + "px" }}
            >
              <div>
                <BsSunrise className="primary text-4xl max-sm:text-3xl" />
              </div>
              <div className="font-bold max-sm:text-xs max-sm:font-normal ">
                FAJAR
              </div>
              <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
                6:03 am
              </div>
            </div>
            <div
              className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
              style={{ borderRadius: 6 + "px" }}
            >
              <div>
                <BsSunrise className="primary text-4xl max-sm:text-3xl" />
              </div>
              <div className="font-bold max-sm:text-xs max-sm:font-normal ">
                DUHUR
              </div>
              <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
                6:03 am
              </div>
            </div>
            <div
              className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
              style={{ borderRadius: 6 + "px" }}
            >
              <div>
                <BsSunrise className="primary text-4xl max-sm:text-3xl" />
              </div>
              <div className="font-bold max-sm:text-xs max-sm:font-normal ">
                ASR
              </div>
              <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
                6:03 am
              </div>
            </div>
            <div
              className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
              style={{ borderRadius: 6 + "px" }}
            >
              <div>
                <BsSunrise className="primary text-4xl max-sm:text-3xl" />
              </div>
              <div className="font-bold max-sm:text-xs max-sm:font-normal ">
                MAGRIB
              </div>
              <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
                6:03 am
              </div>
            </div>
            <div
              className="flex flex-col bg-white shadow-xl justify-center items-center py-4 rounded-md"
              style={{ borderRadius: 6 + "px" }}
            >
              <div>
                <BsSunrise className="primary text-4xl max-sm:text-3xl" />
              </div>
              <div className="font-bold max-sm:text-xs max-sm:font-normal ">
                ISHA
              </div>
              <div className="text-gray-600 font-bold text-sm max-sm:text-xs max-sm:font-normal ">
                6:03 am
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-md py-6 shadow p-2 text-center">
            <div className="flex gap-3 justify-center flex-col items-center">
              <FaPray size={32} />
              <div className="max-sm:text-xs">Namaz timings</div>
            </div>
          </div>
          <div className="bg-white rounded-md py-6 shadow p-2 text-center">
            <div className="flex gap-3 justify-center flex-col items-center">
              <FaBook size={32} />
              <div className="max-sm:text-xs">Quran</div>
            </div>
          </div>
          <div className="bg-white rounded-md py-6 shadow p-2 text-center">
            <div className="flex gap-3 justify-center flex-col items-center">
              <FaBookOpen size={32} />
              <div className="max-sm:text-xs">Hadith</div>
            </div>
          </div>
          <div className="bg-white rounded-md py-6 shadow p-2 text-center">
            <div className="flex gap-3 justify-center flex-col items-center">
              <FaCalculator size={32} />
              <div className="max-sm:text-xs">Zakat calculator</div>
            </div>
          </div>
          <div className="bg-white rounded-md py-6 shadow p-2 text-center">
            <div className="flex gap-3 justify-center flex-col items-center">
              <FaCoins size={32} />
              <div className="max-sm:text-xs">Donate zakat</div>
            </div>
          </div>
          <div className="bg-white rounded-md py-6 shadow p-2 text-center">
            <div className="flex gap-3 justify-center flex-col items-center">
              <TbNumbers size={32} />
              <div className="max-sm:text-xs">Tasbeeh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamSection;
