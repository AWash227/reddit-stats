import React from "react";
import { numberWithCommas } from "../funcs";
import moment from "moment";

export const TopPosts = ({ sortByField, posts }) => (
  <div className="top--posts">
    <h5>Top Posts</h5>
    <table>
      <tbody>
        <tr>
          <th>Post Title</th>
          <th
            style={{ textAlign: "right" }}
            onClick={event => sortByField("score")}
          >
            Score
          </th>
          <th
            style={{ textAlign: "right" }}
            onClick={event => sortByField("gilded")}
          >
            <img
              src="https://www.redditstatic.com/gold/awards/icon/gold_32.png"
              width={20}
            />
          </th>
          <th onClick={event => sortByField("created")}>Created</th>
        </tr>
        {posts
          ? posts.map(post => (
              <tr key={post.data.id} className="post">
                <td className="post--title">
                  <a href={`http://www.reddit.com${post.data.permalink}`}>
                    {post.data.title}
                  </a>
                </td>
                <td className="post--score">
                  <span style={{ textAlign: "right" }}>
                    {numberWithCommas(post.data.score)}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>{`${post.data.gilded}x`}</td>
                <td style={{ textAlign: "right" }}>
                  {moment.unix(post.data.created).format("MMM d, h:mm, 'YY")}
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  </div>
);
