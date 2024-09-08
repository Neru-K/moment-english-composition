import * as assert from "assert";
import * as userService from "../services/userService"; // パスを適切に調整

// Mock Firestore
const mockFirestore = {
  doc: () => ({
    set: (data: any) => Promise.resolve(),
    get: () => Promise.resolve({ exists: true, data: () => testUser }), // testUser を使用
    update: (data: any) => Promise.resolve(),
    delete: () => Promise.resolve(),
  }),
  collection: () => mockFirestore, // 引数をなくす
};

// Mock Firestore initialization in userService
(userService as any).usersCollection = mockFirestore.collection();

// Test data
const testUserId = "testUser123";
const testUser = {
  user_id: testUserId,
  username: "TestUser",
  email: "testuser@example.com",
  created_at: new Date(),
  favorites: [],
};

// Test: registerUser
async function testRegisterUser() {
  try {
    await userService.registerUser(
      testUserId,
      testUser.email,
      testUser.username
    );
    console.log("registerUser test passed.");
  } catch (error) {
    console.error("registerUser test failed:", error);
  }
}

// Test: getUserById
async function testGetUserById() {
  try {
    const user = await userService.getUserById(testUserId);
    assert.strictEqual(user?.user_id, testUserId);
    console.log("getUserById test passed.");
  } catch (error) {
    console.error("getUserById test failed:", error);
  }
}

// Test: updateUserProfile
async function testUpdateUserProfile() {
  try {
    const updatedUsername = "UpdatedUser";
    await userService.updateUserProfile(testUserId, {
      username: updatedUsername,
    });
    const updatedUser = await userService.getUserById(testUserId);
    assert.strictEqual(updatedUser?.username, updatedUsername);
    console.log("updateUserProfile test passed.");
  } catch (error) {
    console.error("updateUserProfile test failed:", error);
  }
}

// Test: addFavorite
async function testAddFavorite() {
  try {
    const testTranslationId = "translation123";
    await userService.addFavorite(testUserId, testTranslationId);
    const user = await userService.getUserById(testUserId);
    assert.ok(user?.favorites?.includes(testTranslationId));
    console.log("addFavorite test passed.");
  } catch (error) {
    console.error("addFavorite test failed:", error);
  }
}

// Test: removeFavorite
async function testRemoveFavorite() {
  try {
    const testTranslationId = "translation123";
    await userService.removeFavorite(testUserId, testTranslationId);
    const user = await userService.getUserById(testUserId);
    assert.ok(!user?.favorites?.includes(testTranslationId));
    console.log("removeFavorite test passed.");
  } catch (error) {
    console.error("removeFavorite test failed:", error);
  }
}

// Test: deleteUser
async function testDeleteUser() {
  try {
    await userService.deleteUser(testUserId);
    const user = await userService.getUserById(testUserId);
    assert.strictEqual(user, null);
    console.log("deleteUser test passed.");
  } catch (error) {
    console.error("deleteUser test failed:", error);
  }
}

// Run all tests
async function runTests() {
  await testRegisterUser();
  await testGetUserById();
  await testUpdateUserProfile();
  await testAddFavorite();
  await testRemoveFavorite();
  await testDeleteUser();
}

runTests().then(() => console.log("All tests completed."));
