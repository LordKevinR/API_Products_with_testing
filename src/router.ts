import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product.handler";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware/index";

const router = Router();

//routing

router.get("/", getAllProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",

  //validation
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price has to be a number")
    .custom((value) => value > 0)
    .withMessage("Price has to be greater than 0"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Invalid Id"),
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price has to be a number")
    .custom((value) => value > 0)
    .withMessage("Price has to be greater than 0"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  deleteProduct
);

export default router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The id of the product
 *          example: 1
 *        name:
 *          type: string
 *          description: The name of the product
 *          example: Product 1
 *        price:
 *          type: number
 *          description: The price of the product
 *          example: 9.99
 *        availability:
 *          type: boolean
 *          description: The availability of the product
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    description: Returns all products
 *    tags:
 *      - products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    description: Returns a product by id
 *    tags:
 *      - products
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      msg:
 *                        type: string
 *                        description: The error message
 *                        example: Invalid Id
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: Product not found
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    description: Creates a new product
 *    tags:
 *      - products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the product
 *                example: Product 1
 *              price:
 *                type: number
 *                description: The price of the product
 *                example: 9.99
 *    responses:
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      msg:
 *                        type: string
 *                        description: The error message
 *                        example: Description of the error
 */

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by id
 *    description: Updates a product by id
 *    tags:
 *      - products
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the product
 *                example: Product 1
 *              price:
 *                type: number
 *                description: The price of the product
 *                example: 9.99
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      msg:
 *                        type: string
 *                        description: The error message
 *                        example: Description of the error
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update the availability of a product by id
 *    description: Updates the availability of a product by id
 *    tags:
 *      - products
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      msg:
 *                        type: string
 *                        description: The error message
 *                        example: Description of the error
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by id
 *    description: Deletes a product by id
 *    tags:
 *      - products
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: string
 *                  description: The message
 *                  example: Product deleted
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      msg:
 *                        type: string
 *                        description: The error message
 *                        example: Description of the error
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 */
