export const getButtons = () => {
  return [
    {
      items: [
        {
          label: 'AC',
          bgColor: '#c7c6cb',
          labelColor: 'black',
          //handlePress: () => handlePressClear(),
        },
        {
          label: '±',
          bgColor: '#c7c6cb',
          labelColor: 'black',
          //handlePress: () => handleUtilityPress('±'),
        },
        {
          label: '%',
          bgColor: '#c7c6cb',
          labelColor: 'black',
          //handlePress: () => handleUtilityPress('%'),
        },
        {
          label: '÷',
          bgColor: '#fb9a17',
          labelColor: 'white',
          //handlePress: () => handleOperationPress('/'),
        },
      ],
    },
    {
      items: [
        {
          label: '7',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(7),
        },
        {
          label: '8',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          // handlePress: () => handleDigitPress(8),
        },
        {
          label: '9',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(9),
        },
        {
          label: 'x',
          bgColor: '#fb9a17',
          labelColor: 'white',
          //handlePress: () => handleOperationPress('*'),
        },
      ],
    },
    {
      items: [
        {
          label: '4',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(4),
        },
        {
          label: '5',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(5),
        },
        {
          label: '6',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(6),
        },
        {
          label: '-',
          bgColor: '#fb9a17',
          labelColor: 'white',
          //handlePress: () => handleOperationPress('-'),
        },
      ],
    },
    {
      items: [
        {
          label: '1',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(1),
        },
        {
          label: '2',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(2),
        },
        {
          label: '3',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(3),
        },
        {
          label: '+',
          bgColor: '#fb9a17',
          labelColor: 'white',
          //handlePress: () => handleOperationPress('+'),
        },
      ],
    },
    {
      items: [
        {
          label: '0',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleDigitPress(0),
        },
        {
          label: '.',
          bgColor: '#e0e0e6',
          labelColor: 'black',
          //handlePress: () => handleUtilityPress('.'),
        },
        {
          label: '=',
          bgColor: '#fb9a17',
          labelColor: 'white',
          //handlePress: () => handleEqualPress(),
        },
      ],
    },
  ];
};
