import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function CreateCategoryModal(props) {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi yêu cầu tạo mới category
    fetch('https://example.com/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify({
        name: categoryName
      })
    })
      .then(response => response.json())
      .then(category => {
        // Thêm category mới vào danh sách category
        // ...
        // Đóng modal popup
        props.onHide();
      })
      .catch(error => {
        console.error('Error creating category:', error);
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
          Tạo mới category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Tên category:</Form.Label>
            <Form.Control type="text" placeholder="Nhập tên category" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} />
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