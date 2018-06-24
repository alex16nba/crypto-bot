console.log('aaaaa');
import React from 'react';
import ReactDOM from 'react-dom';
console.log('indexo');

// import './style/style.css';
const App = () => {
  return <div>Hello World</div>
}

console.log('index');
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
