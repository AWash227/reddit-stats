import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.scss";
import { Statsbar } from "./Statsbar";
import { TopPosts } from "./components/TopPosts";

function App() {
  const [search, setSearch] = React.useState("");
  const [subInfo, setSubInfo] = React.useState({ data: {} });
  const [posts, setPosts] = React.useState([]);

  const getTopPostsFromSub = sub => {
    fetch(`http://www.reddit.com/r/${sub}/top.json?t=all&limit=100`)
      .then(response => response.json())
      .then(result => {
        setPosts([...result.data.children]);
        console.log(...result.data.children);
      });
  };

  const getSubredditInfo = sub => {
    fetch(`http://www.reddit.com/r/${sub}/about.json`)
      .then(response => response.json())
      .then(result => {
        setSubInfo(result);
        console.log(result);
      });
  };

  const getAllSubredditData = (sub, event) => {
    event.preventDefault();
    getSubredditInfo(sub);
    getTopPostsFromSub(sub);
  };

  const sortByField = fieldName => {
    const newPosts = [...posts];
    newPosts.sort((a, b) => (a.data[fieldName] < b.data[fieldName] ? 1 : -1));
    setPosts(newPosts);
  };

  const averageTitleLength = posts => {
    if (posts) {
      let total = 0;
      let postLengths = posts.map(post => post.data.title.length);
      for (let i = 0; i < postLengths.length; i++) {
        total += postLengths[i];
      }

      return total / posts.length;
    }
  };
  const averageWordLength = posts => {
    if (posts) {
      let total = 0;
      let wordLengths = posts.map(post => post.data.title.split(" ").length);
      for (let i = 0; i < wordLengths.length; i++) {
        total += wordLengths[i];
      }
      return total / posts.length;
    }
  };

  const HeaderImage = styled.div`
    background-image: ${props =>
      `url(${props.subInfo.data.banner_background_image})`};
    background-color: ${props => props.subInfo.data.banner_background_color};
  `;

  return (
    <div className="App">
      <div className="header">
        {subInfo ? (
          <HeaderImage className="header--image" subInfo={subInfo} />
        ) : null}
        <div className="header--search">
          <h3>Get Stats from subreddit</h3>
          <form onSubmit={event => getAllSubredditData(search, event)}>
            <span>/r/ </span>
            <input
              type="text"
              placeholder="subreddit..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </form>
        </div>
      </div>
      <Statsbar
        title={subInfo.data.display_name || ""}
        subs={subInfo.data.subscribers || 0}
        active={subInfo.data.accounts_active || 0}
        avgTitle={averageTitleLength(posts) || 0}
        avgWords={averageWordLength(posts) || 0}
      />
      <TopPosts sortByField={sortByField} posts={posts} />

      <div className="page"></div>
    </div>
  );
}

export default App;
