import React, {memo, useContext, useEffect, useState} from 'react';
import {Button, Text, VStack, HStack} from 'native-base';

import {isEmpty, isNull} from 'lodash';
import GlobalContext from './context';

const INITIAL_EQUATION: INITIAL_EQUATION = {
  firstNumber: null,
  operation: '',
  secondNumber: null,
  lastOperation: '',
};

const CButton = ({getButtons}) => {
  const {display, setDisplay} = useContext(GlobalContext);
  const [buttons, setButtons] = useState([]);
  const [history, setHistory] = useState<null | number>(null);
  const [equation, setEquation] = useState(INITIAL_EQUATION);
  const [isClear, setIsClear] = useState(false);
  console.log('render button');

  useEffect(() => {
    setButtons(getButtons());
  }, [getButtons]);

  useEffect(() => {
    if (isClear) {
      setEquation(INITIAL_EQUATION);
      setHistory(null);
      setDisplay(0);
    }
  }, [isClear]);

  const handlePressClear = () => {
    setIsClear(true);
    setIsRefresh(true);
  };

  const handleUtilityPress = (type: string) => {
    if (type === '±') {
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

      console.log('dsds', val);

      if (val % 1 === 0) {
        if (isEmpty(equation.operation)) {
          setEquation({
            ...equation,
            firstNumber: val,
          });
        } else {
          setEquation({
            ...equation,
            secondNumber: val,
          });
        }
        setDisplay(val);
      } else {
        if (isEmpty(equation.operation)) {
          setEquation({
            ...equation,
            firstNumber: val,
          });
        } else {
          setEquation({
            ...equation,
            secondNumber: val,
          });
        }
        setDisplay(val);
      }
    }
  };

  const handleDigitPress = (number: number) => {
    setIsClear(false);
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

  const handleButtonPress = value => {
    handleDigitPress(parseFloat(value));
    console.log(parseFloat(value));
  };

  const renderButton = (item: ITEM, index: number) => (
    <Button
      key={index}
      onPress={() => handleButtonPress(item.label)}
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
    </Button>
  );

  return (
    <VStack flex={1}>
      {buttons.length > 0 &&
        buttons.map((button, index) => (
          <HStack key={index} flex={1}>
            {button.items.map(renderButton)}
          </HStack>
        ))}
    </VStack>
  );
};

export default memo(CButton);
