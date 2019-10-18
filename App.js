import React from "react";
import { StyleSheet, Text, View, FlatList, AsyncStorage } from "react-native";
import Header from "./app/components/Header";
import SubTitle from "./app/components/SubTitle";
import Input from "./app/components/Input";
import TodoItem from "./app/components/TodoItem";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todos: [
        {
          title: "할일하기 1"
        },
        {
          title: "할일하기 2"
        }
      ]
    };
  }

  componentWillMount() {
    this._getData()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headercenterd}>
          <Header />
        </View>
        <View style={styles.subContainer}>
          <SubTitle title="할 일을 입력해주세요" />
          <Input
            value={this.state.inputValue}
            changeText={this._changeText}
            addTodo={this._addTodoItem}
          />
        </View>
        <View style={styles.subContainer}>
          <SubTitle title="해야할 일 목록" />
          <FlatList
            data={this.state.todos}
            renderItem={this._makeTodoItem}
            keyExtractor={(item, index) => {
              return `${index}`;
            }}
          />
        </View>
      </View>
    );
  }

  _makeTodoItem = ({ item, index }) => {
    return (
      <TodoItem
        text={item.title}
        isComplete={item.isComplete}
        changeComplete={() => {
          const newTodo = [...this.state.todos];
          newTodo[index].isComplete = !newTodo[index].isComplete;
          this.setState({ todos: newTodo }, this._storeData);
        }}
        deleteItem={() => {
          const newTodo = [...this.state.todos];
          newTodo.splice(index, 1);
          this.setState({ todos: newTodo }, this._storeData);
        }}
      />
    );
  };

  _changeText = value => {
    this.setState({ inputValue: value });
  };

  _addTodoItem = () => {
    if (this.state.inputValue != "") {
      const prevTodo = this.state.todos;
      const newTodo = { title: this.state.inputValue, isComplete: false };
      this.setState(
        {
          inputValue: "",
          todos: prevTodo.concat(newTodo)
        },
        this._storeData
      );
    }
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("@todo:state", JSON.stringify(this.state));
    } catch (e) {}
  };

  _getData = async () => {
    try {
      const mystate = await AsyncStorage.getItem("@todo:state");
      if (mystate !== null) {
        this.setState(JSON.parse(state));
      }
    } catch (e) {}
  };
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 70,
    marginBottom: 40
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3f4e66"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headercenterd: {
    alignItems: "center"
  },
  subContainer: {
    marginLeft: 20,
    marginTop: 10
  }
});
