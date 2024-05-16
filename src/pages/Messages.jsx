import React from "react";
import CompactSidebar from "../components/CompactSidebar";

export const Messages = () => {
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto">
        <div className="py-4 text-lg font-bold">Messages</div>
        <div className="bg-white rounded-md">
          {"abcdefghijklmnop".split("").map((item, index) => {
            return (
              <div className="flex items-center gap-3 p-4 border-b">
                <img
                  src={`https://picsum.photos/400?${index}`}
                  className="size-12 rounded-full max-sm:size-10"
                  alt=""
                />
                <div>
                  <div className="font-bold max-sm:text-sm">
                    Mohd Belal Naim
                  </div>
                  <div className="text-gray-600 max-sm:text-xs">
                    Hi how are you?
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
