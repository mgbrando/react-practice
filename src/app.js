import React from "react";
import PropTypes from "prop-types";

/*const Headline = () => {
  return <h1 className="title"> Hello World! </h1>;
};

const Greeting = props => {
  const { name, age } = props;
  return (
    <p>
      You will love it {name} ({age})!
    </p>
  );
};*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyItems: ["milk", "bread", "fruit"]
    };
  }
  render() {
    const { buyItems } = this.state;
    return (
      <div>
        <h1>Shopping List</h1>
        {buyItems.map(item => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    );
  }
}
//const App = () => {};

/*Greeting.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
};*/
export default App;
