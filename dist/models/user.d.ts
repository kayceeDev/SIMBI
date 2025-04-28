import mongoose from 'mongoose';
import { IUser } from '../interfaces/auth.interface';
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
