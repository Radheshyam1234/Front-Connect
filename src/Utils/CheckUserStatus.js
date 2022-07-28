export const isUserOnline = (activeUsers, userId) => {
  const index = activeUsers?.findIndex(
    (user) => user?.userId.toString() === userId?.toString()
  );
  if (index != -1) return true;
  return false;
};
