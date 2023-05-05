const productModel = require("../model/product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.send(err.message);
  }
};

//Add new product
const postProduct = async (req, res) => {
  const productData = req.body;
  try {
    const data = await new productModel(productData).save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

// Get one product by ID
const getOneProduct = async (req, res) => {
  try {
    // Find the product in the database using its ID
    const fetchedProduct = productModel.findById(req.params.id);

    res.json(fetchedProduct);
  } catch (err) {
    res.json(err.message);
  }
};

// Update a product
const updateProduct = async (req, res) => {
  // Get product information from request body
  const productInfo = req.body;

  try {
    let updatedInfo = await productModel.findByIdAndUpdate(
      productInfo.productID,
      productInfo,
      { new: true }
    );

    return res.json(updatedInfo);
  } catch (err) {
    res.json(err.message);
  }
};

// Delete an product by ID
const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the product in the database and delete it
    const deletedRecord = await productModel.findByIdAndDelete(id);
    res.json(deletedRecord);
  } catch (err) {
    res.json(err.message);
  }
};

//add a review for an product
const addReview = async (req, res) => {
  const { review, productID, userID, userName, rating } = req.body;

  try {
    const product = await productModel.findOne({ _id: productID }, "reviews");
    if (product) {
      product.reviews.push({ userID, userName, rating, review });
      const data = await productModel.updateOne(
        { _id: productID },
        { reviews: product.reviews }
      );
      res.json(data);
    } else res.json({ message: "Product not found" });
  } catch (err) {
    res.json(err.message);
  }
};

//update a review for an product
const modifyReview = async (req, res) => {
  const { review, productID, userID, userName, rating } = req.body;

  try {
    const product = await productModel.findOne({ _id: productID }, "reviews");
    if (product) {
      product.reviews = product.reviews.filter((obj) => obj.userID != userID);
      product.reviews.push({ userID, userName, rating, review });
      const data = await product.updateOne(
        { _id: productID },
        { reviews: product.reviews }
      );
      res.json({ updatedInfo: data });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (err) {
    res.json(err.message);
  }
};

//delete a review for an product
const deleteReview = async (req, res) => {
  const { productID, userID } = req.body;

  try {
    const data = await productModel.findOneAndUpdate(
      { _id: productID },
      { $pull: { reviews: { userID } } },
      { new: true }
    );

    res.json(data.reviews);
  } catch (err) {
    res.json(err.message);
  }
};

//To start a discussion thread
const addOrUpdateDiscussionThread = async (req, res) => {
  const { message, productID, sender, chatWith, chatWithName } = req.body;

  try {
    const product = await productModel.findOne(
      { _id: productID },
      "discussion"
    );

    product.discussion.push({
      sender,
      chatWith,
      message,
      chatWithName,
    });
    const data = await productModel.updateOne(
      { _id: productID },
      { discussion: product.discussion }
    );
    res.json(data);
  } catch (err) {
    res.json(err.message);
  }
};

//Delete a discussion thread
const deleteDiscussionThread = async (req, res) => {
  const { productID, chatWith } = req.body;
  try {
    const product = await productModel.findById(productID, "discussion");

    const updatedDiscussionArray = product.discussion.filter((dat) => {
      return dat.chatWith !== chatWith;
    });

    const updatedData = await productModel.findByIdAndUpdate(
      productID,
      { discussion: updatedDiscussionArray },
      { new: true }
    );
    res.json(updatedData);
  } catch (err) {
    res.json(err.message);
  }
};

//delete all store products
const deleteAllUserProducts = async function (req, res) {
  try {
    const data = await productModel.deleteMany({ userID: req.params.id });
    res.json(data);
  } catch (err) {
    res.send(err.message);
  }
};

const incrementLikeCounter = async (req, res) => {
  try {
    const data = await productModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
};

const decrementLikeCounter = async (req, res) => {
  try {
    const data = await productModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: -1 } },
      { new: true }
    );

    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  postProduct,
  addReview,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  modifyReview,
  deleteReview,
  updateProduct,
  addOrUpdateDiscussionThread,
  deleteDiscussionThread,
  deleteAllUserProducts,
  incrementLikeCounter,
  decrementLikeCounter,
};
