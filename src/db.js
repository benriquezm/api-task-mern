import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        //  in local not work with localhost, only by ip
        //  0.0.0.0 or 127.0.0.1
        await mongoose.connect('mongodb://127.0.0.1:27017/dbtask');
        console.log('DB is connected...');
    } catch (error) {
        console.log('Error: ', error);
    }
};
