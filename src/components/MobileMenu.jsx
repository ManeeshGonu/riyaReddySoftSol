import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const MobileMenu = ({ Menus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [nestedClicked, setNestedClicked] = useState(null); // State for nested submenu

  const onToggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
    setNestedClicked(null); // Reset nested submenu state when closing
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: "0",
      overflow: "hidden",
    },
  };

  return (
    <div>
      <button className="z-[999] relative" onClick={onToggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        className="fixed left-0 right-0 top-16 z-[999] h-full overflow-y-auto bg-[#18181A] text-white p-6 backdrop-blur"
      >
        <ul>
          {Menus?.map(({ name, subMenu }, i) => {
            const hasSubMenu = subMenu?.length > 0;
            const isClicked = clicked === i;
            return (
              <li key={`${name}-${i}`}>
                {" "}
                {/* Unique key for each top-level menu */}
                <span
                  className="flex-center-between cursor-pointer hover:bg-white/5 rounded-md p-4 relative"
                  onClick={() => setClicked(isClicked ? null : i)}
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto ${isClicked && "rotate-180"}`}
                    />
                  )}
                </span>
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5"
                  >
                    {subMenu?.map(({ name, icon: Icon, nestedSubMenu }, j) => {
                      const hasNestedSubMenu = nestedSubMenu?.length > 0;
                      const isNestedClicked = nestedClicked === j;

                      return (
                        <li key={`${name}-${i}-${j}`}>
                          {" "}
                          {/* Unique key for each submenu */}
                          <div
                            className="flex-center p-2 cursor-pointer hover:bg-white/5 rounded-md gap-x-2"
                            onClick={() =>
                              setNestedClicked(isNestedClicked ? null : j)
                            }
                          >
                            <Icon size={16} />
                            <span>{name}</span>
                            {hasNestedSubMenu && (
                              <ChevronDown
                                className={`ml-auto ${
                                  isNestedClicked && "rotate-180"
                                }`}
                              />
                            )}
                          </div>
                          {hasNestedSubMenu && (
                            <motion.ul
                              initial="exit"
                              animate={isNestedClicked ? "enter" : "exit"}
                              variants={subMenuDrawer}
                              className="ml-5"
                            >
                              {nestedSubMenu?.map(
                                ({ name, icon: NestedIcon }, k) => (
                                  <li key={`${name}-${i}-${j}-${k}`}>
                                    {" "}
                                    {/* Unique key for each nested submenu */}
                                    <div className="flex-center p-2 cursor-pointer hover:bg-white/5 rounded-md gap-x-2">
                                      <NestedIcon size={16} />
                                      <span>{name}</span>
                                    </div>
                                  </li>
                                )
                              )}
                            </motion.ul>
                          )}
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
