import { useEffect } from "react"; // Import useEffect
import { useRouter } from "expo-router"; // Correct import for useRouter
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text, Alert } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, LogOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const router = useRouter(); // Initialize router
  const { user, setUser, setIsLogged } = useGlobalContext();

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user, router]); // Add router to dependency array

  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id)); // Ensure user.$id is safe to use

  const logout = async () => {
    try {
      await LogOut();
      setUser(null);
      setIsLogged(false);
      router.replace("/sign-in"); // Use router.replace for navigation
    } catch (error) {
      console.error("Failed to logout:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  if (!user) return null; // Prevent rendering if user is not logged in

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator?.username || "Unknown"} // Ensure safe access
            avatar={item.creator?.avatar || icons.defaultAvatar} // Fallback avatar
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar || icons.defaultAvatar }} // Fallback avatar if none
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
            <TouchableOpacity
              onPress={() => router.push("/editprofile")}
              className="bg-secondary rounded-xl mt-5 px-4 py-2"
            >
              <Text className="text-white font-psemibold text-lg">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
