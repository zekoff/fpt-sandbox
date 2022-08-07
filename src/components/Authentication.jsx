import { Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuth } from 'reactfire';

async function googleSignIn(auth) {
    try {
        const res = await signInWithPopup(auth, new GoogleAuthProvider());
        const user = res.user;
        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
    }
}

function SignInButton(props) {
    const auth = useAuth();
    return <Button onClick={()=>googleSignIn(auth)}>Sign In</Button>
}

function SignOutButton(props) {
    const auth = useAuth();
    return <Button onClick={()=>signOut(auth)}>Sign Out</Button>
}

export { SignInButton, SignOutButton };