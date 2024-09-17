import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product.handler.js";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware/index.js";

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
