import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FirebaseContext } from "../../firebase";
import { LINKS_PER_PAGE, FUNCTION_URL } from "../../utils/";

import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const isNewPage = props.location.pathname.includes("new");
  const isTopPage = props.location.pathname.includes("top");
  const page = Number(props.match.params.page);
  const linksRef = firebase.db.collection("links");

  useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  const getLinks = () => {
    const hasCursor = Boolean(cursor);
    setLoading(true);
    if (isTopPage) {
      return (
        firebase.db
          .collection("links")
          // .limit(LINKS_PER_PAGE)
          .orderBy("votesCount", "desc")
          .onSnapshot(handleSnapshot)
      );
    } else if (page === 1) {
      return linksRef
        .limit(LINKS_PER_PAGE)
        .orderBy("created", "desc")
        .onSnapshot(handleSnapshot);
    } else if (hasCursor) {
      return linksRef
        .orderBy("created", "desc")
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else {
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios.get(`${FUNCTION_URL}?offset=${offset}`).then(response => {
        const links = response.data;
        const lastLink = links[links.length - 1];
        setLinks(links);
        setCursor(lastLink);
        setLoading(false);
      });
      return () => {};
    }
  };

  const handleSnapshot = snapshot => {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    const lastLink = links[links.length - 1];
    setLinks(links);
    setCursor(lastLink);
    setLoading(false);
  };

  function navigatePreviusPage() {
    console.log("test1");
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }
  function navigateNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
  }

  // function renderLinks() {
  //   if (isNewPage) {
  //     return links;
  //   }
  //   const topLinks = links
  //     .slice()
  //     .sort((l1, l2) => l2.votesCount - l1.votesCount);
  //   return topLinks;
  // }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div style={{ opacity: loading ? 0.25 : 1 }}>
      {links &&
        links.map((link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + pageIndex}
          />
        ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={navigatePreviusPage}>
            {" << "} Previus
          </div>
          <div className="divider-pagination">|</div>
          <div className="pointer ml2" onClick={navigateNextPage}>
            Next {" >> "}
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkList;
