import mongoose, { Document, Model } from 'mongoose';

type UserType = IUser & Document;

export interface IUser {
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel: Model<UserType> = mongoose.model<UserType>('User', UserSchema);

export default UserModel;