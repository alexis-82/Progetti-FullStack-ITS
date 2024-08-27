// src/components/UserManagement.js
import React, { useState, useEffect } from "react";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateUser(editingId, name, email);
        } else {
            await createUser(name, email);
        }
        setName('');
        setEmail('');
        setEditingId(null);
        fetchUsers();
    };

    const createUser = async (name, email) => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('User created:', data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    
    const updateUser = async (id, name, email) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error("Network response was not ok");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Network response was not ok");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const editUser = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditingId(user.id);
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">
                    {editingId ? "Update" : "Add"} User
                </button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => editUser(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;