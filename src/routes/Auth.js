import { async } from "@firebase/util";
import { authService } from "../firebase";
import React, { useState } from "react";
export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        };
    };
    const onSubmit = async (event) => {
        let data;
        console.log(email, password);
        event.preventDefault();
        try{
            if (newAccount) {
                const auth = authService.getAuth();
                await authService.createUserWithEmailAndPassword(auth, email, password);
    
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }  catch(error){
            console.error(error);
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};