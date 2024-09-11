import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AdminLayout = () => {
  const { loading, user } = useGlobalContext();

  if (!loading && (!user || user?.role !== "admin")) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
      <Stack.Screen
          name="AdminSidebar"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageUsers"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminProfile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AdminLayout;
