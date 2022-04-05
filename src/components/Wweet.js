import React from 'react';
import { db, storeService } from 'utils/firebase';

const Wweet = ({ wweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this wweet?');
    console.log(ok);
    if (ok) {
      await storeService.deleteDoc(storeService.doc(db, 'wweets', wweetObj.id));
    }
  };

  return (
    <>
      <div>
        <h4>{wweetObj.text}</h4>
        {isOwner && <button onClick={onDeleteClick}>Delete Wweet</button>}
        {isOwner && <button>Edit Wweet</button>}
      </div>
    </>
  );
};

export default Wweet;
