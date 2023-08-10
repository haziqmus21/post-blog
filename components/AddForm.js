import style from "../styles/AddForm.module.css";

const AddForm = ({
  title,
  date,
  description,
  author,
  data,
  setTitle,
  setAuthor,
  setDate,
  setDescription,
  setData,
}) => {
  const submitHanlder = (e) => {
    e.preventDefault();
    let obj = {
      title,
      author,
      date,
      description,
    };

    const hasDuplicate = data.some((item) => item.title === title);

    if (!hasDuplicate) {
      setData((prev) => [...prev, obj]);
      localStorage.setItem("data", JSON.stringify(data));
      setTitle("");
      setAuthor("");
      setDate("");
      setDescription("");
    }
  };

  return (
    <form className={style.form_wrapper} onSubmit={submitHanlder}>
      <div className={style.form_inner}>
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
      <div className={style.form_inner}>
        <label>Author</label>
        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className={style.form_inner}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className={style.form_inner}>
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={style.submit}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddForm;
