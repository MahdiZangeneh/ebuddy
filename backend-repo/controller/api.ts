import { Request, Response, NextFunction } from "express";
import { firestore } from "../config/firebaseConfig";
import { ApiError } from "../entities/apiError";

export const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, name, email } = req.body;

    if (typeof userId !== "string" || userId.trim() === "") {
      throw new ApiError("userId must be provided as a non-empty string", 400);
    }

    const userDocRef = firestore.collection("USERS").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw new ApiError("User not found", 404);
    }

    if (!name && !email) {
      throw new ApiError(
        "At least one of email or name must be provided.",
        400
      );
    }

    await userDocRef.update({
      ...(name ? { name: name.trim() } : {}),
      ...(email ? { email: email.toLowerCase() } : {}),
    });

    const updatedUserDoc = await userDocRef.get();

    res.status(200).json({
      message: "User data updated successfully",
      data: updatedUserDoc.data(),
    });
  } catch (error) {
    next(error);
  }
};

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string" || userId.trim() === "") {
      throw new ApiError("userId must be provided as a non-empty string", 400);
    }

    const userDoc = await firestore.collection("USERS").doc(userId).get();

    if (!userDoc.exists) {
      throw new ApiError("User not found", 404);
    }

    res.status(200).json({
      message: "User data fetched successfully",
      data: userDoc.data(),
    });
  } catch (error) {
    next(error);
  }
};
