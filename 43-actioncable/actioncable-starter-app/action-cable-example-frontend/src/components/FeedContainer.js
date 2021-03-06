import React, { Component } from 'react';
import TweetForm from './TweetForm';
import TweetList from './TweetList';
import { ActionCableConsumer } from 'react-actioncable-provider';

import adapter from '../services/adapter';

class FeedContainer extends Component {
  state = { displayedTweets: [], newTweets: [] };

  componentDidMount() {
    adapter.fetchFeed(1).then(res => {
      this.setState({ displayedTweets: res });
    });
  }

  addTweet = tweet => {
    this.setState(prevState => {
      return {
        newTweets: [tweet, ...prevState.newTweets]
      };
    });
  };

  handleDisplayTweets = () => {
    this.setState(prevState => {
      return {
        displayedTweets: [
          ...prevState.newTweets,
          ...prevState.displayedTweets
        ],
        newTweets: []
      };
    });
  };

  render() {
    const { displayedTweets, newTweets } = this.state;

    return (
      <div className="Feed">
        <ActionCableConsumer
          channel={{ channel: "FeedChannel" }}
          onReceived={(tweet) => {
            console.log("what will it be!", tweet)
            this.addTweet(tweet)
          }}
        />
        <TweetForm addTweet={this.addTweet} />
        <TweetList
          handleDisplayTweets={this.handleDisplayTweets}
          newTweetCount={newTweets.length}
          tweets={displayedTweets}
        />
      </div>
    );
  }
}

export default FeedContainer;
