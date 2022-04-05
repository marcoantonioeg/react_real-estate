import Link from 'next/link'
import {Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer} from '@chakra-ui/react'
import {FcMenu, FcHome, FcAbout} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import {FiKey} from 'react-icons/fi'

const Navbar = ()=>(
    <Flex p="2" borderBottom="1px" borderColor="gray.1000">
        <Box fontSize="3xl" color="blue.500" fontWeight="bold">
            <Link href="/" paddingLeft="2">Realtor</Link>
        </Box>
        <Spacer/>
        <Menu>
            <MenuButton as={IconButton} icon={<FcMenu/>} variant="outlined" color="red.400"/>
            <MenuList>
                <Link href="/" passHref>
                    <MenuItem icon={<FcHome/>}>Inicio</MenuItem>
                </Link>
                <Link href="/search" passHref>
                    <MenuItem icon={<BsSearch/>}>Buscar</MenuItem>
                </Link>
                <Link href="/search?purpose=for-sale" passHref>
                    <MenuItem icon={<FcAbout/>}>Comprar</MenuItem>
                </Link>
                <Link href="/search?purpose=for-rent" passHref>
                    <MenuItem icon={<FiKey/>}>Rentar</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    </Flex>
)
export default Navbar