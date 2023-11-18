import React, { useState } from 'react';
import {Button,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import base_url from '../../Api/apiUrl';
import { Toast, ToastContainer } from 'react-bootstrap';

const initialValues = {
  categoryName: ''
};

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required('First Name is required')
});

var setMessage = false;

var closeMessage = () => {
  setMessage = true;
}

var errorColor = {color: "red"};


const UserForm = () => {

  const [showMessage, setShowMessage] = useState(false);
  const toggleShowMessage = () => setShowMessage(!showMessage);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('ds');
    try {
      const response = await fetch(base_url+'category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully:', data);
        //Show success message
        toggleShowMessage();
      } else {
        console.error('Failed to send data to the API');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Container >
        <Row className='justify-content-center my-5'>                
          <Col md={4}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <label className='form-label my-2' htmlFor="categoryName">First Name:</label>
                    <Field className='form-control' type="text" name="categoryName" />
                    <ErrorMessage style={errorColor} name="categoryName" component="div" className="error" />
                  </div>

                  <Button className='my-2 w-100' type='submit' color='primary'>Submit</Button>
                </Form>
              )}
            </Formik>
            </Col>
            </Row>

            <ToastContainer position="bottom-end" className="p-3">
              <Toast show={showMessage} onClose={toggleShowMessage} >
                  <Toast.Header>
                      {/*<img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                      />*/}
                      <strong className="me-auto">Success</strong>
                  </Toast.Header>
                  <Toast.Body>Category Added Successfully</Toast.Body>
              </Toast>
              </ToastContainer>
            </Container>
    </div>
  );
};

export default UserForm;