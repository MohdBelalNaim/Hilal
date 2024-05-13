import React from "react";
import { BsArrowLeft} from "react-icons/bs";
import CompactSidebar from "../components/CompactSidebar";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import All from "../components/Search/All";
import People from "../components/Search/People";
import Posts from "../components/Search/Posts";
import Videos from "../components/Search/Videos";

const Search = () => {
  
  const current = useSelector((state) => state.searchSlice.current);
  
  const menu = {
    All: <All />,
    People: <People />,
    Posts: <Posts />,
    Videos: <Videos />,
  };

  return (
    <div>
      <CompactSidebar />
      <div className="hidden max-sm:flex bg-white items-center p-2 gap-3">
        {" "}
        <BsArrowLeft size={22} />
        <input
          type="text"
          className="p-1.5 border rounded-full text-xs w-full"
          placeholder="Search here"
        />
        <Drawer>
          <DrawerTrigger>
            <TbAdjustmentsHorizontal size={22} />
          </DrawerTrigger>
          <DrawerContent className="bg-white h-[300px] p-2">
            <div className="w-full h-full  flex flex-col justify-between">
              <div className="grid gap-y-4">
                <select
                  name=""
                  id=""
                  className="w-full bg-gray-200 p-4 text-sm"
                  style={{ borderRadius: 6 + "px" }}
                >
                  <option value="">Anyone</option>
                  <option value="">Followers</option>
                  <option value="">Following</option>
                </select>
                <select
                  name=""
                  id=""
                  className="w-full bg-gray-200 p-4 text-sm"
                  style={{ borderRadius: 6 + "px" }}
                >
                  <option value="">Location</option>
                  <option value="">Nearby</option>
                  <option value="">Same city</option>
                </select>
                <select
                  name=""
                  id=""
                  className="w-full bg-gray-200 p-4 text-sm"
                  style={{ borderRadius: 6 + "px" }}
                >
                  <option value="">Profession</option>
                  <option value="">Followers</option>
                  <option value="">Following</option>
                </select>
              </div>
              <button
                className="bg-primary text-sm py-2.5 rounded-full"
                style={{ borderRadius: 999999 + "px" }}
              >
                Show Results
              </button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden max-sm:flex  bg-white border-t sticky top-0 z-40">
        {Object.keys(menu).map((item, index) => {
          return (
            <div
              onClick={() => setCurrent(item)}
              className={`text-xs p-3 ${item == current && "active-menu"}`}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="w-[min(560px,96%)] mx-auto pt-4">
        {menu[current]}
        
      </div>
    </div>
  );
};

export default Search;





