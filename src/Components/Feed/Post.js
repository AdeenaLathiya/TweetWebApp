import React, { forwardRef } from "react";

import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

import "./Post.css";

const Post = forwardRef(
  (
    { displayName, userName, verified, text, image, avatar, createdOn },
    ref
  ) => {
    return (
      <div className="post" ref={ref}>
        <div className="post-avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post-body">
          <div className="post-header">
            <div className="post-headerText">
              <h3>
                {displayName}{" "}
                <span className="post-headerSpecial">
                  {verified && <VerifiedUserIcon className="post-badge" />} @
                  {userName}
                  {/* {createdOn} */}
                </span>
              </h3>
            </div>
            <div className="post-headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post-footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
