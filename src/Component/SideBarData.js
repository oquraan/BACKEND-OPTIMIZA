import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

const handleLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  
};

export const [sideData, setSideData] = [];
// const [DATA,SETDATA]=({})
// const [DATA2,SETDATA2]=({})
// const[d,setd]=({});
export const getDataPermission = async (e) => {
  try {
    debugger;
    const response = await fetch(
      `https://localhost:7241/api/GetMainMenu/getMenuInUser/${localStorage.getItem(
        "UseId"
      )}`
    );
    if (response.ok) {
      debugger;
      const data = await response.json();
      setSideData(data);

      // for (let index = 0; index < data.length; index++) {

      //   if(data.parentId ===0)
      //   {
      //     SETDATA({

      //       title: data.objectNameEnglish,
      //       path: data.urlPath,
      //       icon: <AiIcons.AiFillHome />,
      //       iconClosed: <RiIcons.RiArrowDownSFill />,
      //       iconOpened: <RiIcons.RiArrowUpSFill />,

      //       subNav: [],

      //     });
      //     if(data.parentId)
      //     SETDATA2({

      //       title: data.objectNameEnglish,
      //       path: data.urlPath,
      //       icon: <AiIcons.AiFillHome />,
      //       iconClosed: <RiIcons.RiArrowDownSFill />,
      //       iconOpened: <RiIcons.RiArrowUpSFill />,

      //     });

      //   }

      //   // for (let index = 0; index < data.length; index++) {
      //   //       if(data.)
      //   // }

      // }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//////////////////////////////////////

export const S = [
  {
    objectNameEnglish: "Overview",
    urlPath: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        objectNameEnglish: "Users",
        urlPath: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        objectNameEnglish: "Revenue",
        urlPath: "/overview/revenue",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    
    objectNameEnglish: "Profile",
    urlPath: "/hello",
    icon: <AiIcons.AiFillHome />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    objectNameEnglish: "HomePage",
    urlPath: "/homePage",
    icon: <AiIcons.AiFillHome />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  // {
  //   title: 'Products',
  //   path: '/products',
  //   icon: <FaIcons.FaCartPlus />
  // },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />
  // },

  {
    objectNameEnglish: "LogOut",
    urlPath: "/",
    icon: <AiIcons.AiFillHome />,
    onclick: () => {
      handleLogOut();
    },
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />
  // }
];

/////////////////////////////////////////

export const SideBarData = [
  {
    title: "Profile",
    path: "/hello",
    icon: <AiIcons.AiFillHome />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "HomePage",
    path: "/homePage",
    icon: <AiIcons.AiFillHome />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Revenue",
        path: "/overview/revenue",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Reports",
        path: "/reports/reports1",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Reports 2",
        path: "/reports/reports2",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Reports 3",
        path: "/reports/reports3",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  // {
  //   title: 'Products',
  //   path: '/products',
  //   icon: <FaIcons.FaCartPlus />
  // },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />
  // },
  {
    title: "Security",
    path: "/security",
    icon: <FaIcons.FaLock />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "User",
        path: "/security/user",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Groups",
        path: "/security/groups",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },

  {
    title: "Permision ",
    path: "/admin",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "A",
        path: "/admin/a",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "B",
        path: "/admin/b",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "C",
        path: "/admin/c",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },

  {
    title: "Public ",
    path: "/public",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "D",
        path: "/public/d",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "E",
        path: "/public/e",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "F",
        path: "/public/f",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },

  { 
    
    onclick: () => {
      handleLogOut();
    },
    title: "LogOut",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />
  // }
];
