import React, { useEffect, useState } from 'react';
import { db, storeService } from 'utils/firebase';

const Home = () => {
  const [wweet, setWweet] = useState('');
  const [wweets, setWweets] = useState([]);
  const getWweets = async () => {
    const wweets = await storeService.getDocs(
      storeService.collection(db, 'wweets')
    );

    wweets.forEach(document => {
      const wweetObject = {
        ...document.data(),
        id: document.id,
      };
      setWweets(prev => [wweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getWweets();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await storeService.addDoc(storeService.collection(db, 'wweets'), {
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
        <input type="submit" value="Wweet" onClick={onSubmit} />
      </form>
      <div>
        {wweets.map(wweet => (
          <div key={wweet.id}>
            <h4>{wweet.wweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
