import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { LogOut, getAllUsers, getAllVideos } from "../../lib/appwrite";
import { useState, useEffect } from "react";

const AdminSidebar = () => {
  const router = useRouter();
  const { setIsLogged, setUser } = useGlobalContext();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await LogOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setTotalUsers(usersData.length);
        console.log("User data:", usersData);

        const videosData = await getAllVideos();
        setTotalVideos(videosData.length);
        console.log("Video data:", videosData);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-gray-800">
      <ScrollView className="p-6" contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-4xl text-white font-bold mb-8 mt-10">Admin Dashboard</Text>

        {/* Summary Cards */}
        <View className="flex flex-row justify-between mb-8 space-x-4">
          <View className="flex-1 bg-orange-500 p-5 rounded-lg shadow-lg">
            <Text className="text-white text-lg font-semibold mb-2">Total Users</Text>
            <Text className="text-white text-3xl font-bold">{totalUsers}</Text>
          </View>

          <View className="flex-1 bg-orange-400 p-5 rounded-lg shadow-lg">
            <Text className="text-white text-lg font-semibold mb-2">Total Videos</Text>
            <Text className="text-white text-3xl font-bold">{totalVideos}</Text>
          </View>
        </View>

        {/* Navigation Options */}
        <View className="flex flex-col space-y-4">
          <TouchableOpacity
            onPress={() => router.push("/admin/ManageUsers")}
            className="flex flex-row items-center bg-orange-600 p-4 rounded-lg shadow-md"
          >
            <Image source={icons.rightArrow} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-medium">Manage Users</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/admin/AdminProfile")}
            className="flex flex-row items-center bg-orange-600 p-4 rounded-lg shadow-md"
          >
            <Image source={icons.profile} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-medium">Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            className="flex flex-row items-center bg-gray-700 p-4 rounded-lg shadow-md mt-auto"
          >
            <Image source={icons.logout} className="w-6 h-6 mr-3" resizeMode="contain" />
            <Text className="text-white text-lg font-medium">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminSidebar;
