import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishList } from "../../features/User/UserSlice";
import EmptyState from "../../components/EmptyState";
import cross from "../../assets/cross.svg";
import { addToWishList } from "../../features/Cataglog/Product/ProductSlice";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader/Loader";
const WishList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state?.auth?.wishlist?.wishList);
  const { isSuccess,isLoading } = useSelector((state) => state?.auth);
  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getWishList());
    }
  }, [isSuccess]);

  const removeFromWishlist = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getWishList());
    }, 300);
  };

  const hasWishlist = wishlist && wishlist?.length > 0;
  const showFooterOnBottom = !hasWishlist;
  return (
    <>
      <Meta title={"Wishlist | Luxorah"} />
      {isLoading && !isSuccess  ? (
        <>
          <Loader loading={isLoading} />
        </>
      ) : (
      <>
        <div
          className={`container mx-auto mt-28 my-20 ${
            showFooterOnBottom ? "h-screen" : ""
          }`}
        >
          {hasWishlist ? (
            <div className="flex flex-wrap">
              {wishlist?.map((item, index) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
                  key={index}
                >
                  <div className="relative">
                    <button
                      className="absolute top-0 right-0 p-2 bg-transparent border-0"
                      onClick={(e) => {
                        removeFromWishlist(item?._id);
                      }}
                    >
                      <img src={cross} alt="Cross" className="w-4 h-4" />
                    </button>
                    <Link to={`/${item?.slug}/${item?._id}`} className="block">
                      <img
                        src={item?.images[0]?.url}
                        alt=""
                        className="object-contain w-full h-40 rounded-lg"
                      />
                      <p className="mt-2 text-center font-semibold">
                        {item?.title}
                      </p>
                      <p className="mt-1 text-center font-semibold">
                        PKR {item?.price}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {wishlist === null ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                <EmptyState text="No products in your wishlist" />
              )}
            </div>
          )}
        </div>
      </>
      )} 
    </>
  );
};

export default WishList;
