import mongoose from "mongoose"

export const ConnectDB = async () => {
    const uri = 'mongodb+srv://admin:admin@cluster0.i6aeb.mongodb.net/todo-kitri?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(uri);
    console.log('connection ok..');
}