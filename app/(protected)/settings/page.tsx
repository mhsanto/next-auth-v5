import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="bg-red-500 text-white p-4 rounded-full">Sign out</button>
    </form>
  );
};

export default SettingsPage;
