import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW='container.xl' py={16} px={6}>
      <VStack spacing={12} align="center">
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="light"
          color="gray.900"
          textAlign="center"
          letterSpacing="tight"
          lineHeight="shorter"
          mb={4}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing={8}
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize="lg" textAlign="center" fontWeight="normal" color="gray.500">
            No products found{" "}
            <Link to="/create">
              <Text as="span" color="blue.600" _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
