import { useState } from "react";
import PostSelection from "../main_files/Post/PostSelection";
import Title from "../main_files/Post/Title";
import Question from "../main_files/Post/Question";
import Article from "../main_files/Post/Article";
import TagPostButton from "../main_files/Post/TagPostButton";
import PostEditor from "./PostEditor"; // Import the PostEditor component
import "../main_files/Post/post.css";
import { addDoc, collection } from "firebase/firestore";
import { db, imageDb } from "../init-firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function Post() {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [msg, setMsg] = useState("Start your question with how, what, why, etc.");
  const [questionData, setQuestionData] = useState({
    title: "",
    problem: "",
    tags: "",
  });
  const [articleData, setArticleData] = useState({
    title: "",
    abstract: "",
    article_text: "",
    tags: "",
  });
  const [isArticle, setIsArticle] = useState(false);
  const [display, setDisplay] = useState(null); // Initialize display as null

  // Define handleQuestionChange before setting display
  const handleArticleChange = (event) => {
    const { name, value } = event.target;
    setArticleData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    setQuestionData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileUid = v4();
    const imageRef = ref(imageDb, "files/" + (isArticle ? "article" : "question") + "/" + fileUid);

    const date = new Date();
    const currentdate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const currenttime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    try {
      if (img) {
        await uploadBytes(imageRef, img);
      }

      const userRef = collection(db, isArticle ? "ArticleData" : "QuestionData");

      if (isArticle) {
        await addDoc(userRef, { ...articleData, imageId: fileUid, uploadDate: currentdate, uploadTime: currenttime });
      } else {
        await addDoc(userRef, { ...questionData, imageId: fileUid, uploadDate: currentdate, uploadTime: currenttime });
      }

      console.log("Post submitted successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error submitting post:", error.message);
    }
  };

  function checkState(selectOption) {
    if (selectOption === "article") {
      setArticleData({
        title: "",
        abstract: "",
        article_text: "",
        tags: "",
      });
      setIsArticle(true);
      setMsg("Enter a descriptive title");
      setDisplay(<Article func={handleArticleChange} obj={{ articleData }} />);
    } else {
      setQuestionData({
        title: "",
        problem: "",
        tags: "",
      });
      setMsg("Start your question with how, what, why, etc.");
      setDisplay(
        <>
          <Question obj={{ questionData }} func={handleQuestionChange} />
          <PostEditor /> {/* Show the PostEditor for code and Markdown */}
        </>
      );
      setIsArticle(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PostSelection checkState={checkState} />
        <Title
          placeholder_msg={msg}
          func={isArticle ? handleArticleChange : handleQuestionChange}
          obj={isArticle ? articleData : questionData}
          func2={setImg}
        />
        {display}
        <TagPostButton
          func={isArticle ? handleArticleChange : handleQuestionChange}
          obj={isArticle ? articleData : questionData}
        />
      </form>
    </div>
  );
}

export default Post;
