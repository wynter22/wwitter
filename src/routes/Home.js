import Wweet from 'components/Wweet';
import { orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db, storeService } from 'utils/firebase';

const Home = ({ userObject }) => {
  const [wweet, setWweet] = useState('');
  const [wweets, setWweets] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    const q = storeService.query(
      storeService.collection(db, 'wweets'),
      orderBy('createdAt', 'desc')
    );
    storeService.onSnapshot(q, snapshot => {
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

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setWweet(value);
  };

  const onClearAttachment = () => setAttachment(null);

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
        <input type="file" accept="imgae/*" onChange={onFileChange} />
        <input type="submit" value="Wweet" onClick={onSubmit} />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Cancel</button>
          </div>
        )}
      </form>
      <div>
        {wweets.map(wweet => (
          <Wweet
            key={wweet.id}
            wweetObj={wweet}
            isOwner={wweet.creatorId === userObject.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
