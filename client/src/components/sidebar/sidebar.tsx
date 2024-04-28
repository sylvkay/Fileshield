//imports from React
import React, { useEffect, useState } from "react";

//importing icons
import OverviewIcon from "../../assets/dashboard.svg";
import FileUploadIcon from "../../assets/shopping-cart.png";

import RecordManagementIcon from "../../assets/Users.png";

import SettingsIcon from "../../assets/setting-icon.png";
import Avatar from "../../assets/avatar.png";
import LogoutIcon from "../../assets/logout-03.png";
import ArrowLeftIcon from "../../assets/arrow-left.png";

//importing styles from styled file
import {
  SidebarContainer,
  SidebarNav,
  SidebarTitle,
  SidebarTopLinks,
  SidebarLink,
  SidebarNavBottom,
  SidebarNavBottomLinks,
  UserPanel,
  UserPanelRight,
  UserPanelLeft,
  SideBarTop,
} from "./sidebar.styled";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

//declaration
const Sidebar: React.FC<{
  setIsCollapsedSidebar: (isCollapsed: boolean) => void;
}> = ({ setIsCollapsedSidebar }) => {
  //dispatch
  const dispatch = useDispatch<AppDispatch>();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Define a function to update the window width state
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add event listener to update window width state when the window is resized
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    // Clean up by removing the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SidebarContainer>
      <SideBarTop>
        <SidebarTitle>FileShield</SidebarTitle>
        <img
          src={ArrowLeftIcon}
          alt="Arrow_Left"
          onClick={() => setIsCollapsedSidebar(false)}
        />
      </SideBarTop>

      <span className="main-menu-text">Main Menu</span>
      <SidebarNav>
        <SidebarTopLinks>
          <SidebarLink
            to="/"
            onClick={() => windowWidth <= 867 && setIsCollapsedSidebar(false)}
          >
            <li>
              <img src={OverviewIcon} alt="Dashboard" />
              <span>Overview</span>
            </li>
          </SidebarLink>

          <SidebarLink
            to="/file-upload"
            onClick={() => windowWidth <= 867 && setIsCollapsedSidebar(false)}
          >
            <li>
              <img src={FileUploadIcon} alt="Dashboard" />
              <span>File Upload</span>
            </li>
          </SidebarLink>

          {/* <SidebarLink
            //FIX give better name for route
            to="/decryption-encryption/decrypt/false"
            onClick={() => windowWidth <= 867 && setIsCollapsedSidebar(false)}
          >
            <li>
              <img src={EncryptionIcon} alt="Dashboard" />
              <span>Encryption / Decryption</span>
            </li>
          </SidebarLink> */}

          <SidebarLink
            to="/record-management"
            onClick={() => windowWidth <= 867 && setIsCollapsedSidebar(false)}
          >
            <li>
              <img src={RecordManagementIcon} alt="Dashboard" />
              <span>Record Management</span>
            </li>
          </SidebarLink>
        </SidebarTopLinks>

        <SidebarNavBottom>
          <SidebarNavBottomLinks
            onClick={() => windowWidth <= 867 && setIsCollapsedSidebar(false)}
          >
            <span className="support-text">Support</span>
            {/* <SidebarLink to="/">
              <li>
                <img src={HelpIcon} alt="Help" />
                <span>Help & Support</span>
              </li>
            </SidebarLink> */}
            <SidebarLink
              to="/settings"
              onClick={() => windowWidth <= 867 && setIsCollapsedSidebar(false)}
            >
              <li>
                <img src={SettingsIcon} alt="Help" />
                <span>Settings</span>
              </li>
            </SidebarLink>
          </SidebarNavBottomLinks>

          <UserPanel>
            <UserPanelLeft>
              <img src={Avatar} alt="avatar" />
              <span>{user?.username}</span>
            </UserPanelLeft>

            <UserPanelRight>
              <img src={LogoutIcon} alt="Arrow down" onClick={handleLogout} />
            </UserPanelRight>
          </UserPanel>
        </SidebarNavBottom>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
