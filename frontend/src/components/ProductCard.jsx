import { 
  Box, Image, Heading, HStack, IconButton, Text, useColorModeValue, 
  useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  ModalBody, ModalFooter, Button, Input, VStack 
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from '../store/product';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    try {
      const { success, message } = await deleteProduct(pid);
      toast({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    try {
      const { success, message } = await updateProduct(pid, updatedProduct);
      onClose();
      toast({
        title: success ? "Success" : "Error",
        description: message || "Product updated successfully",
        status: success ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow='md'
      rounded='md'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-3px)", shadow: "lg" }}
      bg={bg}
      p={4}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' borderRadius="md" />

      <Box pt={4}>
        <Heading as='h3' size='md' mb={2} fontWeight="semibold" color={textColor}>
          {product.name}
        </Heading>

        <Text fontWeight='medium' fontSize='lg' color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            size="sm"
            colorScheme='dark green'
            variant='outline'
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            size="sm"
            colorScheme='dark red'
            variant='outline'
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='dark green' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
