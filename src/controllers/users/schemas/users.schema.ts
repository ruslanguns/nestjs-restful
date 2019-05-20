import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const ROLES_VALIDOS = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un role permitido.',
};

/**
 * User Schema for MongoDB
 */
export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        default: '',
    },
    lastName: {
        type: String,
        required: false,
        default: '',
    },
    username: {
        type: String,
        unique: true,
        required: [
            true,
            'Username is required',
        ],
    },
    email: {
        type: String,
        unique: true,
        required: [
            true,
            'Email is required',
        ],
    },
    password: {
        type: String,
        required: [
            true,
            'Password is required',
        ],
    },
    avatar: {
        type: String,
        required: false,
        default: '',
    },
    bio: {
        type: String,
        required: false,
        default: '',
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ROLES_VALIDOS,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

UserSchema.plugin(uniqueValidator, { message: 'El campo {PATH} debe ser único' });
