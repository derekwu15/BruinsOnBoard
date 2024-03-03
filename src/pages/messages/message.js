import React from 'react';

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { id: 1, sender: 'John', content: 'Hey there!' },
        { id: 2, sender: 'Alice', content: 'How are you?' },
        { id: 3, sender: 'Bob', content: 'Let\'s catch up later.' }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Messages</h1>
        <div>
          {this.state.messages.map(message => (
            <div key={message.id} className="message">
              <div className="message-sender">{message.sender}</div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MessagesPage;
