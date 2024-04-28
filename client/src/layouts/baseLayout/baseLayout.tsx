//imports from react
import { useEffect, useState } from "react";

//imports from react-=router-dom
import { Outlet } from "react-router-dom";

//imorting sidebar
import Sidebar from "@/components/sidebar/sidebar";

//importing styles from styled file
import {
  LayoutContainer,
  LayoutHeader,
  LayoutHeaderCenter,
  LayoutHeaderLeft,
  LayoutHeaderRight,
  LayoutLeft,
  LayoutRight,
} from "./baseLayout.styled";

//icon imports
import SearchIcon from "../../assets/search (1).png";
import NotificationIcon from "../../assets/notification.png";
import Avatar from "../../assets/avatar.png";
import MenuIcon from "../../assets/Menu (1).svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setSearchQuery } from "@/redux/slices/fileSlice";

//declaration
const BaseLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuerySearch = (e: any) => {
    dispatch(setSearchQuery(e.target.value));
  };

  //fetch user from state
  const user = useSelector((state: RootState) => state.auth.user);

  //determining whethere the sidebabr is open
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false);

  //sets the windows width
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

  //checks the corresponding width of the window and sets the sidebar accordingly
  useEffect(() => {
    if (windowWidth >= 867) {
      setIsCollapsedSidebar(true);
    }
  }, [windowWidth]);

  //checks the corresponding width of the window and sets the sidebar accordingly
  useEffect(() => {
    if (windowWidth < 867) {
      setIsCollapsedSidebar(false);
    }

    dispatch(setSearchQuery(null));
  }, []);

  return (
    <LayoutContainer>
      <LayoutLeft
        style={isCollapsedSidebar ? { left: "0" } : { left: "-100%" }}
      >
        <Sidebar setIsCollapsedSidebar={setIsCollapsedSidebar} />
      </LayoutLeft>
      <LayoutRight>
        <img
          src={MenuIcon}
          alt="Menu"
          className="menu-icon"
          onClick={() => setIsCollapsedSidebar(true)}
        />
        <LayoutHeader>
          <LayoutHeaderLeft>
            <span className="big-text">Hi {user?.username}</span>
            <span className="small-text">{user?.email}</span>
          </LayoutHeaderLeft>
          <LayoutHeaderCenter>
            <img src={SearchIcon} alt="Search" />
            <input
              type="text"
              placeholder="Search for files"
              onChange={handleQuerySearch}
            />
          </LayoutHeaderCenter>
          <LayoutHeaderRight>
            <div className="notification">
              <img src={NotificationIcon} alt="Notification" />
            </div>
            <img src={Avatar} alt="Avatar" />
          </LayoutHeaderRight>
        </LayoutHeader>

        <div className="layout-outlet">
          <Outlet />
        </div>
      </LayoutRight>
    </LayoutContainer>
  );
};

export default BaseLayout;
