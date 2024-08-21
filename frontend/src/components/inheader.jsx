import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Collapse,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  List as ListIcon,
  SignIn,
  HouseLine,
  DiscoBall,
  IdentificationBadge,
  BuildingApartment,
  Ladder,
  Cross,
  Student,
  UserCircleGear,
  CaretDown,
  CaretUp,
  Stack,
  Building,
  Sparkle,
  Books,
  Book,
  Motorcycle,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

function NavList() {
  const location = useLocation();
  const [openPopovers, setOpenPopovers] = useState({});

  const navItems = [
    { path: "/start", label: "Home" },
    {
      label: "Entries",
      children: [
        { path: "/dashboard", label: "All Entries" },
        { path: "/addevent", label: "My Entries" },
      ],
    },
    {
      label: "Business",
      children: [
        { path: "/business", label: "Businesses" },
        { path: "/student", label: "Student's Businesses" },
      ],
    },
    {
      label: "Events",
      children: [{ path: "/topevent", label: "Religious Events" }],
    },
    { path: "/individual", label: "Individuals" },
    { path: "/advert", label: "Advert" },
  ];

  const togglePopover = (label) => {
    setOpenPopovers((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    return (
      item.children &&
      item.children.some((child) => location.pathname === child.path)
    );
  };

  return (
    <ul className="my-2 flex flex-row gap-6 lg:mb-0 lg:mt-0 lg:items-center">
      {navItems.map((item) => (
        <li key={item.label}>
          {item.children ? (
            <Popover
              open={openPopovers[item.label]}
              handler={() => togglePopover(item.label)}
            >
              <PopoverHandler>
                <Typography
                  as="div"
                  variant="small"
                  color="blue-gray"
                  className={`p-1 font-medium cursor-pointer ${
                    isActive(item) ? "text-white font-bold" : "hover:text-white"
                  }`}
                >
                  <span className="flex items-center">
                    {item.label}
                    {openPopovers[item.label] ? (
                      <CaretUp className="ml-1" />
                    ) : (
                      <CaretDown className="ml-1" />
                    )}
                  </span>
                </Typography>
              </PopoverHandler>
              <PopoverContent className="bg-slate-800 border-none">
                <ul className="py-1">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className={`block px-4 py-2 text-sm ${
                          location.pathname === child.path
                            ? "bg-blue-gray-700 text-white font-bold"
                            : "text-gray-300 hover:bg-blue-gray-600 hover:text-white"
                        }`}
                        onClick={() => togglePopover(item.label)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <Typography
              as="div"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <Link
                to={item.path}
                className={`flex items-center transition-colors ${
                  isActive(item) ? "text-white font-bold" : "hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </Typography>
          )}
        </li>
      ))}
      <Link to="/">
        <Button size="sm" color="red">
          Sign Out
        </Button>
      </Link>
    </ul>
  );
}

export function InHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState({});

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const toggleAccordion = (label) => {
    setOpenAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const drawerItems = [
    { path: "/start", label: "Home", icon: HouseLine },
    {
      label: "Entries",
      icon: Ladder,
      children: [
        { path: "/addevent", label: "My Entries", icon: UserCircleGear },
        { path: "/dashboard", label: "All Entries", icon: Stack },
      ],
    },
    {
      label: "Business",
      icon: BuildingApartment,
      children: [
        { path: "/student", label: "Student's Businesses", icon: Student },
        { path: "/business", label: "Other Businesses", icon: Building },
      ],
    },
    {
      label: "Religious Events",
      icon: Books,
      children: [
        { path: "/topevent", label: "Christain Events", icon: Cross },
        { path: "/topevent", label: "Islamic Events", icon: Book },
      ],
    },
    { path: "/topevent", label: "Other Events", icon: DiscoBall },
    { path: "/delivery", label: "Delivery Service", icon: Motorcycle },
    { path: "/individual", label: "Individuals", icon: IdentificationBadge },
    { path: "/advert", label: "Advertisement", icon: Sparkle },
  ];

  const isActive = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    return (
      item.children &&
      item.children.some((child) => location.pathname === child.path)
    );
  };

  useEffect(() => {
    // Open accordions for active items on small screens
    const newOpenAccordions = {};
    drawerItems.forEach((item) => {
      if (item.children && isActive(item)) {
        newOpenAccordions[item.label] = true;
      }
    });
    setOpenAccordions(newOpenAccordions);
  }, [location.pathname]);

  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3 relative lg:top-3 bg-slate-900 rounded-none border-none z-50 ">
        <div className="flex justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            TSPP
          </Typography>
          <div className="hidden lg:flex">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-10 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={openDrawer}
          >
            <ListIcon size={24} />
          </IconButton>
        </div>
      </Navbar>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4 bg-brown-100 lg:hidden max-h-fit"
      >
        <div className="mb-2 flex items-center justify-between text-center">
          <Typography variant="h5" color="blue-gray" className="ml-24">
            Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          {drawerItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.children ? (
                <div
                  className={`rounded-lg ${
                    isActive(item) ? "bg-gray-100" : ""
                  }`}
                >
                  <ListItem
                    onClick={() => toggleAccordion(item.label)}
                    className={isActive(item) ? "text-brown-500 font-bold" : ""}
                  >
                    <ListItemPrefix>
                      <item.icon size={20} className="text-accent-700" />
                    </ListItemPrefix>
                    {item.label}
                    {openAccordions[item.label] ? (
                      <CaretUp className="ml-auto" />
                    ) : (
                      <CaretDown className="ml-auto" />
                    )}
                  </ListItem>
                  <Collapse open={openAccordions[item.label]}>
                    <List className="pl-4">
                      {item.children.map((child) => (
                        <Link to={child.path} key={child.path}>
                          <ListItem
                            className={
                              location.pathname === child.path
                                ? "bg-blue-gray-100 text-brown-500 font-bold"
                                : ""
                            }
                          >
                            <ListItemPrefix>
                              <child.icon
                                size={20}
                                className="text-accent-700"
                              />
                            </ListItemPrefix>
                            {child.label}
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </div>
              ) : (
                <Link to={item.path}>
                  <ListItem
                    className={
                      location.pathname === item.path
                        ? "bg-white text-brown-500 font-bold"
                        : "mt-1"
                    }
                  >
                    <ListItemPrefix>
                      <item.icon size={20} className="text-accent-700" />
                    </ListItemPrefix>
                    {item.label}
                  </ListItem>
                </Link>
              )}
            </React.Fragment>
          ))}
        </List>
        <Link to="/">
          <Button
            className="relative top-4 w-[70%] m-auto flex justify-center items-center"
            variant="outlined"
            size="sm"
          >
            <span className="mr-2">Sign Out</span>
            <SignIn size={20} />
          </Button>
        </Link>
      </Drawer>
    </>
  );
}
