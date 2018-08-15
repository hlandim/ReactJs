const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
  	  <img width="75" src={props.avatar_url}/>
      <div style={{display: 'inline-block', marginLeft: 18}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
  	</div>
  );
};

const CardList = (props) => {
	return (
  	<div>
  	 	{props.users.map(user => <Card key={user.id} {...user} />)}
  	</div>
  );
};



class Form extends React.Component {
	
  state = { userName: ''}

  handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then( respo => {
        this.props.onSubmit(respo);
         this.setState( prevState => ({
          userName: ''
         }));
      });
	
  };
  

	render() {
  	return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        value={this.state.userName}
        onChange={(event) => this.setState({userName: event.target.value})}
        placeholder="Digite o login do github"/>
        <button type="submit">Add card</button>
      </form>
    
  	);
  };
};

class App extends React.Component {
	
  state = {
    users : []
  }
  
  addNewCard = (user) => {
    //console.log(user);
  	this.setState( prevState => ({
    	users: prevState.users.concat(user.data)
    }));
  };
  
	render() {
  	return(
    	<div>
        <Form onSubmit={this.addNewCard}/>
        <CardList users={this.state.users}/>
      </div>
    );
  }
}

ReactDOM.render(<App/> , mountNode);