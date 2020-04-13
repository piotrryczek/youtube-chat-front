import React, { useState, useEffect, useCallback } from 'react';

import Api from 'services/api';
import socket from 'services/ioClient';
import Message from 'components/message';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const fetchLastMessages = async () => {
    const { data: response } = await Api.get('/messages', { limit: 10 });

    const { data: initialMessages } = response;

    initialMessages.reverse();

    setMessages(initialMessages);
  }

  const addMessages = useCallback((newMessages) => {
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  }, []);

  const setQuestion = useCallback((messageId) => {
    setMessages((prevMessages) => prevMessages.map((message) => {
      // eslint-disable-next-line no-underscore-dangle
      if (messageId === message._id) Object.assign(message, { isQuestion: true });

      return message;
    }));
  }, []);

  const unsetQuestion = useCallback((messageId) => {
    setMessages((prevMessages) => prevMessages.map((message) => {
      // eslint-disable-next-line no-underscore-dangle
      if (messageId === message._id) Object.assign(message, { isQuestion: false });

      return message;
    }));
  }, []);


  useEffect(() => {
    fetchLastMessages();

    socket.on('messages', (newMessages) => {
      addMessages(newMessages);
    });

    socket.on('setQuestion', (messageId) => {
      setQuestion(messageId);
    });

    socket.on('unsetQuestion', (messageId) => {
      unsetQuestion(messageId);
    });
  }, [addMessages, setQuestion, unsetQuestion]);

  return (
    <>
      {messages.map((message) => <Message {...message} canEdit />)}
    </>
  )
};

export default Chat;
