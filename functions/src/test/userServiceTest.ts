import {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userService";

const mockUser = {
  email: "test@example.com",
  password: "password123",
  username: "TestUser",
};

async function testRegisterUser() {
  console.log("Starting test: Register User");
  const user = await registerUser(
    mockUser.email,
    mockUser.password,
    mockUser.username
  );
  if (user) {
    console.log("User registered successfully:", user);
  } else {
    console.error("User registration failed.");
  }
}

// 未使用の関数は削除か、使用するようにします
async function testGetUserById(userId: string) {
  console.log(`Starting test: Get User by ID - ${userId}`);
  const user = await getUserById(userId);
  if (user) {
    console.log("User retrieved successfully:", user);
  } else {
    console.error("Failed to retrieve user.");
  }
}

async function testUpdateUser(userId: string) {
  console.log(`Starting test: Update User - ${userId}`);
  const updatedUser = await updateUser(userId, { username: "UpdatedUser" });
  if (updatedUser) {
    console.log("User updated successfully:", updatedUser);
  } else {
    console.error("Failed to update user.");
  }
}

async function testDeleteUser(userId: string) {
  console.log(`Starting test: Delete User - ${userId}`);
  const result = await deleteUser(userId);
  if (result) {
    console.log("User deleted successfully.");
  } else {
    console.error("Failed to delete user.");
  }
}

// テスト関数を正しく呼び出す
(async () => {
  await testRegisterUser();
  // ここで適切なuserIdを取得して使用する
  const user = await getUserById("some-user-id"); // ここで実際のユーザーIDを指定
  if (user) {
    await testGetUserById(user.userId); // testGetUserById関数を呼び出し
    await testUpdateUser(user.userId);
    await testDeleteUser(user.userId);
  }
})();
