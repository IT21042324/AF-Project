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
          style={{ top: "20px" }}
          onChange={(e) => props.functionSearch(e.target.value)}
        />
      </div>
      <br />
      <br />
    </div>
  );
}
