import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema(
    {
        //insert collection fields and types

    }
);

const PModule = mongoose.model(
    //InsertCollectionName,
    PaymentSchema
);

export default PModule;