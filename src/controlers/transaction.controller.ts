 import { Request, Response } from "express";
 import Transaction from "../models/transantion.model";
import Product from "../models/product.models";




 export const createTransaction =async (req:Request,res:Response):Promise <void> =>{
    try {
        const transactionData =req.body;
        if (req.file){
            transactionData.paymentProof=req.file.path;
        }else {
            res.status(400).json ({ message :"payment proof is required"});
            return;
        }

        if (typeof transactionData.purchasedItems ==="string"){
            try{
                transactionData.purchasedItems =JSON.parse(transactionData.purchasedItems);
            } catch (error){
                res.status(400).json ({message: "invalid format for purchasedItems"})
                return;
            }
        }
        // forcing status to be "pending"
        transactionData.status ="pending"
        const transaction =new Transaction(transactionData);
        await transaction.save();
       res.status(201).json(transaction)
    }catch(error){
         res.status(500).json({message :"error creating transaction",error})
    }
 }



 export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("purchasedItems.productId");

    res.status(200).json(transactions);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching transactions",
      error: error.message,
    });
  }
};


 export const getTransactionById = async (req:Request,res:Response):Promise <void> =>{

    try {
        const transaction = await Transaction.findById(req.params.id).populate (
           "purchasedItems.productId",
        );
        if (!transaction){
            res.status(404).json({message :"Transaction not found"});
            return;
        }

        res.status(200).json(transaction)
    }catch (error){
        res.status(500).json({message:"Error fetching transaction",error})
    }
 };


    export const updateTransaction = async (req:Request,res:Response):Promise<void> => {
    try{
        const  {status} = req.body;

        const existingTrasaction = await Transaction.findById (req.params.id);
        if (!existingTrasaction){
            res.status(404).json({message :"Transaction not found"});
            return;
        }

        if (status === "paid" && existingTrasaction.status !== "paid") {
            for (const item of existingTrasaction.purchasedItems) {
                await Product.findByIdAndUpdate (item.productId, {
                    $inc: { stock: -item.qty }
                });
            }
        }

        const transaction =await Transaction.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true},
        )
        res.status(200).json (transaction)
    
 }catch(error){
         res.status(500).json({message :"error updating transaction status",error})
    }


}
