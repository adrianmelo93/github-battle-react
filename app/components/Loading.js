import React,{ PropTypes} from 'react';

const styles = {
  content: {
    textAling: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text: props.text
    }
  }

componentDidMount(){
    const stopper = `${this.props.text}...`;
    this.interval = window.setInterval(() => {
      if(this.state.text === stopper){
        this.setState(() =>{
          return {
            text: this.props.text
          }
        })
      }else{
        this.setState(() => {
          return {
            text: `${prevState.text}.`
          }
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount(){
    console.log('Cleared the interval');
    window.clearInterval(this.interval)
  }

  render(){
    return (
      <p style={style.content}>
        {this.state.text}
      </p>
    );
  }
}

  Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  };

  Loading.defaultProps ={
    text: 'Loading',
    speed: 300
  };

export default Loading;
