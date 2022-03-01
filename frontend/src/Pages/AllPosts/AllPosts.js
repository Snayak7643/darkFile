import React, { useState, useEffect } from "react";
import { Card, CardContainer, CardImage, CardWrapper } from "./AllPostsStyle";
import { FaBan } from "react-icons/fa";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/allposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <CardWrapper>
      {posts[0] ? (
        posts.map((post) => {
          return (
            <Card key={post._id}>
              <CardImage src={post.pic} alt="Photo" />
              <CardContainer>
                <h4>{post.title}</h4>
              </CardContainer>
            </Card>
          );
        })
      ) : (
        <FaBan
          style={{ fontSize: "200px", color: "grey", marginLeft: "30%" }}
        />
      )}
    </CardWrapper>
  );
};

export default AllPosts;
