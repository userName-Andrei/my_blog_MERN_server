import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: '/avatar/default.png'
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserModel);