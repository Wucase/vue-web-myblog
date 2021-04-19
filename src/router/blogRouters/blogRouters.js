

const Router = [
  {
    path: "myblog",
    component: () => import('@/views/myBlog/MyBlog')
  },
  {
    path: "message",
    component: () => import('@/views/message/Message')
  },
  {
    path: "diary",
    component: () => import('@/views/diary/Diary')
  },
  {
    path: "friendlink",
    component: () => import('@/views/friendlink/FriendLink')
  },
  {
    path: "about",
    component: () => import('@/views/about/About')
  },
  {
    path: "writeblog",
    component: () => import('@/views/write/WriteBlog')
  },
  {
    path: "myblogdetail/:id",
    component: () => import('@/views/myBlogDetail/MyBlogDetail')
  },
]

export default Router



