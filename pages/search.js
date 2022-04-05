import {useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {Flex, Box, Text, Icon} from '@chakra-ui/react'
import {BsFilter} from 'react-icons/bs'
import SearchFilters from '../components/SearchFilters'
import Property from '../components/Property'
import noresult from '../assets/images/noresult.svg'
import { fetchApi, baseUrl } from '../utils/fetchApi'
const Search = ({properties}) =>{
    //state para los filtros
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter()
    return (
        <Box>
          <Flex
            onClick={() => setSearchFilters(!searchFilters)}
            cursor='pointer'
            bg='gray.100'
            borderBottom='1px'
            borderColor='gray.200'
            p='2'
            fontWeight='black'
            fontSize='lg'
            justifyContent='center'
            alignItems='center'
          >
            {/**Para expandri o no los filtros hago la validacion arriba con la funcion onclick */}
            <Text>Buscar propiedad por filtros</Text>
            <Icon paddingLeft='2' w='7' as={BsFilter} />
          </Flex>
            {/**
             * Al dar click en el div se mostrará el componente de SearchFilters y si esta activo
             * al dar click de nuevo, se ocultará
             */}
          {searchFilters && <SearchFilters />}
            {/*
                con el router.query.purpose obtengo en texto el "for sale" o
                "for rent" de la url y así puedo mostrar las propiedades haciendo map
                */}
          <Text fontSize='2xl' p='4' fontWeight='bold'>
            Properties {router.query.purpose}
          </Text>
          <Flex flexWrap='wrap'>
            {properties.map((property) => <Property property={property} key={property.id} />)}
          </Flex>
             {/**
             * Si no hay propiedades muestro la imagen y le texto de que no hay propiedades
             */}
          {properties.length === 0 && (
            <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
              <Image src={noresult} />
              <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
            </Flex>
          )}
        </Box>
      );
    };
  //funcion de next.js para hacer la api call en este caso para llenar las propiedades
export async function getServerSideProps({query}){
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.priceMin || '0';
    const maxPrice = query.priceMax || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }
    

export default Search