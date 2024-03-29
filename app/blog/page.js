import fs from "fs"
import path from "path"
import matter from "gray-matter"

async function getAllBlogs() {
  const files = fs.readdirSync(path.join("data"))
  const blogs = files.map((fileName) => {
    const fileData = fs.readFileSync(path.join("data", fileName), "utf-8")
    const data = matter(fileData)

    return {
      frontmatter: data,
    }
  })

  return {
    blogs: blogs
  }
}

const Blog = async() => {
  const { blogs } = await getAllBlogs()
  return(
    <>
      <h1>ブログページ</h1>
      {blogs.map((blog, index) => {
        {console.log(blog.frontmatter.data.title)}
        <div key={index}>
          <h2>{blog.frontmatter.data.title}</h2>
          <p>{blog.frontmatter.data.date}</p>
        </div>
      })}
    </>
  )
}

export default Blog