import style from "../styles/post.module.css";

const Post = (props) => {
  return (
    <div className={style.data_item} id={props.id} key={props.id}>
      <h3 className={style.title}>{props.title}</h3>
      <div>
        <span className={style.author}>
          <i className="fa-solid fa-user" title="Author"></i>
          {props.author}
        </span>
        <span className={style.date}>
          <i className="fa-solid fa-calendar-days solid" title="Calendar"></i>
          {props.date}
        </span>
        <span
          className={style.edit}
          onClick={() => props.editHandler(props.title)}
        >
          <i className="fa-solid fa-pen-to-square" title="Edit"></i>
        </span>
      </div>
      <div className={style.description}>{props.description}</div>
    </div>
  );
};

export default Post;
