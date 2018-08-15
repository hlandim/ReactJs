
class Button extends React.Component {

	handlerClick = () => {
  	this.props.onClickFunction(this.props.incrementValue)
  }
  render() {
  	return (
    <button 
    	onClick={this.handlerClick}>
    	+{this.props.incrementValue}
      </button>
    );
  }
}

const Result = (props) => {
	return (
  	<div>
    	{props.label}
    </div>
  );
};

class App extends React.Component {
	state = {counter: 10};
  
  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
    	counter: prevState.counter + incrementValue
    }));
  };
  render() {
  	return (
    	<div>
      	<Button incrementValue={1} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={3} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={10} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction = {this.incrementCounter}/>
        <Result label = {this.state.counter}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
