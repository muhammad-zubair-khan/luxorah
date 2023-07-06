import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Private from "./components/Private";
import Login from "./pages/Auth/Login";
import Resetpassword from "./pages/Auth/Resetpassword";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Home from "./pages/Home/Home";
import Customer from "./pages/Customer/Customers";
import EditCustomer from "./pages/Customer/EditCustomer";
import Product from "./pages/Catalog/Product/Product";
import ProductList from "./pages/Catalog/Product/ProductList";
import EditProduct from "./pages/Catalog/Product/EditProduct";
import Category from "./pages/Catalog/Category/Category";
import CategoryList from "./pages/Catalog/Category/CategoryList";
import EditCategory from "./pages/Catalog/Category/EditCategory";
import Brand from "./pages/Catalog/Brand/Brand";
import BrandList from "./pages/Catalog/Brand/BrandList";
import EditBrand from "./pages/Catalog/Brand/EditBrand";
import Size from "./pages/Catalog/Size/Size";
import SizeList from "./pages/Catalog/Size/SizeList";
import EditSize from "./pages/Catalog/Size/EditSize";
import Color from "./pages/Catalog/Color/Color";
import ColorList from "./pages/Catalog/Color/ColorList";
import EditColor from "./pages/Catalog/Color/EditColor";
import OrderList from "./pages/Order/OrderList";
import OrderDetail from "./pages/Order/OrderDetail";
import Enquiries from "./pages/Enquiries/Enquiries";
import Ratings from "./pages/Ratings/Ratings";

const App = () => {
  // React.useEffect(() => {
  //   console.log(localStorage.getItem("access_token"));
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          {/*Private Routes*/}
          <Route path="" element={<Private />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="customers" element={<Customer />} />
              <Route path="customer/edit/:id" element={<EditCustomer />} />
              <Route path="product" element={<Product />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="product/edit/:id" element={<EditProduct />} />
              <Route path="category" element={<Category />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="category/edit/:id" element={<EditCategory />} />
              <Route path="brand" element={<Brand />} />
              <Route path="brand-list" element={<BrandList />} />
              <Route path="brand/edit/:id" element={<EditBrand />} />
              <Route path="size" element={<Size />} />
              <Route path="size-list" element={<SizeList />} />
              <Route path="size/edit/:id" element={<EditSize />} />
              <Route path="color" element={<Color />} />
              <Route path="color-list" element={<ColorList />} />
              <Route path="color/edit/:id" element={<EditColor />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="comments" element={<Ratings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
