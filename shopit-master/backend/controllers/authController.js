import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from 'crypto';

// Register User => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    });

    sendToken(user, 201, res);
});

// Login User => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter your email & password', 400))
    }

    // Find user in the database
    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    sendToken(user, 200, res);
});

// Logout User => /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        message: 'Logged Out',
    })
});

// Upload User Avatar => /api/v1/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
    const avatarResponse = await upload_file(req.body.avatar, "shopit/avatars");
    
    // if user is updating the avatar, then delete the previous avatar
    if(req?.user?.avatar?.url) {
        // this will delete the image from cloudinary
        await delete_file(req?.user?.avatar?.public_id);
    }

    const user = await User.findByIdAndUpdate(req?.user?._id, {
        avatar: avatarResponse
    });

    res.status(200).json({
        user,
    });
});


// Forgot Password => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    // Find user in the database
    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    // save both resetPasswordToken & resetPasswordExpire in database
    await user.save();

    // Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = getResetPasswordTemplate(user?.name, resetUrl);
    
    try{
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message,
        });

        res.status(200).json({
            message: `Email sent to ${user.email}`,
        });
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save();
        return next(new ErrorHandler(error?.message, 500));
    }
});


// Reset Password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Check if token is correct or not
    // Hash the url token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req?.params?.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user){
        return next(
            new ErrorHandler(
                'Password reset token is invalid or has been expired',
                400
            )
        );
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(
            new ErrorHandler(
                'Password does not match',
                400
            )
        );
    }

    // Set the new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    sendToken(user, 200, res);

});

// Get current user profile => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user?._id);
    res.status(200).json({
        user,
    })
});

// Update Password => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    // since password is (select: false) in user Schema, you cannot get 
    // the password in response, you have to select like this to the old password
    const user = await User.findById(req?.user?._id).select('+password');

    // Check the previous user password
    const isPasswordMatched = await user.comparePassword(req?.body?.oldPassword);

    if(!isPasswordMatched){
        return next(
            new ErrorHandler(
                'Old Password is incorrect',
                400
            )
        );
    }

    user.password = req?.body?.password;
    user.save();

    res.status(200).json({
        success: true,
    });

});


// Update User Profile => /api/v1/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {new: true});

    res.status(200).json({
        user
    });

});

// Get all Users (ADMIN) => /api/v1/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
    
    const users = await User.find();

    res.status(200).json({
        users
    });
});

// Get User details (ADMIN) => /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHandler(
                `User not found with id: ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({
        user
    });
});


// Update User Details - (ADMIN) => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {new: true});

    res.status(200).json({
        user
    });

});

// Delete User (ADMIN) => /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHandler(
                `User not found with id: ${req.params.id}`,
                404
            )
        );
    }

    // remove user avatar from cloudinary
    if(user?.avatar?.public_id){
        await delete_file(user?.avatar?.public_id);
    }

    await user.deleteOne();

    res.status(200).json({
        success: true
    });
});