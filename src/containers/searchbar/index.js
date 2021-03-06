import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getQuestions } from '../../store/actions';
import { bindActionCreators } from 'redux';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tag: 'javascript',
        sort: 'activity',
        score: 100,
        limit: 100
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  };

  onInputChange(event){
    let values = this.state;
    values[event.target.name] = event.target.value;
    this.setState({parameters: values});
  }

  onSearch(){
    this.props.getQuestions(this.state);
  }

  onFormSubmit(event){
    event.preventDefault();
    this.onSearch();
  }

  render() {
        return (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Buscar na API</Panel.Title>
            </Panel.Heading>
  
            <Panel.Body>            
              <div style={styles.parameters}>
                  <input
                    name="tag"
                    type="text"
                    style={styles.parameter}
                    placeholder="tag"
                    className="form-control"
                    onChange={this.onInputChange}
                    value={this.state.tag}
                  />
  
                  <input
                    name="score"
                    type="number"
                    style={styles.parameter}
                    placeholder="score"
                    className="form-control"
                    value={this.state.score}
                    onChange={this.onInputChange}
                  />
  
                  <select
                      name="sort"
                      style={styles.parameter} 
                      placeholder="activity"
                      className="form-control"
                      value={this.state.sort} 
                      onChange={this.onInputChange}>
                    <option value="activity">Activity</option>
                    <option value="votes">Votes</option>
                    <option value="creation">Creation</option>
                    <option value="hot">Hot</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
  
                  <input
                    name="limit"
                    type="number"
                    style={styles.parameter}
                    placeholder="limit"
                    className="form-control"
                    value={this.state.limit}
                    onChange={this.onInputChange}
                  />               
                </div>
                <Button
                  onClick={this.onFormSubmit}
                  bsStyle="success"
                  style={styles.button}>
                  Buscar
                </Button>
            </Panel.Body>
          </Panel>
      )
    }
  };

function MapDispatchToProps(dispatch){
  return bindActionCreators({ getQuestions }, dispatch);
}

const mapStateToProps = state =>(
  { questions: state.questions }
);

export default connect(mapStateToProps, MapDispatchToProps)(Searchbar);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15
  },
  parameters: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  parameter:{
    marginRight:15,
    fontSize: 14
  },
  button:{
   justifyContent: 'flex-end',
   alignSelf: 'flex-end',
   fontSize: 14,
   marginRight: 15
  }
}
