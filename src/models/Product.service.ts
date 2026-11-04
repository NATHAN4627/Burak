import { ObjectId } from "mongoose";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductCollection, ProductStatus } from "../libs/enums/product.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import {
  Product,
  ProductInput,
  ProductInquery,
  ProductUpdateInput,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /** SPA */
  public async getProducts(inquery: ProductInquery): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.PROCESS };

    if (inquery.productCollection)
      match.productCollection = inquery.productCollection;

    if (inquery.search)
      match.productName = { $regex: new RegExp(inquery.search, "i") };

    const sort: T =
      inquery.order === "productPrice"
        ? { [inquery.order]: 1 }
        : { [inquery.order]: -1 };

    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquery.page * 1 - 1) * inquery.limit },
        { $limit: inquery.limit },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getProduct(
    memberId: ObjectId | null,
    id: string
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findOne({
        _id: productId,
        productStatus: ProductStatus.PROCESS,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // TODO: if authenticated first time -> create view log

    return result;
  }

  /** SSR */
  public async getAllProducts(): Promise<Product[]> {
    // find() product topilmasa uzi auto [] bosh array qaytaradi
    const result = await this.productModel.find().exec();

    // agar db da qandaydir xato bulsa custom Errors tashlaydi
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.log("Error: createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    productId: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    // string => ObjectId
    productId = shapeIntoMongooseObjectId(productId);
    const result = await this.productModel
      .findOneAndUpdate({ _id: productId }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default ProductService;
