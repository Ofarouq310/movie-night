import { search } from "../assets"

export default function Search(props) {
  return (
    <div className="search">
        <div>
            <img src={search} alt="serch icon" />
            <input 
                type="text"
                placeholder="Search through thousands of movies"
                value={props.searchValue}
                onChange={(e) => props.setSearchValue(e.target.value)}
            />
        </div>
        <h1>{props.searchValue}</h1>
    </div>
  )
}
