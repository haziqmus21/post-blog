import style from "../styles/style.module.css";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Head from "next/head";
import AddForm from "../components/AddForm";
import style1 from "../styles/AddForm.module.css";

const Index = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [key, setKey] = useState();

  const [search, setSearch] = useState();
  const [searchFlag, setSearchFlag] = useState(false);

  const [sortOption, setSortOption] = useState("");

  const searchHandler = (e) => {
    let filterData = data.filter((item) => item.title.includes(search));
    setSearchFlag(true);
    setData(filterData);
  };

  const sortData = (option) => {
    if (option === "title") {
      setData([...data].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (option === "date") {
      setData([...data].sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0 && !searchFlag) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (sortOption !== "") {
      sortData(sortOption);
    }
  }, [sortOption]);

  const updateHandler = (e) => {
    e.preventDefault();
    let obj = {
      title,
      author,
      date,
      description,
    };
    if (localStorage.getItem("data")) {
      let data = JSON.parse(localStorage.getItem("data"));
      let filterData = data.filter((item) => item.title !== key);
      filterData.unshift(obj);
      localStorage.setItem("data", JSON.stringify(filterData));
      setData(filterData);
      setEdit(false);
      setTitle("");
      setAuthor("");
      setDescription("");
      setDate("");
    }
  };

  useEffect(() => {
    let filter = data.filter((item) => item.title === key);

    if (filter.length > 0) {
      filter = filter[0];
      setTitle(filter.title);
      setAuthor(filter.author);
      setDate(filter.date);
      setDescription(filter.description);
    }
  }, [key]);

  const editHandler = (id) => {
    setEdit(true);
    setKey(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const dataHandler = (val) => {
    // console.log(val);
  };

  return (
    <div className={style.wrapper}>
      <Head>
        <script src="https://kit.fontawesome.com/6db46ed9de.js"></script>
      </Head>
      <div className={style.nav}>
        <div className={style.search}>
          <input
            type="text"
            placeholder="Enter value to search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchHandler}>Search</button>
        </div>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className={style.select}
        >
          <option>Select sort</option>
          <option value="title">Sort by title</option>
          <option value="date">Sort by date</option>
        </select>
      </div>
      {!edit && (
        <AddForm
          title={title}
          author={author}
          date={date}
          description={description}
          data={data}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setDate={setDate}
          setDescription={setDescription}
          setData={setData}
        />
      )}
      {edit && (
        <form
          className={style1.form_wrapper}
          style={{ background: "lightgreen" }}
          onSubmit={updateHandler}
        >
          <div className={style1.form_inner}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className={style1.form_inner}>
            <label>Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className={style1.form_inner}>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={style1.form_inner}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={style1.submit}>
            <button type="submit">Update</button>
          </div>
        </form>
      )}
      <div className={style.data_wrapper}>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <Post
                id={index}
                title={item.title}
                author={item.author}
                date={item.date}
                description={item.description}
                editHandler={editHandler}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
