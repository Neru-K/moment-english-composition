// functions/src/services/userService.ts

import { auth, db } from "../config/firebase";
import { User, getUserData, saveUserData } from "../models/User";
import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";

// ユーザー登録処理
export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<User | null> => {
  try {
    // Firebase Authenticationでユーザー作成
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: username,
    });

    // Firestoreにユーザーデータを保存
    const userDocRef = db.collection("users").doc(userRecord.uid);
    const userData: User = {
      userId: userRecord.uid,
      username,
      email,
      createdAt: firestore.Timestamp.now(),
    };

    await userDocRef.set(saveUserData(userData));

    return userData;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

// ユーザー情報取得処理
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    return getUserData(userDoc);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// ユーザー情報更新処理
export const updateUser = async (
  userId: string,
  updatedData: Partial<User>
): Promise<User | null> => {
  try {
    const userDocRef = db.collection("users").doc(userId);

    // Firestoreでユーザーデータを更新
    await userDocRef.update(updatedData);

    const updatedUserDoc = await userDocRef.get();
    return getUserData(updatedUserDoc);
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// ユーザー削除処理
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    // Firebase Authenticationから削除
    await auth.deleteUser(userId);

    // Firestoreから削除
    await db.collection("users").doc(userId).delete();

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

// Firebase Authenticationのログイン処理
export const loginUser = async (
  idToken: string
): Promise<admin.auth.DecodedIdToken | null> => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
