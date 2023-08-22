import { useEffect, useState } from "react";
import './Crud.css'

const Crud = () => {
    const [Table, setTable] = useState(false);

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        salary: '',
    })
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditId] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const handleSubmit = () => {
        if(editid){
            let ans = alldata.filter((item) => {
                if (item.id == editid) {
                    item.name = input.name;
                    item.email = input.email;
                    item.password = input.password;
                    item.city = input.city;
                    item.salary = input.salary;
                }
                return item
            })
            setAlldata(ans);
            setEditId("");
        }else{
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: input.name,
                email: input.email,
                password: input.password,
                city: input.city,
                salary: input.salary,
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem('crud', JSON.stringify(data));
            alert("Record successfully Add");
        }
        setInput({
            name: '',
            email: '',
            password: '',
            city: '',
            salary: '',
        })
    }

    const deleteData = (id) => {
        let ans = alldata.filter((item) => {
            return item.id !== id;
        })
        setAlldata(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Record Successfully Delete");
    }
    const editData = (id) => {
        let ans = alldata.filter((item) => {
            return item.id == id;
        })
        setEditId(id);
        setInput(ans[0]);
    }
    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('crud'));
        if (all === null) {
            setAlldata([]);
        } else {
            setAlldata(all);
        }
    },[])

    return (
        <div className="crud-container">
            <center>
                <div className="crud-form">
                    <table>
                        <tbody>
                            <tr>                   
                                <td>Name :-  <input type="text" name="name" onChange={handleChange} value={input.name} /></td>
                            </tr>
                            <tr>                                
                                <td>Email :-  <input type="email" name="email" onChange={handleChange} value={input.email} /></td>
                            </tr>
                            <tr>                                
                                <td>Password :-  <input type="password" name="password" onChange={handleChange} value={input.password} /></td>
                            </tr>
                            <tr>                                
                                <td>City :-  <input type="text" name="city" onChange={handleChange} value={input.city} /></td>
                            </tr>
                            <tr>                                
                                <td>Salary :-  <input type="nubmer" name="salary" onChange={handleChange} value={input.salary} /></td>
                            </tr>
                            <tr> 
                                                    
                                <td>
                                    {
                                        editid ? (<input type="button" onClick={() => handleSubmit()} value="Edit" />)
                                            : (<input type="button" onClick={() => handleSubmit()} value="submit" />)
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br></br>

                <div className="crud-table">
                    <table>
                        <thead>
                            <tr className="text-center">
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>City</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                alldata.map((item) => {
                                    const { id, name, email, password, city, salary } = item;
                                    return (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{name}</td>
                                            <td>{email}</td>
                                            <td>{password}</td>
                                            <td>{city}</td>
                                            <td>{salary}</td>
                                            <td>
                                                <button onClick={() => deleteData(id)}>Delete</button>
                                                <button onClick={() => editData(id)}>Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>        
            </center>
        </div>
    )
}

export default Crud;