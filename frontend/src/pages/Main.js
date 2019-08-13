import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import api from '../services/api';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);
    var loggedId = '';
    useEffect(() => {
        async function loadUsers() { 
            const username = match.params.user;
            const getId = await api.post('/devs',{ username });
            const { _id  } = getId.data;
            loggedId  = _id;
            const response = await api.get('/devs', {
                headers: { user: loggedId }
            })
            setUsers( response.data );
        }
        loadUsers();
    },[ loggedId ])
    
    async function handleLike(targetId) {
        const username = match.params.user;
            const getId = await api.post('/devs',{ username });
            const { _id  } = getId.data;
            loggedId  = _id;
        await api.post(`./devs/${targetId}/likes`, null, {
            headers: { user: loggedId },
        })
        setUsers(users.filter(user => user._id !== targetId));
    }

    async function handleDislike(targetId) {
        const username = match.params.user;
            const getId = await api.post('/devs',{ username });
            const { _id  } = getId.data;
            loggedId  = _id;
        await api.post(`./devs/${targetId}/dislikes`, null, {
            headers: { user: loggedId },
        })
        setUsers(users.filter(user => user._id !== targetId));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={ logo } alt="Tindev" />
            </Link>
            { users.length > 0 ? (
                <ul>
                    { users.map (user => (
                        <li key={ user._id }>
                        <a href ={ user.url }>
                            <img src={ user.avatar } alt={ user.name }/>
                        </a>
                        <footer>
                            <strong>{ user.name }</strong>
                            <p>{ user.bio }</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike( user._id )}>
                                <img src={ dislike } alt="Dislike" />
                            </button>
                            <button type="button" onClick={() => handleLike( user._id )}>
                                <img src={ like } alt="Like" />
                            </button>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}
        </div>
    )
}