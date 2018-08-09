class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({ searchText: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items }));
  }

  render() {
    const styles = {
      textAlign: 'center',
    }
    return (
      <div style={styles}>
        <form onSubmit={event => this.onSubmit(event)} style={{margin: '10px auto'}}>
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText} />
        </form>
        <UsersList users={this.state.users} />
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user} />);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    const styles = {
      maxWidth: '100px',
      boxShadow: '10px 10px 10px #bbb',
    }
    return (
      <div>
        <img src={this.props.user.avatar_url} style={styles} />
        <a href={this.props.user.html_url} target="_blank"
          style={
            {
              display: 'block',
              textDecoration: 'none',
              cursor: 'pointer',
              maxWidth: '100px',
              margin: '10px auto',
              fontStyle: 'italic',
              fontWeight: 'bold',
              backgroundColor: 'blue',
              color: 'white',
              border: '2px solid blue',
              borderRadius: '6px',
            }
          }>
          {this.props.user.login}
        </a>
      </div>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);