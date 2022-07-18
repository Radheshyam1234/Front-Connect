export const getFilteredPosts = (allPosts, filter, user) => {
  const myFeedPost = allPosts
    .slice()
    .filter(
      (post) =>
        user.following.includes(post.postedBy._id) ||
        user.followers.includes(post.postedBy._id) ||
        user._id === post.postedBy._id ||
        post.likes.includes(user._id)
    );

  switch (filter) {
    case "My Feed":
      return myFeedPost;

    case "Trending":
      return allPosts.slice(0, 8).sort((first, second) => {
        return first.likes.length + first.comments.length >
          second.likes.length + second.comments.length
          ? -1
          : 1;
      });

    case "Oldest":
      return myFeedPost.sort((first, second) => {
        return first.createdAt > second.createdAt ? 1 : -1;
      });

    case "Following":
      return allPosts
        .slice()
        .filter((post) => user.following.includes(post.postedBy._id));
  }
};
