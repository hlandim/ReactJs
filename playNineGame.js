var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
  
  const Stars = (props) => {
      let stars = _.range(props.numbersOfStars).map(i => 
          <i key={i} className="fa fa-star"></i>
      )
        return ( 
          <div className="col-5">
          {stars}
          </div>
      );
    
    }
    const Numbers = (props) => {
    
        const getNumberClassName = (number) => {
          if(props.usedNumbers.includes(number)) {
            return 'used';
        }
          if(props.selectedNumbers.includes(number)) {
            return 'selected';
        }
      };
        
        return (
          <div className="card text-center">
          <div>
            {Numbers.list.map((number, i) => 
              <span key={i} className={getNumberClassName(number)} onClick={() => props.selectNumberAction(number)}>{number}</span>
            )}
          </div>
        </div>
      );
    
    }
    Numbers.list = _.range(1,10);
    
    const Button = (props) => {
      let button;
      switch(props.answerIsCorrect){
          case true:
            button = 
          <button className="btn btn-success" onClick={props.acceptAnswer}>
              <i className="fa fa-check"></i>
          </button>;
        break;
        case false:
            button = 
          button = 
          <button className="btn btn-danger" onClick={props.checkAnswer}>
              <i className="fa fa-times"></i>
          </button>;
        break;
        default:
            button = 
          <button className="btn" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>
              =
          </button>;
      }
    
        return ( 
          <div className="col-2 text-center">
              {button}
              <br/>
              <br/>
              <button className="btn btn-warning btn-sm" disabled={props.redrawsCount == 0} onClick={props.redraw}>
                <i className="fa fa-refresh"></i>{props.redrawsCount}
              </button>
        </div>
      );
    }
    
    const Answer = (props) => {
        return (
          <div className="col-5">
            <div>
            {props.selectedNumbers.map((number, i) => 
              <span key={i} onClick={() => {props.unselectNumberAction(number)}}>{number}</span>
            )}
          </div>
          </div>
      );
    }
  
    const DoneFrame = (props) => {
        return (
            <div className="text-center">
                    <br/>
                <h3>{props.doneStatus}</h3>
                <button className="btn btn-secundary" onClick={props.resetGame}>
                  Play Again
                </button>
            </div>
        );
    }
    
    
    class Game extends React.Component {
            static randomNumber = () => 1 + Math.floor(Math.random()*9);
        static initialState = () => ({
          selectedNumbers: [],
          numbersOfStars: Game.randomNumber(),
          answerIsCorrect: null,
          usedNumbers: [],
          redraws: 5,
          doneStatus: null
      });
      
      state = Game.initialState();
      
      resetGame = () => this.setState(Game.initialState());
      
      selectNumber = (number) => {
          if(this.state.selectedNumbers.concat(this.state.usedNumbers).includes(number)) {
            return;
        }
        this.setState( prevState => ({
            answerIsCorrect: null,
          selectedNumbers: prevState.selectedNumbers.concat(number)
        }));
        
      };
      
      unselectNumber = (clickedNumber) => {
          
        var indexNumber = this.state.selectedNumbers.indexOf(clickedNumber);
          if(indexNumber < 0) {
            return;
        }
        this.setState( prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter((number) => number != clickedNumber)
        }));
      }
      
      checkAnswer = () => {
          this.setState( prevState => ({
                answerIsCorrect: prevState.numbersOfStars === prevState.selectedNumbers.reduce((total, current) => total+current, 0)
        }), this.updateDoneStatus);
      }
      
      acceptAnswer = () => {
          this.setState( prevState => ({
            
          usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
          selectedNumbers: [],
          answerIsCorrect: null,
          numbersOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
      }
      
      redraw = () => {
          if(this.state.redraws === 0) {return;}
          this.setState( prevState => ({
            selectedNumbers: [],
          answerIsCorrect: null,
          numbersOfStars: Game.randomNumber(),
          redraws: prevState.redraws - 1,
        }), this.updateDoneStatus);
      }
      
      updateDoneStatus = () => {
          this.setState(prevState => {
            if(prevState.usedNumbers == 9) {
              return {doneStatus: "Done. Nice!!"}
          }
          if(prevState.redraws === 0 && !this.possibleSolution(prevState)) {
              return {doneStatus: "Game Over :("}
          }
        });
      }
      
      possibleSolution = ({numbersOfStars, usedNumbers}) => {
          const possibleNumbers = _.range(1, 10).filter(number => !usedNumbers.includes(number));
        
        return possibleCombinationSum(possibleNumbers, numbersOfStars);
      }
        
      render() { 
          const { 
        numbersOfStars, 
        selectedNumbers,
        answerIsCorrect,
        usedNumbers,
        redraws,
        doneStatus
        } = this.state
          return(
            <div className="container">
              <h3>Play Nine</h3>
              <hr/>
              <div className="row">
                <Stars numbersOfStars = {numbersOfStars}/>
                <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  redrawsCount={redraws}/>
                <Answer selectedNumbers={selectedNumbers}
                unselectNumberAction={this.unselectNumber}/>
              </div>
              <br/>
              {doneStatus ? 
                  <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>
                :
                <Numbers selectNumberAction={this.selectNumber} 
                      selectedNumbers={this.state.selectedNumbers}
                      usedNumbers={usedNumbers}/>
              }
              
              
            </div>
        );
      }
    
    }
    
    
    class App extends React.Component {
        
      render() {
          return (
            <Game />
        );
      }
    
    }
    
    ReactDOM.render(<App/> , mountNode);