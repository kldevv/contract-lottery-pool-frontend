import web3 from './web3.js';

const address = '0xb265549891e2F7B7c685Dc5C2D92011dF9891Fb8';
const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [],
        name: 'admin',
        outputs: [ [Object] ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'draw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getTickets',
        outputs: [ [Object] ],
        stateMutability: 'view',
        type: 'function'
    }
];

const lotteryContract = new web3.eth.Contract(abi, address);

export default lotteryContract;