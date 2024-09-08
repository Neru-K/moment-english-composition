import { firestore } from "firebase-admin";
import { getUserData, saveUserData, User } from "../models/User";

// モックのFirestore Timestamp
const mockFirestore = {
  Timestamp: {
    now: () => firestore.Timestamp.fromDate(new Date("2023-09-08T00:00:00Z")),
  },
};

// Firestore.Timestamp のメソッドをモック
firestore.Timestamp.now = mockFirestore.Timestamp.now;

// 簡易テスト関数
function assertEqual(actual: any, expected: any, message: string) {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
  if (!isEqual) {
    throw new Error(
      `Assertion failed: ${message}\nExpected: ${JSON.stringify(
        expected
      )}, but got: ${JSON.stringify(actual)}`
    );
  }
  console.log(`✔ ${message}`);
}

function testGetUserData() {
  // テスト1: 正常なデータを返すか
  const mockDocSnapshot = {
    exists: true,
    id: "user123",
    data: () => ({
      username: "TestUser",
      email: "test@example.com",
      profilePicture: "https://example.com/profile.jpg",
      createdAt: firestore.Timestamp.now(),
      favorites: ["translation1", "translation2"],
    }),
  } as unknown as firestore.DocumentSnapshot;

  const expectedUser = {
    userId: "user123",
    username: "TestUser",
    email: "test@example.com",
    profilePicture: "https://example.com/profile.jpg",
    createdAt: firestore.Timestamp.now(),
    favorites: ["translation1", "translation2"],
  };

  const user = getUserData(mockDocSnapshot);
  assertEqual(
    user,
    expectedUser,
    "getUserData should return correct user data."
  );

  // テスト2: ドキュメントが存在しない場合
  const mockEmptyDocSnapshot = {
    exists: false,
    data: () => null,
  } as unknown as firestore.DocumentSnapshot;

  const userNull = getUserData(mockEmptyDocSnapshot);
  assertEqual(
    userNull,
    null,
    "getUserData should return null for non-existent document."
  );
}

function testSaveUserData() {
  // テスト1: 正しい形式のデータを返すか
  const mockUser: User = {
    userId: "user123",
    username: "TestUser",
    email: "test@example.com",
    profilePicture: "https://example.com/profile.jpg",
    createdAt: firestore.Timestamp.now(),
    favorites: ["translation1", "translation2"],
  };

  const expectedSavedData = {
    username: "TestUser",
    email: "test@example.com",
    profilePicture: "https://example.com/profile.jpg",
    createdAt: firestore.Timestamp.now(),
    favorites: ["translation1", "translation2"],
  };

  const result = saveUserData(mockUser);
  assertEqual(
    result,
    expectedSavedData,
    "saveUserData should return correctly formatted data."
  );

  // テスト2: オプションフィールドがない場合
  const mockUserWithoutOptionalFields: User = {
    userId: "user123",
    username: "TestUser",
    email: "test@example.com",
    createdAt: firestore.Timestamp.now(),
  };

  const expectedSavedDataWithoutOptionalFields = {
    username: "TestUser",
    email: "test@example.com",
    profilePicture: null,
    createdAt: firestore.Timestamp.now(),
    favorites: [],
  };

  const resultWithoutOptionalFields = saveUserData(
    mockUserWithoutOptionalFields
  );
  assertEqual(
    resultWithoutOptionalFields,
    expectedSavedDataWithoutOptionalFields,
    "saveUserData should set default values for optional fields."
  );
}

// テスト実行
try {
  testGetUserData();
  testSaveUserData();
  console.log("All tests passed.");
} catch (error) {
  console.error(error);
}
