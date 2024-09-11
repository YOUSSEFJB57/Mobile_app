import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";

const Bookmark = () => {
  const { user, loading } = useGlobalContext();
  if (!loading && (!user || user?.role == "admin")) return <Redirect href="/admin" />;

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Bookmark</Text>
    </SafeAreaView>
  );
};

export default Bookmark;
