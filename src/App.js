import { useEffect, useState  } from 'react'
import './App.css';

export default function App() {
  const posts = [
    {
      url: '',
      tags: ['react', 'blog'],
      title: 'How to create a react search bar',
    },
    {
      url: '',
      tags: ['node', 'express'],
      title: 'How to mock an api in node',

    }
  ]
  
  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const [fact, setFact] = useState('')

  const fetchFact = () => {
    fetch("https://catfact.ninja/fact")
     .then((response) => response.json())
     .then((data) => setFact(data.fact));
    }
    useEffect(() => {
     fetchFact()
    }, []);

    const handleClick = () => {
      fetchFact()
     }
     
  const handleChange = (e) => {
    const results = posts.filter(post => {
      if (e.target.value === '') return posts
      return post.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results}
      )

  }
  return (
    <div className="App">
  <form>
  <input onChange={handleChange} value={state.query} type='search'  ></input>
  </form>
  <ul>
  {(state.query === '' ? "" : state.list.map(post => {
    return <li key={post.title}>{post.title}</li>
  }))}
  </ul>
  <h2>Press the button for a random cat fact!</h2>
  <hr />
  <button onClick= {() => handleClick()}>Get Cat fact</button>
  <p>{fact}</p>
    </div>
  );
}