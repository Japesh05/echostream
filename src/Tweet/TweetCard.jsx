import React from "react";
import TweetHeader from "./TweetHeader";
import TweetContent from "./TweetContent";
import TweetMedia from "./TweetMedia";
import TweetActions from "./TweetActions";

function TweetCard({data}) {
  return (
    <div>
      <TweetHeader data= {data}/>
      <TweetContent data = {data} />
      <TweetMedia data={data}/>
      <TweetActions data = {data} />
    </div>
  );
}

export default TweetCard;
