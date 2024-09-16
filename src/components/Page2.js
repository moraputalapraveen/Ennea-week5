import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header1 = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
 
`;

const Header = styled.div`
    background-color: burlywood;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Submit = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const simulateAddProduct = async (product) => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  const data = await response.json();
  return data; 
};

export const Page2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const productMutation = useMutation({
    mutationFn: simulateAddProduct,
    onSuccess: (data) => {
      notification.success({
        message: 'Product Added',
        description: `Product ${data.title} added successfully with id ${data.id}.`,
      });
      
      navigate('/', { state: { newProduct: data } });
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    },
  });

  useEffect(() => {
    if (state?.product) {
      form.setFieldsValue(state.product);
    }
  }, [state?.product, form]);

  const handleSubmit = (values) => {
    productMutation.mutate(values);
  };

  return (
    <Header1>
      <Header>Confirm Product</Header>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Product Name"
          rules={[{ required: true}]}
        >
          <Input  disabled/>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true}]}
        >
          <Input type="number" disabled/>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Submit
          type="primary"
          htmlType="submit"
          loading={productMutation.isLoading}
        >
          Confirm and Submit
        </Submit>
      </Form>
    </Header1>
  );
};
