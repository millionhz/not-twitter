import { Modal, Button } from '@mui/material';
import { useState, useEffect } from 'react';

function NotificationPage() {
  const tokeId = sessionStorage.getItem('token');
  const session = sessionStorage.getItem('logged-in');
  const [numNotifications, setNumNotif] = useState(0);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState([
    {
      date: 0,
      time: '',
      notification: '',
    },
  ]);
  // login check -> return to \ if user is not logged in
  const [callEffect, setCallEffect] = useState(false);
  const checkSession = () => {
    if (!session || session === null) {
      sessionStorage.setItem(
        'msg',
        JSON.stringify('Please Log in to Continue')
      );
      window.location.href = '/';
    }
  };
  useEffect(() => {
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
      });

      return response.json();
    }

    getData(
      'https://not-twitter-production.up.railway.app/notifications/all'
    ).then((response) => {
      console.log(response);
      setState(response);
      console.log(response);
      console.log(response.length);
      setNumNotif(response.length);
    });
  }, [callEffect]);

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState([``]);
  const [action, setAction] = useState(`all`); // give option to delete all or one notification

  const handleShow = (message, type) => {
    setMsg(message);
    if (type === `all`) {
      setAction(type);
    } else {
      setAction(`id/${type}`);
    }

    setShow(true);
  };
  const handleClose = (changeBlock) => {
    setShow(false);
    if (changeBlock === true) {
      console.log(
        `sending to backend, https://not-twitter-production.up.railway.app/notifications/${action}`
      );
      sendData();
    }
  };

  async function sendData() {
    const response = await fetch(
      `https://not-twitter-production.up.railway.app/notifications/${action} `,
      {
        method: 'DELETE',
        withCredentials: true,
        credentials: 'include'
      }
    );
    console.log(response);

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202
    ) {
      console.log(`processed ${!callEffect}`);
      setCallEffect(!callEffect);
    }
  }
  const renderNotifications = () => {
    try {
      if (state.length > 0) {
        return state.map((item, index) => {
          const { timestamp, title, notificationId } = item;
          const date = timestamp.split(' ')[0];
          const time = timestamp.split(' ')[1];
          return (
            <div>
              <div className='datetime'>
                <h2 className='date remove-wrapping'>{date}</h2>
                <h3 className='time'>{time}</h3>
              </div>
              <div className='notificationBox'>
                <span>
                  {title}
                  <button
                    type='submit'
                    className='link-v2 deletenotification'
                    onClick={() =>
                      handleShow(
                        [
                          `Are you sure you want to delete this notification?`,
                          `Don't Delete`,
                          `Delete Notification`,
                        ],
                        notificationId
                      )
                    }
                  >
                    Delete
                  </button>
                </span>
              </div>
              <br />
            </div>
          );
        });
      } 
      // else {
      //   return (
      //     <div className='notificationBox'>
      //       <span>You have no new notifications.</span>
      //     </div>
      //   );
      // }
    } 
    catch {checkSession()}
  };
  return (
    <div>
      {checkSession()}
      <div className='min-height-div'>
        <h1>Notifications</h1>
        <br />
        <ul>
          <button
            type = 'submit'
            className='link-v2 deleteAll'
            onClick={() =>
              handleShow(
                [
                  `Are you sure you want to delete all notifications?`,
                  `Don't Delete`,
                  `Delete All`,
                ],
                `all`
              )
            }
          >
            Delete All
          </button>
        </ul>
        <br />
        {renderNotifications()}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Modal show={show} onHide={handleClose} className='delete-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg[0]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='delete-secondary'
            onClick={() => handleClose(false)}
          >
            {msg[1]}
          </Button>
          <Button
            variant='primary'
            className='delete-primary'
            onClick={() => handleClose(true)}
          >
            {msg[2]}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NotificationPage;
