import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { getAllUsers, getAllVideos } from "../../lib/appwrite"; // Assuming you have these functions
import AdminSidebar from "./AdminSidebar";

const AdminContainer = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setTotalUsers(usersData);
        
      } catch (error) {
        Alert.alert("Error", error.message);
      }; 
      } 
    fetchUsers();
  }, []);  

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return <AdminSidebar totalUsers={totalUsers} totalVideos={totalVideos} />;
};

export default AdminContainer;
