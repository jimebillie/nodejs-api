import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxLength:100,
            minLength:8
        },
        password: {
            type: String,
            required: true,
            maxLength:252,
        },
        name: {
            type: String,
            required: true,
            maxLength:252,
        },
        lastname: {
            type: String,
            required: true,
            maxLength:252,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            maxLength:252,
        },
        role: {
            type: String,
            default:"user"
        },
        _token: {
            type: String,
            required: true,
        },

    }, {
        timestamps: true
    }
)


/**
 * @param {mongoose.model} Name, Schema, Collection
 */
export default mongoose.model("Users", usersSchema,"users");
