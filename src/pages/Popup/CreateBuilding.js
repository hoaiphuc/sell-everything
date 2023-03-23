import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function CreatebuildingModal(props) {
  const [buildingName, setBuildingName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi yêu cầu tạo mới building
    fetch('https://example.com/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify({
        name: buildingName
      })
    })
      .then(response => response.json())
      .then(building => {
        // Thêm building mới vào danh sách building
        // ...
        // Đóng modal popup
        props.onHide();
      })
      .catch(error => {
        console.error('Error creating building:', error);
      });
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tạo mới building
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formbuildingName">
            <Form.Label>Tên building:</Form.Label>
            <Form.Control type="text" placeholder="Nhập tên building" value={buildingName} onChange={(event) => setBuildingName(event.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Tạo
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}