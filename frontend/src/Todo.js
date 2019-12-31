import React , { useEffect , useState }  from 'react';
import './Todo.css';

import axios from 'axios';


import ToDoInput from './Components/TodoInput';
import ToDoList from './Components/TodoList';

function Todo(props) {
    const [items , setItems] = useState([]);

    const config = {
        url : 'http://localhost:8000/api/'
    }


    const get = async () => {
        let result = await axios({
            url : config.url , 
            method : 'get'
        });
        setItems([...result.data]);
    }

    const getWithPromise = () => {
        return axios({
            url : config.url,
            method : 'get'
        });
    }



    const post = async (context)=>{
        let res = await axios({
            url : config.url,
            method : 'post',
            data : {
                context : context,
                is_closed : false
            }
        });
    }
    
    const del = async (id) =>{
        let result = await axios({
            url : config.url + id,
            method : 'delete'
        });
        if(result.status >= 300 || result.status < 200){
            window.alert('삭제가 실패했습니다.')
        }
    }

    useEffect(()=>{
        getWithPromise()
        .then(result=>{
            setItems([...result.data]);
        })
        .catch(result=>{
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요');
        })
    }, []);



    const handleCreate = async (data)=>{
        if(data.trim().length >= 0){
            await post(data);
            await get();
        }
    }

    const handleDelete = async (id)=>{
        await del(id);
        await get();
    }

    return (
        <div className="center">
            <div className="todopage-container divider divider-red">
                <h2>
                    To-Do Project
                </h2>
                <hr/>
                <ToDoInput onCreate={handleCreate}/>
                <hr/>
                <ToDoList items={items} onDelete={ handleDelete }/>
            </div>
        </div>
    );
}

export default Todo;