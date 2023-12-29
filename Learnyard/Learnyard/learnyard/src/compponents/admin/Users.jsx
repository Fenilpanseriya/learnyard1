import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Image,Grid,Th, Tr, Td,Thead,Box,Heading, TableContainer, Table, TableCaption, Tbody, HStack, Button } from '@chakra-ui/react'
import { getAllUsers, roleUpdate, userDelete } from '../../redux/actions/admin';
import { useDispatch } from 'react-redux';


const Users = () => {
  
  const updateHandler=async(id)=>{
    console.log(id);
    const token=await localStorage.getItem("token")
    if(token){
      await dispatch(roleUpdate(id,token));
      getAllUser();
    }
    
    
  }
  const deleteHandler=async(id)=>{
    console.log(id);
    await dispatch(userDelete(id));
    getAllUser();
  }
  let users1;
  const [users,setUsers]=useState([]);
  const dispatch=useDispatch();
  const getAllUser=async()=>{
      users1=await dispatch(getAllUsers());
      setUsers(users1);
  }
  useEffect(()=>{
    getAllUser();
  },[])
  
  return (
    <Grid templateColumns={['1fr','5fr 1fr']} minH={"100vh"}>
    <Box p={["0",'16']} overflowX={"auto"}>
    <Heading textTransform={"uppercase"} children="All Users" my='16'textAlign={['center','left']}/>
      <TableContainer width={["100vw",'full']} css={{
                '&::-webkit-scrollbar':{display:"none"}
           }}>
        <Table variant={"simple"} size="lg">
          <TableCaption>
            All Available Users in Database
          </TableCaption>
          
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Subscription</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          
          <Tbody>
          {
            users && users.length>0 &&users.map((item,index)=>(
              <Row key={item._id} item={item} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
            ))
          }

          </Tbody>
          
          
          
        </Table>
      </TableContainer>
    </Box>
    
    <Sidebar/>
</Grid>
  )
}

export default Users

const Row=({item,updateHandler,deleteHandler})=>{
  console.log(JSON.stringify(item))
  return(
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item?.subscription?.status==="active"?'Active':"Not Active"}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button onClick={()=>updateHandler(item._id)} variant={"outline"} color="purple.500">
            Change Role
          </Button>
          <Button onClick={()=>deleteHandler(item._id)} variant={"outline"} color="purple.600">
          ✖️       
          </Button>
        </HStack>
      </Td>
      </Tr>

  )
    
    
}