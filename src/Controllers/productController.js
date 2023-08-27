const Product = require('../Models/productModel')

exports.createProduct = async (req, res) => {
    let { productSku } = req.body
    try {
        //check for duplication
        const checkProduct = await Product.findOne({ productSku });
        if (checkProduct) {
            return res.status(500).json({
                message: "Entered  Productsku is Already exist",
            });
        }
        const products = new Product(req.body)
        await products.save()
        res.status(200).json(products)
    } catch (error) {
        console.log(error, "erroe");
        res.status(500).json({
            message: "Product not created"
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        let { productType } = req.query
        let query = {};

        if (productType) {
            query.productType = { $regex: productType, $options: 'i' };
        }
        const getType = await Product.find(query)
        res.status(200).json({
            message: "Get Product Successfully",
            data: getType
        })
    } catch (error) {
        console.log(error, "errorrrr");
        res.status(500).json({
            message: "Get Product Failed"
        })
    }
}

exports.getProductAgg = async (req, res) => {
    try {
        // Aggregation for product with images
        const getType = await Product.aggregate([
            {
                $addFields:
                {
                    stringId: {
                        $toString: "$_id",
                    },
                },
            },
            {
                $lookup:
                {
                    from: "images",
                    localField: "stringId",
                    foreignField: "refId",
                    as: "images",
                },
            },
            {
                $unwind: {
                    path: "$images",
                },
            },
        ])
        res.status(200).json({
            message: "Get Product Successfully",
            data: getType
        })
    } catch (error) {
        console.log(error, "errorrrr");
        res.status(500).json({
            message: "Get Product Failed"
        })
    }
}