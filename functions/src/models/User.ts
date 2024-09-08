import { firestore } from "firebase-admin";

// ユーザーモデルのインターフェース定義
export interface User {
  userId: string;
  username: string;
  email: string;
  profilePicture?: string;
  createdAt: firestore.Timestamp;
  favorites?: string[]; // translation_idの配列
}

// Firestoreに保存するユーザーデータを取得するための関数
export const getUserData = (doc: firestore.DocumentSnapshot): User | null => {
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();

  return {
    userId: doc.id,
    username: data?.username || "",
    email: data?.email || "",
    profilePicture: data?.profilePicture || "",
    createdAt: data?.createdAt || firestore.Timestamp.now(),
    favorites: data?.favorites || [],
  };
};

// Firestoreにユーザーデータを保存するための関数
export const saveUserData = (user: User) => {
  return {
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture || null,
    createdAt: user.createdAt,
    favorites: user.favorites || [],
  };
};
