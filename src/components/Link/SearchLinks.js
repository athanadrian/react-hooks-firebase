import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "../Link/LinkItem";

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [filter, setFitler] = useState("");

  useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db
      .collection("/links")
      .get()
      .then(snapshot => {
        const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(link => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query) ||
        link.comments.filter(comment => {
          console.log(comment);
          comment.text.toLowerCase().includes(query);
        })
      );
    });
    console.log(matchedLinks);
    setFilteredLinks(matchedLinks);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input onChange={e => setFitler(e.target.value)} />
        <button>OK</button>
      </form>
      {filteredLinks &&
        filteredLinks.map((filteredLink, index) => (
          <LinkItem
            key={filteredLink.id}
            showCount={false}
            link={filteredLink}
            index={index + 1}
          />
        ))}
    </div>
  );
}

export default SearchLinks;
