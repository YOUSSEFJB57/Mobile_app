import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button, ScrollView } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllUsers, updateUser, deleteUser, getUserPosts, deletePost } from "../../lib/appwrite";

const ManageUsers = () => {
  const { user } = useGlobalContext();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [userPosts, setUserPosts] = useState([]);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }; 
    fetchUsers();
  }, []);

  const handleUpdateUser = async () => {
    try {
      await updateUser(selectedUser.$id, userForm);
      Alert.alert("Success", "User updated successfully");
      setModalVisible(false);
      const updatedUsers = users.map((u) =>
        u.$id === selectedUser.$id ? { ...u, ...userForm } : u
      );
      setUsers(updatedUsers);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.$id !== userId));
      Alert.alert("Success", "User deleted successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const openUserModal = async (user) => {
    setSelectedUser(user);
    setUserForm({ username: user.username, email: user.email, role: user.role });
    try {
      const posts = await getUserPosts(user.$id);
      setUserPosts(posts);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setModalVisible(true);
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setUserPosts(userPosts.filter((post) => post.$id !== postId));
      Alert.alert("Success", "Post deleted successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={users}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="bg-white/10 p-4 mb-2 rounded-lg shadow-lg border border-white/20">
            <Text className="text-lg font-semibold text-white">{item.username}</Text>
            <Text className="text-sm text-gray-300">{item.email}</Text>
            <View className="flex flex-row mt-3 space-x-4">
              <TouchableOpacity
                onPress={() => openUserModal(item)}
                className="bg-blue-600 py-2 px-4 rounded-lg"
              >
                <Text className="text-white text-center">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteUser(item.$id)}
                className="bg-red-600 py-2 px-4 rounded-lg"
              >
                <Text className="text-white text-center">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">No users found.</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 16, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <View className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <Text className="text-xl font-semibold text-white mb-4">Edit User</Text>
            <TextInput
              className="bg-gray-800 text-white p-4 rounded-lg mb-4"
              value={userForm.username}
              onChangeText={(text) => setUserForm({ ...userForm, username: text })}
              placeholder="Username"
              placeholderTextColor="#7B7B8B"
            />
            <TextInput
              className="bg-gray-800 text-white p-4 rounded-lg mb-4"
              value={userForm.email}
              onChangeText={(text) => setUserForm({ ...userForm, email: text })}
              placeholder="Email"
              placeholderTextColor="#7B7B8B"
              keyboardType="email-address"
            />
            <TextInput
              className="bg-gray-800 text-white p-4 rounded-lg mb-4"
              value={userForm.role}
              onChangeText={(text) => setUserForm({ ...userForm, role: text })}
              placeholder="Role"
              placeholderTextColor="#7B7B8B"
            />
            <View className="flex flex-row justify-between mt-6">
              <TouchableOpacity
                onPress={handleUpdateUser}
                className="bg-blue-600 py-3 px-6 rounded-lg flex-1 mr-2"
              >
                <Text className="text-white text-center font-semibold">Update User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-700 py-3 px-6 rounded-lg flex-1 ml-2"
              >
                <Text className="text-white text-center font-semibold">Close</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-semibold text-white mt-8 mb-4">User's Videos</Text>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <View className="bg-gray-800 p-4 mb-2 rounded-lg shadow-lg">
                  <Text className="text-white">{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeletePost(item.$id)}
                    className="bg-red-600 py-2 px-4 rounded-lg mt-2"
                  >
                    <Text className="text-white text-center">Delete Video</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={() => (
                <View className="flex justify-center items-center mt-4">
                  <Text className="text-gray-400">No videos found.</Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ManageUsers;
