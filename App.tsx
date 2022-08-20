import React, {useEffect, useState} from 'react';
import {
  Text,
  HStack,
  NativeBaseProvider,
  VStack,
  Box,
  Pressable,
} from 'native-base';

import {isEmpty, isNull} from 'lodash';

const OPERATIONS = ['/', '*', '-', '+'];

interface ITEM {
  label: string;
  bgColor: string;
  labelColor: string;
  handlePress: () => void;
}

interface INITIAL_EQUATION {
  firstNumber: number | null;
  operation: string;
  secondNumber: number | null;
  lastOperation: string;
}

const INITIAL_EQUATION: INITIAL_EQUATION = {
  firstNumber: null,
  operation: '',
  secondNumber: null,
  lastOperation: '',
};

const App = () => {
  const BUTTONS = [
    {
      items: [
        {
          label: 'AC',
          bgColor: '#c7c6cb',
          labelColor: 'black',
          handlePress: () => handleUtilityPress('AC'),
        },
        {
          label: '±',
          bgColor: '#c7c6cb',
          labelColor: 'black',
          handlePress: () => handleUtilityPress('±'),
        },
        {
          label: '%',
          bgColor: '#c7c6cb',
          labelColor: 'black',
          handlePress: () => handleUtilityPress('%'),
        },
        {
          label: '÷',
          bgColor: '#fb9a17',
          labelColor: 'white',
          handlePress: () => handleOperationPress('/'),
        },
      ],
    },
    {
      items: [
        {
          label: '7',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(7),
        },
        {
          label: '8',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(8),
        },
        {
          label: '9',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(9),
        },
        {
          label: 'x',
          bgColor: '#fb9a17',
          labelColor: 'white',
          handlePress: () => handleOperationPress('*'),
        },
      ],
    },
    {
      items: [
        {
          label: '4',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(4),
        },
        {
          label: '5',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(5),
        },
        {
          label: '6',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(6),
        },
        {
          label: '-',
          bgColor: '#fb9a17',
          labelColor: 'white',
          handlePress: () => handleOperationPress('-'),
        },
      ],
    },
    {
      items: [
        {
          label: '1',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(1),
        },
        {
          label: '2',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(2),
        },
        {
          label: '3',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(3),
        },
        {
          label: '+',
          bgColor: '#fb9a17',
          labelColor: 'white',
          handlePress: () => handleOperationPress('+'),
        },
      ],
    },
    {
      items: [
        {
          label: '0',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleDigitPress(0),
        },
        {
          label: '.',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          handlePress: () => handleUtilityPress('.'),
        },
        {
          label: '=',
          bgColor: '#fb9a17',
          labelColor: 'white',
          handlePress: () => handleEqualPress(),
        },
      ],
    },
  ];
  const [display, setDisplay] = useState(0);
  const [history, setHistory] = useState<null | number>(null);
  const [equation, setEquation] = useState(INITIAL_EQUATION);

  useEffect(() => {
    console.log('values', equation, history, display);
  }, [equation, history, display]);

  const handleUtilityPress = (type: string) => {
    if (type === 'AC') {
      setEquation(INITIAL_EQUATION);
      setHistory(null);
      setDisplay(0);
    } else if (type === '±') {
      if (isEmpty(equation.operation)) {
        const value =
          equation.firstNumber < 0
            ? Math.abs(equation.firstNumber) * 1
            : Math.abs(equation.firstNumber) * -1;
        setEquation({
          ...equation,
          firstNumber: value,
        });
        setDisplay(value);
      } else {
        const value =
          equation.secondNumber < 0
            ? Math.abs(equation.secondNumber) * 1
            : Math.abs(equation.secondNumber) * -1;
        setEquation({
          ...equation,
          secondNumber: value,
        });
        setDisplay(value);
      }
    } else if (type === '.') {
      if (isEmpty(equation.operation)) {
        setEquation({
          ...equation,
          firstNumber: `${equation.firstNumber}${'.'}`,
        });
        setDisplay(`${equation.firstNumber}${'.'}`);
      } else {
        setEquation({
          ...equation,
          secondNumber: `${equation.secondNumber}${'.'}`,
        });
        setDisplay(`${equation.secondNumber}${'.'}`);
      }
    } else {
      const val = isEmpty(equation.operation)
        ? equation.firstNumber / 100
        : equation.firstNumber / 100;
      const inputLength = isEmpty(equation.operation)
        ? equation.firstNumber.toString().split('.').join('').length
        : equation.secondNumber.toString().split('.').join('').length;

      if (val % 1 === 0) {
        if (isEmpty(equation.operation)) {
          setEquation({
            ...equation,
            firstNumber: val.toFixed(2),
          });
        } else {
          setEquation({
            ...equation,
            secondNumber: val.toFixed(2),
          });
        }
        setDisplay(val.toFixed(2));
      } else {
        if (isEmpty(equation.operation)) {
          setEquation({
            ...equation,
            firstNumber: val.toFixed(inputLength),
          });
        } else {
          setEquation({
            ...equation,
            secondNumber: val.toFixed(inputLength),
          });
        }
        setDisplay(val.toFixed(inputLength));
      }
    }
  };

  const handleDigitPress = (number: number) => {
    if (isEmpty(equation.operation)) {
      const firstNumber = isNull(equation.firstNumber)
        ? number
        : `${equation.firstNumber}${number}`;

      setEquation({
        ...equation,
        firstNumber: !isNull(history) ? number : parseFloat(firstNumber),
      });
      setDisplay(!isNull(history) ? number : parseFloat(firstNumber));

      if (!isNull(history)) {
        setHistory(null);
      }
    } else {
      const secondNumber = isNull(equation.secondNumber)
        ? number
        : parseFloat(`${equation.secondNumber}${number}`);

      setEquation({
        ...equation,
        secondNumber: secondNumber,
      });
      setDisplay(secondNumber);
    }
  };

  const performOperation = (operation: string) => {
    let total = 0;
    if (operation === OPERATIONS[0]) {
      total = equation.firstNumber / equation.secondNumber;
    } else if (operation === OPERATIONS[1]) {
      total = equation.firstNumber * equation.secondNumber;
    } else if (operation === OPERATIONS[2]) {
      total = equation.firstNumber - equation.secondNumber;
    } else {
      total = equation.firstNumber + equation.secondNumber;
    }
    return total;
  };

  const handleOperationPress = (operation: string) => {
    if (isEmpty(equation.operation)) {
      setEquation({
        ...equation,
        operation: operation,
      });
    } else {
      const total = performOperation(equation.lastOperation);

      setDisplay(total);
      setHistory(total);
      setEquation({
        operation: operation,
        lastOperation: operation,
        secondNumber: 0,
        firstNumber: total,
      });
    }
  };

  const handleEqualPress = () => {
    const total = performOperation(equation.operation);

    setDisplay(total);
    setHistory(total);
    setEquation({
      firstNumber: total,
      operation: '',
      lastOperation: '',
      secondNumber: 0,
    });
  };

  const renderButton = (item: ITEM, index: number) => (
    <Pressable
      key={index}
      onPress={item.handlePress}
      flex={item.label === '0' ? 0 : 1}
      w={item.label === '0' ? '50%' : 0}
      borderBottomWidth={1}
      borderRightWidth={1}
      bgColor={item.bgColor}
      alignItems="center"
      justifyContent="center">
      <Text fontSize="lg" fontWeight="bold" color={item.labelColor}>
        {item.label}
      </Text>
    </Pressable>
  );

  return (
    <NativeBaseProvider>
      <Box
        height="20%"
        bg="black"
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text color="white" fontSize="4xl" marginBottom={5} marginRight={5}>
          {display}
        </Text>
      </Box>
      <Box flex={1}>
        <VStack flex={1}>
          {BUTTONS.map((button, index) => (
            <HStack key={index} flex={1}>
              {button.items.map(renderButton)}
            </HStack>
          ))}
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
