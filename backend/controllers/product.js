const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/user");
const Auth = require("../models/auth");
const slugify = require("slugify");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { UploadImageOnCloudinary } = require("../utils/cloudinary");
const ApiFeatures = require("../utils/apifeatures");
const {
  convertPrice,
  getCurrencyByRegion,
} = require("../utils/currencyChanger");

//Create Product
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json({
      success: true,
      message: "Product Created Successfully",
      newProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Product
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Product updated Successfully",
      updateProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Product deleted Successfully",
      deleteProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get all Products
exports.getProducts = asyncHandler(async (req, res) => {
  const { region } = req.query;
  try {
    // Filtering
    const queryObj = { ...req.query };

    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((element) => delete queryObj[element]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr))
      .populate("category")
      .populate("color");

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Execute the query
    const products = await query;

    // Get total count for pagination
    const totalCount = await Product.countDocuments(queryObj);

    // Pagination information
    const pagination = {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    };

    // Create pagination links for next and previous pages
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;
    const links = {};
    if (page > 1) {
      links.prev = `${baseUrl}?page=${page - 1}&limit=${limit}`;
    }
    if (page < pagination.totalPages) {
      links.next = `${baseUrl}?page=${page + 1}&limit=${limit}`;
    }

    //Currency Price
    const productsWithPrices = products.map((product) => {
      const { price } = product;
      const convertedPrice = convertPrice(price, getCurrencyByRegion(region));
      let currencySymbol = "";

      switch (getCurrencyByRegion(region)) {
        case "PKR":
          currencySymbol = "PKR";
          break;
        case "USD":
          currencySymbol = "$";
          break;
        case "AED":
          currencySymbol = "AED";
          break;
        case "GBP":
          currencySymbol = "£";
          break;
        case "OMR":
          currencySymbol = "OMR";
          break;
        case "EUR":
          currencySymbol = "€";
          break;
        case "INR":
          currencySymbol = "₹";
          break;
        // Add more cases for other currencies as needed
        default:
          currencySymbol = "";
      }

      return { ...product._doc, price: `${currencySymbol}${convertedPrice}` };
    });

    res.status(200).json({
      pagination,
      links,
      products: productsWithPrices,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a Product
exports.getProduct = asyncHandler(async (req, res) => {
  const { id, region } = req.params;
  validateMongodbId(id);
  try {
    const product = await Product.findById(id).populate("color");

    if (!product) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    const convertedPrice = convertPrice(
      product.price,
      getCurrencyByRegion(region)
    );
    let currencySymbol = "";

    switch (getCurrencyByRegion(region)) {
      case "PKR":
        currencySymbol = "PKR";
        break;
      case "USD":
        currencySymbol = "$";
        break;
      case "AED":
        currencySymbol = "AED";
        break;
      case "GBP":
        currencySymbol = "£";
        break;
      case "OMR":
        currencySymbol = "OMR";
        break;
      case "EUR":
        currencySymbol = "€";
        break;
      case "INR":
        currencySymbol = "₹";
        break;
      // Add more cases for other currencies as needed
      default:
        currencySymbol = "";
    }

    const productWithDetails = {
      ...product._doc,
      price: `${currencySymbol}${convertedPrice}`,
    };

    res.status(200).json(productWithDetails);
  } catch (error) {
    throw new Error(error);
  }
});

//get product by slug
//without pagination
// exports.getProductsBySlug = asyncHandler(async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const { region, sort, brand, min, max, ratings } = req.query;
//     const category = await Category.findOne({ slug }).select("_id").lean();

//     if (!category) {
//       res.status(404).json({
//         error: "No Product Found",
//       });
//       return;
//     }

//     let products = await Product.find({ category: category._id })
//       .populate("color")
//       .lean();

//     // Filter products based on the selected option
//     if (sort === "popular") {
//       products = products.filter((product) => product.tags.includes("popular"));
//     } else if (sort === "special") {
//       products = products.filter((product) => product.tags.includes("special"));
//     } else if (sort === "featured") {
//       products = products.filter((product) =>
//         product.tags.includes("featured")
//       );
//     }

//     // Filter products based on the selected brand
//     if (brand) {
//       products = products.filter((product) => product.brand === brand);
//     }

//     // Filter products based on minimum and maximum prices
//     if (min && max) {
//       products = products.filter((product) => {
//         const productPrice = convertPrice(
//           product.price,
//           getCurrencyByRegion(region)
//         );
//         return productPrice >= min && productPrice <= max;
//       });
//     }

//     // Filter products based on ratings
//     if (ratings) {
//       const selectedRatings = ratings;
//       products = products.filter((product) =>
//         selectedRatings.includes(product.totalRatings)
//       );
//     }

//     //Currency Price
//     const productsWithPrices = products.map((product) => {
//       const { price } = product;
//       const convertedPrice = convertPrice(price, getCurrencyByRegion(region));
//       let currencySymbol = "";

//       switch (getCurrencyByRegion(region)) {
//         case "PKR":
//           currencySymbol = "PKR";
//           break;
//         case "USD":
//           currencySymbol = "$";
//           break;
//         case "AED":
//           currencySymbol = "AED";
//           break;
//         case "GBP":
//           currencySymbol = "£";
//           break;
//         case "OMR":
//           currencySymbol = "OMR";
//           break;
//         case "EUR":
//           currencySymbol = "€";
//           break;
//         // Add more cases for other currencies as needed
//         default:
//           currencySymbol = "";
//       }

//       return { ...product, price: `${currencySymbol}${convertedPrice}` };
//     });

//     res.status(200).json(productsWithPrices);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
//with Pagination
// exports.getProductsBySlug = asyncHandler(async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const { region, sort, brand, min, max, ratings, page, limit } = req.query;
//     const category = await Category.findOne({ slug }).select("_id").lean();

//     if (!category) {
//       res.status(404).json({
//         error: "No Product Found",
//       });
//       return;
//     }

//     let query = Product.find({ category: category._id })
//       .populate("color")
//       .lean();

//     // Filter products based on the selected option
//     if (sort === "popular") {
//       query = query.where("tags").in(["popular"]);
//     } else if (sort === "special") {
//       query = query.where("tags").in(["special"]);
//     } else if (sort === "featured") {
//       query = query.where("tags").in(["featured"]);
//     }

//     // Filter products based on the selected brand
//     if (brand) {
//       query = query.where("brand").equals(brand);
//     }

//     // Filter products based on minimum and maximum prices
//     if (min && max) {
//       const convertedMinPrice = convertPrice(min, getCurrencyByRegion(region));
//       const convertedMaxPrice = convertPrice(max, getCurrencyByRegion(region));
//       query = query.where("price").gte(convertedMinPrice).lte(convertedMaxPrice);
//       // query = query.where("price").gte(min).lte(max);
//     }

//     // Filter products based on ratings
//     if (ratings) {
//       const selectedRatings = ratings.split(",");
//       query = query.where("totalRatings").in(selectedRatings);
//     }

//     // Pagination
//     const parsedPage = parseInt(page) || 1;
//     const parsedLimit = parseInt(limit) || 10;
//     const skip = (parsedPage - 1) * parsedLimit;

//     query = query.skip(skip).limit(parsedLimit);

//     const products = await query.exec();

//     // Get total count for pagination
//     const totalCount = await Product.countDocuments({ category: category._id });

//     // Currency Price
//     const productsWithPrices = await Promise.all(
//       products.map(async (product) => {
//         const { price } = product;
//         const convertedPrice = await convertPrice(
//           price,
//           getCurrencyByRegion(region)
//         );
//         let currencySymbol = "";

//         switch (getCurrencyByRegion(region)) {
//           case "PKR":
//             currencySymbol = "PKR";
//             break;
//           case "USD":
//             currencySymbol = "$";
//             break;
//           case "AED":
//             currencySymbol = "AED";
//             break;
//           case "GBP":
//             currencySymbol = "£";
//             break;
//           case "OMR":
//             currencySymbol = "OMR";
//             break;
//           case "EUR":
//             currencySymbol = "€";
//             break;
//             case "INR":
//               currencySymbol = "₹";
//               break;
//           // Add more cases for other currencies as needed
//           default:
//             currencySymbol = "";
//         }

//         return { ...product, price: `${currencySymbol}${convertedPrice}` };
//       })
//     );

//     // Calculate pagination links
//     const totalPages = Math.ceil(totalCount / parsedLimit);
//     const hasNextPage = parsedPage < totalPages;
//     const hasPrevPage = parsedPage > 1;
//     const nextPage = hasNextPage ? parsedPage + 1 : null;
//     const prevPage = hasPrevPage ? parsedPage - 1 : null;

//     res.status(200).json({
//       total: totalCount,
//       page: parsedPage,
//       limit: parsedLimit,
//       products: productsWithPrices,
//       hasNextPage,
//       hasPrevPage,
//       nextPage,
//       prevPage,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });
exports.getProductsBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const { region, sort, brand, ratings, page, limit, min, max } = req.query;
    const category = await Category.findOne({ slug }).select("_id").lean();

    if (!category) {
      res.status(404).json({
        error: "No Product Found",
      });
      return;
    }

    let query = Product.find({ category: category._id })
      .populate("color")
      .lean();

    // Filter products based on the selected option
    if (sort === "popular") {
      query = query.where("tags").in(["popular"]);
    } else if (sort === "special") {
      query = query.where("tags").in(["special"]);
    } else if (sort === "featured") {
      query = query.where("tags").in(["featured"]);
    }

    // Filter products based on the selected brand
    if (brand) {
      query = query.where("brand").equals(brand);
    }

    // Filter products based on ratings
    if (ratings) {
      const selectedRatings = ratings.split(",");
      query = query.where("totalRatings").in(selectedRatings);
    }

   // Filter products based on price range
  //  if (min && max) {
  //    query = query.where("price").gte(min).lte(max);
  //  } else if (min) {
  //    query = query.where("price").gte(min);
  //  } else if (max) {
  //    query = query.where("price").lte(max);
  //  }
  const convertedMinPrice = convertPrice(min, getCurrencyByRegion(region));
  const convertedMaxPrice = convertPrice(max, getCurrencyByRegion(region));
   if (min && max) {
     query = query.where("price").gte(convertedMinPrice).lte(convertedMaxPrice);
   } else if (min) {
     query = query.where("price").gte(convertedMinPrice);
   } else if (max) {
     query = query.where("price").lte(convertedMaxPrice);
   }
 

    // Pagination
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;

    query = query.skip(skip).limit(parsedLimit);

    const products = await query.exec();

    // Get total count for pagination
    const totalCount = await Product.countDocuments({ category: category._id });

    // Currency Price
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        const { price } = product;
        // const convertedPrice = await convertPrice(
        //   price,
        //   getCurrencyByRegion(region)
        // );
        const convertedPrice = await convertPrice(parseFloat(price), getCurrencyByRegion(region));
        let currencySymbol = "";

        switch (getCurrencyByRegion(region)) {
          case "PKR":
            currencySymbol = "PKR";
            break;
          case "USD":
            currencySymbol = "$";
            break;
          case "AED":
            currencySymbol = "AED";
            break;
          case "GBP":
            currencySymbol = "£";
            break;
          case "OMR":
            currencySymbol = "OMR";
            break;
          case "EUR":
            currencySymbol = "€";
            break;
          case "INR":
            currencySymbol = "₹";
            break;
          // Add more cases for other currencies as needed
          default:
            currencySymbol = "";
        }

        return { ...product, price: `${currencySymbol}${convertedPrice}` };
      })
    );

    // Calculate pagination links
    const totalPages = Math.ceil(totalCount / parsedLimit);
    const hasNextPage = parsedPage < totalPages;
    const hasPrevPage = parsedPage > 1;
    const nextPage = hasNextPage ? parsedPage + 1 : null;
    const prevPage = hasPrevPage ? parsedPage - 1 : null;

    res.status(200).json({
      total: totalCount,
      page: parsedPage,
      limit: parsedLimit,
      products: productsWithPrices,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    });
  } catch (error) {
    throw new Error(error);
  }
});


//Add to WishList
exports.addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  validateMongodbId(_id);
  const { productId } = req.body;

  // Check if the token exists
  // if (
  //   !req.headers.authorization ||
  //   !req.headers.authorization.startsWith("Bearer")
  // ) {
  //   return res
  //     .status(401)
  //     .json({ message: "Not authorized, no token provided" });
  // }

  try {
    const user = await Auth.findById(_id);
    if (user.wishList.includes(productId)) {
      // Item already exists in the wishlist, remove it
      await Auth.findByIdAndUpdate(_id, {
        $pull: { wishList: productId },
      });
      res.status(200).json({ message: "Item removed from wishlist", user });
    } else {
      // Item doesn't exist in the wishlist, add it
      await Auth.findByIdAndUpdate(_id, {
        $push: { wishList: productId },
      });
      res.status(200).json({ message: "Item added to wishlist", user });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Add Ratings and Comment
exports.ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const { star, comment, firstName, productId } = req.body;
  try {
    let product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: {
            $elemMatch: alreadyRated,
          },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.firstName": firstName,
            "ratings.$.comment": comment,
          },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              firstName: firstName,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }

    const getAllRatings = await Product.findById(productId);
    let totalRating = getAllRatings.ratings.length;
    let ratingsSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRatings = Math.round(ratingsSum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      productId,
      { totalRatings: actualRatings },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//Get All Ratings
// exports.getRatings = asyncHandler(async (req, res) => {
//   try {
//     const ratings = await Product.find({}, "ratings").populate(
//       "ratings.postedby"
//     ); // Populate the 'postedby' field with user's 'username'
//     const allRatings = ratings?.map((product) => product.ratings).flat(); // Flatten the ratings array

//     // Extract only the necessary fields from populated 'postedby' object
//     const populatedRatings = allRatings?.map((rating) => ({
//       star: rating?.star,
//       firstName: rating?.firstName,
//       comment: rating?.comment,
//       postedby: rating?.postedby?.firstname, // Access the 'username' field of the populated 'postedby' object
//     }));

//     res.json(populatedRatings);
//   } catch (error) {
//     throw new Error("Failed to get ratings: " + error.message);
//   }
// });

exports.getRatings = asyncHandler(async (req, res) => {
  try {
    const ratings = await Product.find({}, "ratings").populate({
      path: "ratings.postedby",
      select: "name",
    }); // Populate the 'postedby' field with user's 'firstName' only

    const allRatings = ratings?.map((product) => product.ratings).flat(); // Flatten the ratings array

    // Extract the necessary fields from ratings and the populated 'postedby' object
    const populatedRatings = allRatings?.map((rating) => ({
      _id: rating?._id,
      star: rating?.star,
      firstName: rating?.firstName,
      comment: rating?.comment,
      postedby: rating?.postedby?.name,
    }));

    res.json(populatedRatings);
  } catch (error) {
    throw new Error("Failed to get ratings: " + error.message);
  }
});

//Delete Rating
exports.deleteRating = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const product = await Product.findOne({ "ratings._id": id });

    if (!product) {
      return res.status(404).json({ message: "Product or Rating not found" });
    }

    const ratingIndex = product.ratings.findIndex(
      (rating) => rating._id.toString() === id
    );

    if (ratingIndex === -1) {
      return res.status(404).json({ message: "Rating not found" });
    }

    product.ratings.splice(ratingIndex, 1);
    product.totalRatings = product.ratings.length;

    await product.save();

    res.json({ message: "Rating deleted successfully!", product });
  } catch (error) {
    throw new Error(error);
  }
});

//upload images
exports.uploadImages = asyncHandler(async (req, res) => {
  // console.log(req.files);
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const uploader = (path) => UploadImageOnCloudinary(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    // const images = urls.map((file) => {
    //   return file;
    // });
    // res.json(images);
    console.log("findProduct", findProduct);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
