import React, { useRef, useState, useEffect } from 'react';
import Grid, { ResultItem } from './Grid';

interface FormData {
  name: string;
  email: string;
  password: string;
}
interface Action {
  type: string;
  payload?: any;
}
const initFormState = { name: '', email: '', password: '' }
function formReduucer(state: FormData, action: Action): FormData {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload }
    case 'email':
      return { ...state, email: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    case 'reset': return initFormState
    default:
      return state;
  }
}
function useApi<T = any>(searchText: string): T[] {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=Fesz1RdHvNNqDWXvUeyfxTd5lbQ0ywtI&q=${searchText}`)
      .then(res => res.json())
      .then(res => setData(res.data))
  }, [searchText]);
  return data;
}


export default function ReactForm() {
  const [formState, dispatch] = React.useReducer(formReduucer, initFormState)

  const handleInpuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.target.name, payload: e.target.value })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formState)
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });

  };
  const refNameInput = useRef<any>();
  const focusNameInput = () => {
    refNameInput.current.focus();
  }
  const refEmailInput = useRef<any>();
  const focusEmailInput = () => {
    refEmailInput.current.focus();
  }
  const refPassInput = useRef<any>();
  const focusPasswordInput = () => {
    refPassInput.current.focus();
  }
  const [searchText, setSearchText] = useState('');
  const data = useApi<ResultItem>(searchText);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // log your value here
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const debounce = (callback: (e: React.ChangeEvent<HTMLInputElement>) => void, delay: number) => {
    let timeoutId: any = null;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timeoutId)
        timeoutId = setTimeout(() => {
          callback(e);
          clearTimeout(timeoutId);
          timeoutId = null;
        }, delay);
    }
  };

  const debouncedSearch = debounce(handleSearch, 1000);
  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input ref={refNameInput} name='name' onChange={handleInpuChange} value={formState.name} placeholder="name" type="text" />
        </label>
        <label>
          Email:
          <input ref={refEmailInput} name='email' onChange={handleInpuChange} value={formState.email} placeholder="email" type="text" />
        </label>


        <label>
          Password:
          <input ref={refPassInput} name='password' onChange={handleInpuChange} value={formState.password} placeholder="password" type="text" />
        </label>
        <hr />
        <button onClick={focusNameInput}>Focus Name Input</button>
        <button onClick={focusEmailInput}>Focus Email Input</button>
        <button onClick={focusPasswordInput}>Focus Password Input</button>
        <hr />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            onChange={debouncedSearch}
          />
        </label>
        <hr />
        <Grid data={data} />
      </div>
    </React.Fragment>
  );
}