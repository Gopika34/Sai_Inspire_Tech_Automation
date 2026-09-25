import express from "express";
import { createCustomer,getCustomer,getCustomers,updateCustomer,deleteCustomer } from "../controllers/customerController.js";

const router= express.Router();

router.post('/',createCustomer);
router.get('/',getCustomers);
router.get('/:id',getCustomer);
router.patch('/:id',updateCustomer);
router.delete('/:id',deleteCustomer);

export default router;