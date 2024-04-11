// import { useState } from "react";
// import useShowToast from "./useShowToast";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { firestore } from "../firebase/firebase";

// const useSearchUser = () => {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [user, setUser] = useState(null);
// 	const showToast = useShowToast();

// 	const getUserProfile = async (username) => {
// 		setIsLoading(true);
// 		setUser(null);
// 		try {
// 			const q = query(collection(firestore, "users"), where("username", "==", username));

// 			const querySnapshot = await getDocs(q);
// 			if (querySnapshot.empty) return showToast("Error", "User not found", "error");

// 			querySnapshot.forEach((doc) => {
// 				setUser(doc.data());
// 			});
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 			setUser(null);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return { isLoading, getUserProfile, user, setUser };
// };

// export default useSearchUser;


import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser(null);
        try {
            const prefix = username.toLowerCase();
            const endPrefix = prefix.substring(0, prefix.length - 1) + String.fromCharCode(prefix.charCodeAt(prefix.length - 1) + 1);
            const q = query(
                collection(firestore, "users"),
                where("username", ">=", prefix),
                where("username", "<", endPrefix),
                limit(10) // Limiting to 10 results
            );

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return showToast("Error", "User not found", "error");

            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUser(users);
        } catch (error) {
            showToast("Error", error.message, "error");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;


