
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";

const PageChooser = ({ numQuestions, size }) => {

  // what does this thing need to do?
  // it needs to divide numQuestions up by size to get the number of pages
  // and then have a number of links, each of which fetches the particular page
  // each one will be a link? the default fetch on allQuestions will fetch the first page
  // and the rest will link to deeper fetches

  // furthermore we only want to display the first five pages, as well as the last, and
  // a link to the next page and prev page

  // so we need an array of page numbers

  if (!size) size = 5

  let numPages = Math.ceil(numQuestions / size)

  let pageList = []

  for (let i = 1; i < numPages + 1; i++) {
    pageList.push(i)
  }

  const useQuery = () => {
    const { search } = useLocation()
    // console.log(search)
    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()


  return (
    <div>
      <h1>Hello from PageChooser!</h1>
      {query.get("page") && (
        <NavLink to={Number(query.get("page")) - 1 > 1 ? `/questions?page=${Number(query.get("page")) - 1}` : '/questions'}>Prev</NavLink>
      )}
      {pageList.map(pageNumber => (
        <div>
          <NavLink to={pageNumber === 1 ? '/questions' : `/questions?page=${pageNumber}`}>
            {pageNumber}
          </NavLink>
        </div>
      ))}
      {Number(query.get("page")) < numPages && (
        <NavLink to={`/questions?page=${Number(query.get("page")) + 1}`}>Next</NavLink>
      )}
    </div>
  )
}

export default PageChooser;
