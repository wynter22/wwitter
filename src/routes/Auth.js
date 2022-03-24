import { authService } from 'utils/firebase';
import React, { useState } from 'react';
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const onChange = event => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async event => {
    event.preventDefault();
    const auth = authService.getAuth();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(auth, email, password);
      } else {
        await authService.signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Already Joined');
      } else {
        setError(error.message);
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  };

  const onSocialClick = async event => {
    const auth = authService.getAuth();
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new authService.GoogleAuthProvider();
    }
    if (name === 'github') {
      provider = new authService.GithubAuthProvider();
    }

    await authService.signInWithPopup(auth, provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="submit"
            value={newAccount ? 'Create Account' : 'Log In'}
          />
        </div>
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Sign Up'}
      </button>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
