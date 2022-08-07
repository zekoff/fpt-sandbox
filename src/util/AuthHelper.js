import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = async (auth) => {
    try {
        const res = await signInWithPopup(auth, new GoogleAuthProvider());
        const user = res.user;
        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
    }
};

export { signInWithGoogle };