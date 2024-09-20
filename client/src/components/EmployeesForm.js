import React, { useEffect, useRef, useState } from 'react'

function EmployeesForm() {

    let [lists,setLists] = useState({});
    let [employees,setEmployees] = useState([]);

    let countrySelectRef = useRef();
    let departmentSelectRef = useRef();
    let genderSelectRef = useRef();

    useEffect(()=>{
        getLists();
    },[]);

    let getLists = async ()=>{
        let reqOptions = {
            method:"GET"
        }

        let JSONData = await fetch("http://localhost:4567/lists",reqOptions);

        let JSOData = await JSONData.json();

        setLists(JSOData);

        console.log(JSOData);
    };

    let getEmployeesFromServer = async ()=>{

        let reqOptions = {
            method:"GET"
        }

        let url = `http://localhost:4567/getEmployees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`;
        console.log(url)
         url = `http://localhost:4567/getEmployees/${countrySelectRef.current.value}/${departmentSelectRef.current.value}/${genderSelectRef.current.value}`;
        console.log(url)

        let JSONData = await fetch(url,reqOptions);

        let JSOData = await JSONData.json();
        setEmployees(JSOData);
        console.log(JSOData);
    }
  return (
    <div>
        <form>
            <div>
                <label>Country</label>
                <select ref={countrySelectRef}>
                    {lists.countries ? lists.countries.map((ele,i)=>{
                        return <option>{ele}</option> 
                    }):null}
                </select>
            </div>
            <div>
                <label>Department</label>
                <select ref={departmentSelectRef}>
                    {lists.departments ? lists.departments.map((ele,i)=>{
                        return <option>{ele}</option>
                    }):null}
                </select>
            </div>
            <div>
                <label>Gender</label>
                <select ref={genderSelectRef}>
                   {lists.genders ? lists.genders.map((ele,i)=>{
                        return <option>{ele}</option> 
                   }):null}
                </select>
            </div>
            <div>
                <button type="button" onClick={()=>{
                    getEmployeesFromServer();
                }}>Get Employees</button>
            </div>
        </form>
        <table>
            <thead>
                <tr>
                    <th>SNo.</th>
                    <th>ID</th>
                    <th>Profile Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
            {employees.map((ele,i)=>{
            return(
                <tr>
                <td>{i+1}</td>
                <td>{ele.id}</td>
                <td><img src={ele.profilePic}></img></td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.age}</td>
                <td>{ele.email}</td>
                <td>{ele.gender}</td>
                <td>{ele.department}</td>
                <td>{ele.country}</td>
            </tr>
            );
        })}
            </tbody>
            <tfoot></tfoot> 
        </table>
        
    </div>
  )
}

export default EmployeesForm