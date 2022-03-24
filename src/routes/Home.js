import React, { useState } from 'react';
import { dbService } from 'utils/firebase';

const Home = () => {
  const [wweet, setWweet] = useState('');
  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection('wweets').add({
      wweet,
      createdAt: Date.now(),
    });
    setWweet('');
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setWweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={wweet}
          onChange={onChange}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Wweet" />
      </form>
    </div>
  );
};
export default Home;
