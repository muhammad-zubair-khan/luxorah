import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import { RiWechatPayLine } from "react-icons/ri";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo2.png";
import Reslogo from "../assets/logo3.png";
// import Reslogo from "../assets/dark-logo.png";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">
            {collapsed ? (
              <Link to="/">
                <img
                  src={Reslogo}
                  style={{ filter: "brightness(56.5)" }}
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src={logo}
                  style={{ filter: "brightness(60.5)" }}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => {
              if (key == "logout") {
                handleLogout();
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <HomeOutlined />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <UserOutlined />,
                label: "Customers",
              },
              {
                key: "Catalog",
                icon: <AppstoreOutlined />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    // icon: <IoIosAdd />,
                    label: "Add Product",
                  },
                  {
                    key: "product-list",
                    // icon: <HiViewList />,
                    label: "Product List",
                  },
                  {
                    key: "category",
                    // icon: <IoIosAdd />,
                    label: "Add Category",
                  },
                  {
                    key: "category-list",
                    // icon: <HiViewList />,
                    label: "Category List",
                  },
                  {
                    key: "brand",
                    // icon: <IoIosAdd />,
                    label: "Brand",
                  },
                  {
                    key: "brand-list",
                    // icon: <HiViewList />,
                    label: "brand List",
                  },
                  {
                    key: "size",
                    // icon: <IoIosAdd />,
                    label: "Size",
                  },
                  {
                    key: "size-list",
                    // icon: <HiViewList />,
                    label: "Size List",
                  },
                  {
                    key: "color",
                    // icon: <IoIosAdd />,
                    label: "Color",
                  },
                  {
                    key: "color-list",
                    // icon: <HiViewList />,
                    label: "Color List",
                  },
                ],
              },
              {
                key: "Order",
                icon: <AiOutlineShoppingCart />,
                label: "Orders",
                children: [
                  {
                    key: "order-list",
                    // icon: <HiViewList />,
                    label: "Order List",
                  },
                ],
              },

              {
                key: "enquiries",
                icon: <RiWechatPayLine />,
                label: "Enquiries",
              },
              {
                key: "comments",
                icon: <RiWechatPayLine />,
                label: "Comments",
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Logout",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Button
              type="text"
              icon={<BellOutlined />}
              // onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                float: "right",
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Toaster />
    </>
  );
};

export default MainLayout;
