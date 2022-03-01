// 获取用户的通信用户
export const getRecipientEmail = (users, currentUser) =>
  users?.filter(userToFilter => userToFilter !== currentUser?.email)[0];
