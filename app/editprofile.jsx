import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { updateUser } from "../lib/appwrite";

const EditProfile = () => {
  const { user, setUser } = useGlobalContext();
  const [form, setForm] = useState({
    username: user?.username,
    email: user?.email,
  });
  const router = useRouter();

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await updateUser(user.$id, form);
      setUser(updatedUser);
      Alert.alert("Succès", "Profil mis à jour avec succès");
      router.push("/profile");
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <View className="flex-1 justify-center">
        <Text className="text-3xl text-white font-bold mb-6 text-center">Modifier le profil</Text>
        
        <View className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <View className="mb-4">
            <Text className="text-white mb-2 text-lg">Nom d'utilisateur</Text>
            <TextInput
              className="bg-gray-900 text-white p-3 rounded-lg mb-2"
              value={form.username}
              onChangeText={(text) => setForm({ ...form, username: text })}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#A9A9A9"
            />
          </View>

          <View className="mb-4">
            <Text className="text-white mb-2 text-lg">Email</Text>
            <TextInput
              className="bg-gray-900 text-white p-3 rounded-lg mb-2"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-blue-600 p-4 rounded-lg mt-4 shadow-lg"
          >
            <Text className="text-white text-center text-lg font-semibold">Mettre à jour le profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
