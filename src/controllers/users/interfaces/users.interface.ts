import { Document } from 'mongoose';

/**
 * Users Interface
 * ================
 * Extended from Users Schema
 */
export interface Users extends Document {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly avatar?: string;
    readonly bio?: string;
    readonly role?: string;
    readonly createdAt?: Date;
    readonly modifiedAt?: Date;
    readonly status?: boolean;
}
