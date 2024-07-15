import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
const Post = (post) => {
  const { _id, title, user, summary, content, image, createdAt } = post;
  const date = new Date(createdAt);
  const isValidDate = !isNaN(date);

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {user && user.firstname} {user && user.lastname}
          </a>
          {isValidDate ? (
            <time>{formatISO9075(date)}</time>
          ) : (
            <time>Invalid Date</time>
          )}
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
