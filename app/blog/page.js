import fs from "fs"
import path from "path"
import matter from "gray-matter"

async function getAllBlogs() {
  const files = fs.readdirSync(path.join("data"))
  const blogs = files.map((fileName) => {
    const fileData = fs.readFileSync(path.join("data", fileName), "utf-8")
    const { data } = matter(fileData)

    console.log(matter(fileData))

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
        <div key={index}>
          <h2>{blog.frontmatter.title}</h2>
          <p>{blog.frontmatter.date}</p>
        </div>
      })}
    </>
  )
}

export default Blog