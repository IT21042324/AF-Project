export function SearchBar(props) {
  return (
    <div>
      <div
        className="input-group"
        style={{
          width: "30%",
          float: "right",
          marginRight: "20px",
        }}
      >
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search based on Item or Entrepreneur"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => props.functionSearch(e.target.value)}
        />
        <button type="button" className="btn btn-outline-primary">
          Search
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}
