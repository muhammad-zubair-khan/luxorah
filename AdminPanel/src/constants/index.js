import { HiViewList } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";
// import { IoCreateOutline } from "react-icons/io";
import { RiWechatPayLine } from "react-icons/ri";

export const items = [
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
          {
            key: "order-detail",
            // icon: <TbListDetails />,
            label: "Order Details",
          },
        ],
      },
      {
        key: "Marketing",
        icon: <TfiAnnouncement />,
        label: "Marketing",
        children: [
          {
            key: "create-coupon",
            // icon: <IoCreateOutline />,
            label: "Create Coupon",
          },
          {
            key: "coupon-list",
            // icon: <HiViewList />,
            label: "Coupons List",
          },
        ],
      },
      {
        key: "enquiries",
        icon: <RiWechatPayLine />,
        label: "Enquiries",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
]