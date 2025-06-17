import { auth, provider, signInWithPopup } from "../functions/firebase";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
      email: user.email,
      full_name: user.displayName,
      auth_provider: "google",
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
