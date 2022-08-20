import React, {useContext} from 'react';
import {Text} from 'native-base';

import GlobalContext from './context';

const Display = () => {
  const {display} = useContext(GlobalContext);

  return (
    <Text color="white" fontSize="4xl" marginBottom={5} marginRight={5}>
      {display}
    </Text>
  );
};

export default Display;
