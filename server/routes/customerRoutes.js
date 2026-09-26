import express from "express";
import { createCustomer,getCustomer,getCustomers,updateCustomer,deleteCustomer } from "../controllers/customerController.js";
import validate from "../middleware/validate.js";
import customerSchema from "../validators/customerValidator.js";

const router= express.Router();

router.post('/',validate(customerSchema),createCustomer);
router.get('/',getCustomers);
router.get('/:id',getCustomer);
router.patch('/:id',validate(customerSchema.partial()),updateCustomer);
router.delete('/:id',deleteCustomer);

export default router;