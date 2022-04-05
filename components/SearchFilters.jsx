import React, {useState, useEffect} from 'react'
import {Flex, Select, Box, Text, Input, Spinner, Icon, Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {MdCancel} from 'react-icons/md'
import Image from 'next/image'
import {filterData, getFilterValues} from '../utils/filterData'

const SearchFilters = () => {
    
    const router = useRouter();
    //estado para los filtros
    //el valor por default+ del state es lo que trae el filterdata
    const [filters, setFilters] = useState(filterData)
    //funciton para buscar las propiedades
    const searchProperties = (filterValues) =>{
        //esta funcion cambia la url sengun la selección de filtros que se hayan elegido
        const  path = router.pathname;
        //obtengo la query del router
        const {query} = router;
        const values = getFilterValues(filterValues)
        //hago un loop sobre cada uno de los elementos
        values.forEach((item)=>{
            if(item.value && filterValues?.[item.name]){
                query[item.name] = item.value

            }
        })
        router.push({pathname: path, query})
    }
  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
        {filters.map((filter)=>(
            <Box key={filter.queryName}>
                <Select 
                placeholder={filter.placeholder}
                w="fit-content"
                p="2"
                onChange={(e)=>searchProperties({[filter.queryName]:e.target.value})}>
                    {filter?.items?.map((item)=>(
                        <option value={item.value} key={item.value}>
                            {item.name}
                        </option>
                    ))}
                </Select>
            </Box>
        ))}
    </Flex>
  )
}

export default SearchFilters

