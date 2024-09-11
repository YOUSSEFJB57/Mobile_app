import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { updateUser } from "../../lib/appwrite";

const AdminProfile = () => {
  const { user, setUser } = useGlobalContext();
  const [form, setForm] = useState({
    username: user?.username,
    email: user.email,
  });

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await updateUser(user.$id, form);
      setUser(updatedUser);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary p-6">
      <View className="flex items-center mb-8">
        <Image
          source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }} // Placeholder if no avatar
          className="w-24 h-24 rounded-full mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-semibold text-white">{user?.username}</Text>
        <Text className="text-base text-gray-400">{user?.email}</Text>
      </View>

      <View className="bg-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <Text className="text-white mb-2">Username</Text>
        <TextInput
          className="bg-gray-800 text-white p-4 rounded-lg"
          value={form.username}
          onChangeText={(text) => setForm({ ...form, username: text })}
          placeholder="Enter your username"
          placeholderTextColor="#7B7B8B"
        />
      </View>

      <View className="bg-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <Text className="text-white mb-2">Email</Text>
        <TextInput
          className="bg-gray-800 text-white p-4 rounded-lg"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Enter your email"
          placeholderTextColor="#7B7B8B"
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity
        onPress={handleUpdateProfile}
        className="bg-blue-600 py-4 rounded-lg shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-center text-white text-lg font-semibold">Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminProfile;
