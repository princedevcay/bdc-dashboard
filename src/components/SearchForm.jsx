import { useState } from 'react';
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <InputGroup size="md" mb={4}>
        <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activity"
            pr="4.5rem"
            />
      <InputRightElement width="4.5rem">
        <IconButton
          aria-label="Search activity"
          icon={<SearchIcon />}
          h="1.75rem"
          size="sm"
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchForm;
