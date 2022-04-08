import React, { useState } from 'react';
import { db, storeService } from 'utils/firebase';

const Wweet = ({ wweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newWweet, setNewWweet] = useState(wweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this wweet?');
    if (ok) {
      await storeService.deleteDoc(storeService.doc(db, 'wweets', wweetObj.id));
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async event => {
    event.preventDefault();

    await storeService.updateDoc(storeService.doc(db, 'wweets', wweetObj.id), {
      text: newWweet,
    });
    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewWweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newWweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{wweetObj.text}</h4>
          {isOwner && <button onClick={onDeleteClick}>Delete Wweet</button>}
          {isOwner && <button onClick={toggleEditing}>Edit Wweet</button>}
        </>
      )}
    </div>
  );
};

export default Wweet;
