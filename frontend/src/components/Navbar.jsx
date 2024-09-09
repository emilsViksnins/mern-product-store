import { Container, HStack, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "20px", sm: "22px" }}
          fontWeight={"light"}
          textAlign={"center"}
          color={colorMode === "light" ? "gray.800" : "gray.200"}
          letterSpacing="wide"
        >
          <Link to={"/"}>E-Tronics</Link>
        </Text>
        <HStack spacing={4} alignItems={"center"}>
          <Link to={"/create"}>
            <Button
              size="sm"
              bg={colorMode === "light" ? "white" : "gray.800"}
              borderRadius="md"
              boxShadow="sm"
              _hover={{ bg: colorMode === "light" ? "gray.50" : "gray.700" }}
            >
              <PlusSquareIcon fontSize={14} />
            </Button>
          </Link>
          <Button
            size="sm"
            bg={colorMode === "light" ? "white" : "gray.800"}
            borderRadius="md"
            boxShadow="sm"
            onClick={toggleColorMode}
            _hover={{ bg: colorMode === "light" ? "gray.50" : "gray.700" }}
          >
            {colorMode === "light" ? <IoMoon fontSize={14} /> : <LuSun fontSize={14} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
