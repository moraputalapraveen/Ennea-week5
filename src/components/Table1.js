import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Input, Space, Table,Select,Form ,Modal,Button,DatePicker} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components'



const Header1=styled.div`


display: flex;
gap:30px;
  align-items: center;
  margin-bottom: 20px;

`

async function fetching()
{
    let x=await axios.get('https://dummyjson.com/products')
    return x.data.products;
}


export const Table1 = () => {

    

    let {error,isLoading,data}=useQuery(
        {
            queryKey:['id'],
            queryFn:fetching
        }
    )
    let [startdate,setstartdate]=useState(dayjs().subtract(7,'days'))
    let [enddate,setenddate]=useState(dayjs())
    let [searchtext,setsearchtext]=useState()
    let [filteredproducts,setfilterproducts]=useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);

    useEffect(()=>
    {
        setfilterproducts(data)
    },[data])
   
    console.log(data)
   

    const disablefun=(x)=>
        {
            return x&&x > dayjs().endOf('day');
        }


    const openModal = () => setIsModalOpen(true);

    const handlesearch=(e)=>
    {
        const sea=e.target.value.toLowerCase();
       
        const filter=data.filter((product)=>
        
                product.title.toLowerCase().includes(sea) ||
                product.category.toLowerCase().includes(sea)
        )

        setfilterproducts(filter)
    }

 const onModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      navigate('/page2', { state: { product: values } });
      setIsModalOpen(false);
    } catch (error) {

      
    }
  };

    const column=[
        {
            title:'Id',
            dataIndex:'id'
            
        },
        {
            title:'Product Name',
            dataIndex:'title',
            width:400,
        },
        {
            title:'Price',
            dataIndex:'price',
            sorter:(a,b)=>a.price-b.price
        },

        {
           title:'Product Id',
           dataIndex:'sku' 
        },
        {
            title:'category',
            dataIndex:'category',
            
        }
    ]

    const categories=[
        {
            name:'beauty',
            key:1
    },
    {
        name:'groceries',
        key:2
    },
    
    {
        name:'furniture',
        key:3
    },
    
    
    {
        name:'fragance',
        key:4
    }
];
    

  return (
    <>
        
        <Header1>
        <DatePicker value={startdate}/>
        <DatePicker value={enddate} disabledDate={disablefun}/>
    
        <Input.Search placeholder='Search Products...' onChange={handlesearch} style={{width:'500px',height:'60px',marginTop:'30px'}}/>
    
    <Button type="primary" onClick={openModal}>
          Add Product
        </Button>
        </Header1>
    <Modal
        title="Add Product"
        visible={isModalOpen}
        onOk={onModalOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Enter the title' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Enter the price' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Select a category' }]}>
            <Select>
              {categories?.map((catergory) => (
                <Select.Option key={catergory.key} value={catergory.key}>{catergory.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    <Table dataSource={filteredproducts}  columns={column} loading={isLoading}/>
    
   </>
  )
}
