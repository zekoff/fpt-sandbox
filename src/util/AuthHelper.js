import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(getAuth(), new GoogleAuthProvider());
        const user = res.user;
        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
    }
};

export { signInWithGoogle };