import React from "react";
import { useState } from "react";
import "./EssayInput.css";
import axios from "axios";

function EssayInputPage() {
  const [topic, setTopic] = useState(
    "Some people like to try new things, for example, places to visit and types of food. Other people prefer to keep doing things they are familiar with."
  );
  const [content, setContent] = useState(
    "Some people always yearn for new experiences in life and are never afraid to try new things. Others, on the contrary,  are happy doing the same thing and living in the same place all through their life primarily because they do not like changes. This essay will discuss both these attitudes. Personally, I believe that people who embrace changes and dare to try new things live life to the fullest. People who try new things are often risk-takers and adventure seekers. They believe that life is a constant journey, and they often have an unquenchable thirst to visit as many places as they can, try as many dishes as they come across, take part in numerous adventurous activities and try different career paths in their life. Such people take risks in their personal and professional life. This is why they are either hugely successful or live a nomadic life. For instance, one of my university friends started travelling when all others were busy looking for a job. Due to this, he was struggling financially while others were stable in their jobs and earnings. However, after ten years of our graduation, this friend, who is also a famous travel blogger on YouTube and an investigative journalist, earns at least 10 times higher than any of us. This success is not always assured but comes to those who embrace non-traditional life and try new things.On the other hand, many people are just happy doing the same thing over and over again and trying the things they are already familiar with. This approach involves fewer risks but often lacks big rewards and experience in life. Due to this mentality, many people are not interested in moving to a different city or trying a new career path despite their potential of doing something greater and bigger. Interestingly, many people who are afraid to take risks or try new things often claim to live a less complicated life. But I believe that this is not a way to live life to the fullest as it lacks adventure and never brings out our true potential in life.To conclude, doing the same things and living in the same place come with little risk, but lack adventure and tremendous rewards. Contrary to this, taking challenges and embracing new things come with enormous risks but the rewards are also huge."
  );
  const [comment, setComment] = useState(
    "submit to see comment. it will take few second..or you can open console network to see if request is success. | score... "
  );
  console.log(content, topic);

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3005/evaluate", {
        topic: topic.toString(),
        content: content.toString(),
      })
      .then((res) => {
        console.log(res.data.feedback.CC);
        setComment(
          `FEEDBACK:TR:${res.data.feedback.TR} CC:${res.data.feedback.CC} GRA:${res.data.feedback.GRA} LR:${res.data.feedback.LR} Overall:${res.data.feedback.Overall} | SCOREs:TR${res.data.scores.TR}, GRA${res.data.scores.GRA}, CC${res.data.scores.CC}, LR${res.data.scores.LR}`
        );
      })
      .catch((err) => console.log(err));
    // const data = await response.json();
    // console.log(data);
    // setComment(data);
  }

  return (
    <div className="flex-row">
      <div>
        <h3>EssayInputPage</h3>
        <div className="input-group">
          <form onSubmit={handleSubmit} className="form">
            <button>submit</button>
            <div>
              <label>topic </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="topic"
              ></textarea>
            </div>
            <div>
              <label>content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="content"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="comment-box">
        <div className="comment">
          <h3>comment:</h3>
          {comment.split("|")[0]}
        </div>
        <div className="scores">
          <h3>scores:</h3>
          {comment.split("|")[1]}
        </div>
      </div>
    </div>
  );
}

export default EssayInputPage;
