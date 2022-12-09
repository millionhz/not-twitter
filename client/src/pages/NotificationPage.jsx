import { Modal, Button, Container } from 'react-bootstrap';
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
      // console.log(response);
      setState(response);
      // console.log(response);
      // console.log(response.length);
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
      console.log(state)
      if (state.length > 1) {
        return state.map((item, index) => {
          const { timestamp, title, notificationId } = item;
          const currDate = timestamp.split(' ')[0];
          const currTime = timestamp.split(' ')[1];
          return (
            <div>
              <div className='datetime'>
                <h2 className='date remove-wrapping'>{currDate}</h2>
                <h3 className='time'>{currTime}</h3>
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
                          `Do you want to delete this notification?`,
                          `No`,
                          `Delete`,
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
      if (state.length === 1)
      {
        return (
          <div>
            <span>You have no new notifications.</span>
          </div>
        );
      }
    } 
    catch { console.error('foo');  }
  };

  return (
    <Container>
    <div>
      <div>
        <h1>Notifications</h1>
        <br />
        <br />
        {renderNotifications()}
        <br />
        <br />
        <br />
        <br />
        <br />
        <ul>
          <button
            type = 'submit'
            className='deleteAll'
            onClick={() =>
              handleShow(
                [
                  `Do you want to delete all notifications?`,
                  `No`,
                  `Yes`,
                ],
                `all`
              )
            }
          >
            Delete All
          </button>
        </ul>
      </div>
      <Modal show={show} onHide={handleClose} className='delete-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg[0]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => handleClose(false)}
          >
            {msg[1]}
          </Button>
          <Button
            variant='primary'
            onClick={() => handleClose(true)}
          >
            {msg[2]}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </Container>
  );
}

export default NotificationPage;
