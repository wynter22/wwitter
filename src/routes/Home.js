import React, { useState } from 'react';
const Home = () => {
  const [wweet, setWweet] = useState('');
  const onSubmit = event => {
    event.preventDefault();
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
        <input type="text" value="Wweet" />
      </form>
    </div>
  );
};
export default Home;
