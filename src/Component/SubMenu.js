import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
// Styled components
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
          to={item.urlPath}

      //  to={item.subNav ? "#" : item.urlPath} // If subNav exists, prevent default link behavior
        onClick={item.subNav ? showSubnav : null} // Only toggle subnav if subNav exists
      >
        <div>
          {/* {item.icon} */}
          <SidebarLabel>{item.objectNameEnglish}</SidebarLabel>
        </div>
        {/* <div>{item.subNav && subnav ?<RiIcons.RiArrowUpSFill />:<RiIcons.RiArrowDownSFill /> }</div> */}
        <div>
  {Array.isArray(item.subNav) && item.subNav.length > 0 && (
    subnav ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill />
  )}
</div>

      </SidebarLink>
      {subnav &&
        item.subNav.map((subItem, index) => (
          <DropdownLink to={subItem.urlPath} key={index}>
            {/* {subItem.icon} */}
            <SidebarLabel>{subItem.objectNameEnglish}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
