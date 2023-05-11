export const isPostLikedByUser = (post, userId) => {
  for (let item of post.isPostLikedByUser) {
    if (item.id === userId) return true;
  }
  return false;
};

export const isCommentLikedByUser = (comment, userId) => {
  for (let item of comment.likedByUsers) {
    if (item.id === userId) return true;
  }
  return false;
};

export const isSavePost = (user, postId) => {
  for (let item of user.savedPost) {
    if (item.id === postId) return true;
  }
  return false;
};

export const isFollowing = (reqUser, user2) => {
  if (reqUser && user2) {
    for (let item of user2.follower) {
      if (reqUser.id === item.id) return true;
    }
  }
  return false;
};

export function timeDifference(timestamp) {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Calculate the time difference in milliseconds
  const diff = Date.now() - date.getTime();

  // Convert the time difference to seconds, minutes, hours, and days
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Format the time difference as a string
  if (weeks > 0) {
    return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
  } else if (days > 0) {
    return days + " day" + (days === 1 ? "" : "s") + " ago";
  } else if (hours > 0) {
    return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
  } else if (minutes > 0) {
    return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
  } else {
    return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
  }
}
