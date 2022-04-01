import React, { useEffect, useState } from 'react';
import { db, storeService } from 'utils/firebase';

const Home = ({ userObject }) => {
  const [wweet, setWweet] = useState('');
  const [wweets, setWweets] = useState([]);

  useEffect(() => {
    storeService.onSnapshot(storeService.collection(db, 'wweets'), snapshot => {
      const wweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWweets(wweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();

    await storeService.addDoc(storeService.collection(db, 'wweets'), {
      text: wweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
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
          placeholder=""
          maxLength={120}
        />
        <input type="submit" value="Wweet" onClick={onSubmit} />
      </form>
      <div>
        {wweets.map(wweet => (
          <div key={wweet.id}>
            <h4>{wweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
