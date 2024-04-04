import mongoose, { Schema, Document } from 'mongoose';

interface Item {
    name: string;
    tags: string[];
    price: number;
    quantity: number;
}

interface Customer {
    gender: 'M' | 'F';
    age: number;
    email: string;
    satisfaction: number;
}

interface Purchase extends Document {
    saleDate: Date;
    items: Item[];
    storeLocation: string;
    customer: Customer;
    couponUsed: boolean;
    purchaseMethod: 'Online' | 'In store' | 'Phone';
}

const PurchaseSchema: Schema = new Schema({
    saleDate: { type: Date, required: true },
    items: [{ 
        name: { type: String, required: true },
        tags: { type: [String], required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    storeLocation: { type: String, required: true },
    customer: {
        gender: { type: String, enum: ['M', 'F'], required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true },
        satisfaction: { type: Number, required: true }
    },
    couponUsed: { type: Boolean, required: true },
    purchaseMethod: { type: String, enum: ['Online', 'In store', 'Phone'], required: true }
});

const Data = mongoose.model<Purchase>('Sales', PurchaseSchema, 'sales');

export default Data;
