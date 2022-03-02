import React from 'react'

export default function Showtable() {
  return (
    <div>
   <table className="table table-hover w-80">
  <thead>
    <tr className ="table-primary">
      <th scope="col">No</th>
      <th scope="col">Team Name</th>
      <th scope="col">Icons</th>
      <th scope="col">color</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>Otto</td> 
      <td>
      <div className="">
  <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
  <i class="fa fa-gear" style= {{fontSize:'36px'}}></i>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Edit</a></li>
    <li><a className="dropdown-item" href="#">Delete</a></li>
  </ul>
</div>
 </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

      
    </div>
  )
}
