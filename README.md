# Leaveit!

Leaveit! is a single-page calorie tracker app for dogs, inspired by [Loseit!](https://www.loseit.com/). It mimicks some of Loseit!'s functionalities, such as creating food, adding food to a a pet's daily calorie tracker, and logging their daily weight.

## Live site

https://leaveit.herokuapp.com/

## Technologies used

- ### Frontend
  - HTML, CSS, Javascript, React, Redux
- ### Backend
  - Flask, SQLAlchemy, Python, PostgreSQL

## Screenshots

### Home page

### Home page

### Home page

## Features

Users are able to create pets by inputing the appropriate goals and weights for their pets, then add one of the created food items onto their daily meal tracker. If users are not able to find certain food items, they are also able to create it in our database then add to their daily meal tracker. The meal tracker refreshes daily, and will show the daily caloric requirement, actual caloric intake, and how many more calories are needed.

## Challenges

- Application Design

  - As calorie tracking for dogs is not very popular, there are not too many similar websites that do similar functions. [Loseit!](https://leaveit.herokuapp.com/) has similar functions, but it is also slightly different since most calorie tracker apps out there only track the statistics for the logged in user. Leaveit! will have to be able to track and display multiple calorie trackers for each logged in users. Therefore, coming up with an elegant way to display the statistics was a little challenging, and it is also something that I am constantly still looking to improve. 
  - Due to nature of calorie tracking for dogs, their needs are calculated differently from human calorie tracking. For dogs, their daily calorie requirements depend on their size, their breed, their activity level, their age, and whether they are fixed. I had originally planned to have the user input the age of their pets when creating them. That had proved to be difficult because we would have to account for their age, but also whether they are neutered, etc. 

- Displaying Caloric Intake
  - Displaying the caloric intake of each pet was definitely one of the bigger challenges as it was not something that was stored in the database or the Redux store. It is 

```JS
const SearchBar = () => {
  const history = useHistory();
  const [searchParamsString, setSearchParamsString] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    return history.push(`/search/${searchParamsString}=${address}`);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <div className={styles.searchParams}>
          <h2>Find</h2>
        </div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Find your next spot"
          onChange={(e) => setSearchParamsString(e.target.value)}
          value={searchParamsString}
        />
        <div className={styles.searchParams}>
          <h2>Near</h2>
        </div>
        <input
          className={`${styles.searchInput}`}
          type="text"
          placeholder="Address, neighborhood, city, state, or zip"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <button className={styles.searchButton} type="submit">
          <FaSearch style={{ color: "white" }} />
        </button>
      </div>
    </form>
  );
};
```

```JS
const SearchPage = () => {
  const { searchParamsString } = useParams();
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
  const paramsArray = searchParamsString.split("="); //[searchParamsString, address]
  const businessList =
    paramsArray[0] === ""
      ? searchState[paramsArray[1]]
      : searchState[paramsArray[0]];

  useEffect(() => {
    const params = {
      searchParamsString: paramsArray[0],
      address: paramsArray[1],
    };
    dispatch(searchBusinesses_thunk(params));
  }, [dispatch]);

  if (!searchState) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={styles.businessList}>
        <div className={styles.headerDiv}>
          <h2 className={styles.header}>All Results</h2>
        </div>
        {businessList?.map((business) => (
          <div key={business.id} className={styles.business}>
            <NavLink
              className={styles.businessLink}
              to={`/businesses/${business.id}`}
            >
              <h2 className={styles.title}>{business.title}</h2>
              <p
                className={styles.address}
              >{`${business.city}, ${business.state}`}</p>
              <p className={styles.description}>{business.description}</p>
            </NavLink>
          </div>
        ))}
      </div>
    );
  }
};
```
