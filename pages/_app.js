import "../styles/globals.css";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import Loading from "../components/Loading";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user?.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
