import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "../Link/LinkItem";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

function LinkDetail(props) {
  const linkId = props.match.params.linkId;
  const { user, firebase } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState("");
  const linkRef = firebase.db.collection("links").doc(linkId);

  useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then(doc => {
        if (doc.exists) {
          const previousCommments = doc.data().comments;
          const comment = {
            postedBy: {
              id: user.uid,
              name: user.displayName
            },
            created: Date.now(),
            text: commentText
          };
          const updatedComments = [...previousCommments, comment];
          linkRef.update({ comments: updatedComments });
          setLink(prevState => ({
            ...prevState,
            comments: updatedComments
          }));
          setCommentText("");
        }
      });
    }
  }

  return !link ? (
    <div>Loading......</div>
  ) : (
    <div>
      <LinkItem link={link} showCount={false} />
      <textarea
        rows="6"
        columns="60"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      />
      <div>
        <button className="button" onClick={handleAddComment}>
          add comment
        </button>
      </div>
      {link.comments.map((comment, index) => (
        <div key={index}>
          <p className="comment-author">
            {comment.postedBy.name} | {distanceInWordsToNow(comment.created)}
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
