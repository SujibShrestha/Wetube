import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // GEt details from frontend
  // validation
  // check if user is already register :username and email
  // check for images
  // upload to cloudinary  avatar check (from multer and cloudinary)
  // Create user object - create entry in db
  // remove passsword and refresh token from response
  // check for user creation
  // return res

  const { username, fullName, email, password } = req.body;
  console.log(username, fullName);

  //   if(fullName==='')
  //   {
  //     throw new ApiError(400, "full name is required")
  //   }

  //or
  //VALIDATION
  if (
    [fullName, username, email, password].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "avatar required for cloudinary");

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
); // select which we dont want

if(!createdUser){
    throw new ApiError(500,'Something went wrong while registering the user ')
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
)

});

export { registerUser };
