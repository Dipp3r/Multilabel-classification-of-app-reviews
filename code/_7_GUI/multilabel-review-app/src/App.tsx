import { useState, useEffect } from 'react'

import './App.css'
import Classify from './Bert-BiGru';



function App() {
  const classColors = {
    "F": "#ee5a3f",
    "BR": "#a03fee",
    "AU": "#5a3fee",
    "FI": "#3f8dee",
    "IR": "#ee7d3f",
    "A": "#419a5a",
    "L": "#ffc2ef",
    "LF": "#9a414c",
    "MN": "#335a66",
    "O": "#ae728e",
    "PE": "teal",
    "SC": "#a36c82",
    "SE": "#2b3535",
    "US": "navy",
    "PO": "#7c47d8"
};
  const [reviews, setReviews] = useState<[string, string[]][]>([]);
  const [reviewText, setReviewText] = useState("");

  const handleReviewChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const  handlePost = async() => {
    const predictedLabels = await Classify(reviewText);
    setReviews([...reviews, [reviewText, predictedLabels]]);
    setReviewText("");
  };
  
  useEffect(() => {
    async function fetchData(){
      if (reviewText !== "") {
        const predictedLabels = await Classify(reviewText);
        setReviews([...reviews, [reviewText, predictedLabels]]);
        setReviewText("");
      }
    }
    fetchData();
  }, [reviews]);

  return (
    <>
    <div id='comment-page'>
    <div id="main-review-section">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} id='review-card' className='column'>
              <div className="row">
                <p id="review-text">{review[0]}</p>
              </div>
              <div className='row end' id="labels">
                {review[1].map((label)=>{
                  return <div className='label-tag' style={{backgroundColor:classColors[label as keyof typeof classColors]}}>{label}</div>
                })}
              </div>
            </div>
          ))
        ) : (
          <code id="title">Introducing <strong style={{fontSize:"15px", color:"#F21171"}}>ReviewSense</strong>: your smart assistant for understanding reviews with ease. Using advanced technology, it helps pinpoint sentiments and categorize reviews accurately. No more guesswork—just get your comments classified into software requirements instantly</code>
        )}
      </div>
    </div>
    <div id="text-bar-wrapper">
        <textarea placeholder='comment your thoughts...' value={reviewText} id='comment-box'onChange={handleReviewChange}/>
        <button id="post-button" onClick={handlePost}>Post</button>
      </div>
    </>
  )
}

export default App