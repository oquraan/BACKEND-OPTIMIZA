// import React, { useState } from "react";
// import * as AiIcons from "react-icons/ai";
// import { IconContext } from "react-icons/lib";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { SideBarData } from "./SideBarData";
// import SubMenu from "./SubMenu";

// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
//   transition: 350ms;
//   z-index: 10;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// `;

// const Sidebar = () => {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <IconContext.Provider value={{ color: "#fff" }}>
//       <SidebarNav sidebar={sidebar}>
//         <SidebarWrap>
//           <NavIcon to="#">
//             <AiIcons.AiOutlineClose onClick={showSidebar} />
//           </NavIcon>
//           {SideBarData.map((item, index) => {
//             return <SubMenu item={item} key={index} />;
//           })}
//         </SidebarWrap>
//       </SidebarNav>
//     </IconContext.Provider>
//   );
// };

////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { S } from "./SideBarData";
import SubMenu from "./SubMenu";

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Sidebar = ({ sidebar, showSidebar }) => {
  const [sideData, setSideData] = useState([]);


  const getDataPermission = async (e) => {
  
    try {
      debugger;
      const response = await fetch(
        `https://localhost:7241/api/GetMainMenu/getMenuInUser/${localStorage.getItem(
          "UseId"
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        const mainData = []; 
      
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId === 0) {
            const Data = {
              ParentId: data[i].parentId,
              urlPath: data[i].urlPath,
              objectNameEnglish: data[i].objectNameEnglish,
              ObjectId: data[i].objectId,
              subNav: [],
            };
      
            for (let j = 0; j < data.length; j++) {
              if (data[j].parentId === data[i].objectId) {
                Data.subNav.push({
                  ParentId: data[j].parentId,
                  urlPath: data[j].urlPath,
                  objectNameEnglish: data[j].objectNameEnglish,
                  ObjectId: data[j].objectId,
                });
              }
            }
      
            mainData.push(Data);
          }
        }
      
        setSideData(mainData);
      } else {
        console.error("Failed to fetch menu data:", response.statusText);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getDataPermission();
  }, []);

  const combinedData = [...S, ...sideData];

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#">
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </NavIcon>
          {sideData.map((item, index) => {
          return <SubMenu item={item} key={index} />;
          })}
          {/* {combinedData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })} */}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
