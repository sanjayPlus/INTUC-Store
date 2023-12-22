const User = require("../models/User");
const Product = require("../models/Products");
const jwtSecret = process.env.JWT_SECRET;

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getAllProductsWithPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
        const perPage = parseInt(req.query.perPage) || 10; // default to 10 items per page if not specified

        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);

        const products = await Product.find().skip(startIndex).limit(perPage);

        const paginationInfo = {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts
        };

        res.status(200).json({ products, paginationInfo });
    } catch (error) {
        console.error("Error getting products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error getting product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stocks } = req.body;
        console.log(req.body)
        req.body.image = req.file;
        let imageObj = req.body.image;
        if (!name || !description || !price || !stocks) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields." });
        }
        
        const newProduct = new Product({
            name,
            description,
            price,
            image:process.env.DOMAIN+"/"+imageObj.filename,
            stocks
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);

    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stocks,id } = req.body;
        req.body.image = req.file;
        let imageObj = req.body.image;
        console.log(req.body);
  //if exist then update

  const product = await Product.findById(id);
  if(name){
    product.name=name;
  }
    if(description){
        product.description=description;
    }
    if(price){
        product.price=price;

    }
    if(imageObj){
        product.image=process.env.DOMAIN+"/"+imageObj.filename;
    }
    if(stocks){
        product.stocks=stocks;
    }
    const updatedProduct = await product.save();
    res.status(200).json({message:"Product Updated successfully"});
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
const getProductByIdWithSize = async (req, res) => {
    try {
        // Get the product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Extract the base title before the first space
        const baseTitle = product.title.split(' ')[0];

        // Find other products with similar base titles and sizes
        const similarProducts = await Product.find({
            title: new RegExp(`^${baseTitle}`),  // Using RegExp to match base title
            size: { $in: ["(M)", "(S)", "(L)", "(XL)"] }
        });
        //get product id of size
        const productWithSize = similarProducts.filter((product) => product.size === req.params.size);
        res.status(200).json(productWithSize);
    } catch (error) {
        console.error("Error getting product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductsWithPagination,
    getProductByIdWithSize
}